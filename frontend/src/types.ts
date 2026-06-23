export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'failed';
export type TaskStatus = 'pending' | 'in_progress' | 'success' | 'error' | 'cancelled';

export interface Task {
  id: string;
  url: string;
  status: TaskStatus;
  httpStatus?: number;
  errorMessage?: string;
  startedAt?: string;
  finishedAt?: string;
  duration?: number;
}

export interface JobListItem {
  id: string;
  createdAt: string;
  status: JobStatus;
  tasksCount: number;
  stats: {
    success: number;
    error: number;
  };
}

export interface JobDetail {
  id: string;
  createdAt: string;
  status: JobStatus;
  tasks: Task[];
}
