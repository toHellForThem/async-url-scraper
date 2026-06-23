import axios from 'axios';
import type { JobDetail, JobListItem } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const createJob = async (urls: string[]): Promise<{ jobId: string }> => {
  const { data } = await api.post('/jobs', { urls });
  return data;
};

export const getJobs = async (): Promise<JobListItem[]> => {
  const { data } = await api.get('/jobs');
  return data;
};

export const getJob = async (id: string): Promise<JobDetail> => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

export const cancelJob = async (id: string): Promise<void> => {
  await api.delete(`/jobs/${id}`);
};
