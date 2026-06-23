export type JobStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'failed';
export type TaskStatus = 'pending' | 'in_progress' | 'success' | 'error' | 'cancelled';

export interface Task {
  id: string;
  url: string;
  status: TaskStatus;
  httpStatus?: number;
  errorMessage?: string;
  startedAt?: Date;
  finishedAt?: Date;
  duration?: number;
}

export interface Job {
  id: string;
  createdAt: Date;
  status: JobStatus;
  tasks: Task[];
}
