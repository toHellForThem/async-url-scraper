import { v4 as uuidv4 } from 'uuid';
import pLimit from 'p-limit';
import axios from 'axios';
import type { Job, Task } from '../types.js';

class JobService {
  private jobs: Map<string, Job> = new Map();

  private cancelTokens: Map<string, () => void> = new Map();

  createJob(urls: string[]): string {
    const jobId = uuidv4();
    const tasks: Task[] = urls.map(url => ({
      id: uuidv4(),
      url,
      status: 'pending',
    }));

    const job: Job = {
      id: jobId,
      createdAt: new Date(),
      status: 'pending',
      tasks,
    };

    this.jobs.set(jobId, job);
    this.processJob(jobId);
    return jobId;
  }

  getJobs() {
    const list = Array.from(this.jobs.values()).map(job => {
      const total = job.tasks.length;
      const success = job.tasks.filter(t => t.status === 'success').length;
      const error = job.tasks.filter(t => t.status === 'error').length;

      return {
        id: job.id,
        createdAt: job.createdAt,
        status: job.status,
        tasksCount: total,
        stats: { success, error },
      };
    });
    return list.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getJob(id: string): Job | undefined {
    return this.jobs.get(id);
  }

  cancelJob(id: string) {
    const job = this.jobs.get(id);
    if (!job) return false;

    if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') {
      return false;
    }

    job.status = 'cancelled';
    job.tasks.forEach(t => {
      if (t.status === 'pending' || t.status === 'in_progress') {
        t.status = 'cancelled';
      }
    });

    const cancelFn = this.cancelTokens.get(id);
    if (cancelFn) cancelFn();

    return true;
  }

  private async processJob(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'in_progress';
    const limit = pLimit(5);

    this.cancelTokens.set(jobId, () => {
      limit.clearQueue();
    });

    const operations = job.tasks.map(task => limit(() => this.processTask(jobId, task)));

    await Promise.all(operations);

    if ((job.status as string) !== 'cancelled') {
      job.status = 'completed';
    }

    this.cancelTokens.delete(jobId);
  }

  private async processTask(jobId: string, task: Task) {
    const job = this.jobs.get(jobId);
    if (!job || job.status === 'cancelled') return;

    task.status = 'in_progress';
    task.startedAt = new Date();

    const delayMs = Math.floor(Math.random() * 10001);
    await new Promise(resolve => setTimeout(resolve, delayMs));

    if ((job.status as string) === 'cancelled') {
      return;
    }

    try {
      const response = await axios.head(task.url, { timeout: 10000 });
      if ((job.status as string) === 'cancelled') return;
      
      task.status = 'success';
      task.httpStatus = response.status;
    } catch (error: any) {
      if ((job.status as string) === 'cancelled') return;
      
      task.status = 'error';
      task.httpStatus = error.response?.status;
      task.errorMessage = error.message;
    } finally {
      if ((job.status as string) !== 'cancelled') {
        task.finishedAt = new Date();
        task.duration = task.finishedAt.getTime() - task.startedAt!.getTime();
      }
    }
  }
}

export const jobService = new JobService();
