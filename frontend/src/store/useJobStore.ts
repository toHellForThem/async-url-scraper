import { create } from 'zustand';
import type { JobDetail, JobListItem } from '../types';
import * as api from '../api';

interface JobState {
  jobs: JobListItem[];
  activeJobId: string | null;
  activeJobDetail: JobDetail | null;

  fetchJobs: () => Promise<void>;
  setActiveJob: (id: string) => Promise<void>;
  createAndSetActiveJob: (urls: string[]) => Promise<void>;
  cancelActiveJob: () => Promise<void>;
  pollActiveJob: () => Promise<void>;

  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
}

export const useJobStore = create<JobState>((set, get) => {
  let pollInterval: ReturnType<typeof setInterval> | null = null;

  return {
    jobs: [],
    activeJobId: null,
    activeJobDetail: null,
    isPolling: false,

    fetchJobs: async () => {
      try {
        const jobs = await api.getJobs();
        set({ jobs });
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    },

    setActiveJob: async (id: string) => {
      set({ activeJobId: id, activeJobDetail: null });
      get().startPolling();
    },

    createAndSetActiveJob: async (urls: string[]) => {
      try {
        const { jobId } = await api.createJob(urls);
        await get().fetchJobs();
        await get().setActiveJob(jobId);
      } catch (error) {
        console.error('Failed to create job', error);
      }
    },

    cancelActiveJob: async () => {
      const { activeJobId } = get();
      if (!activeJobId) return;
      try {
        await api.cancelJob(activeJobId);
        await get().pollActiveJob();
        await get().fetchJobs();
      } catch (error) {
        console.error('Failed to cancel job', error);
      }
    },

    pollActiveJob: async () => {
      const { activeJobId } = get();
      if (!activeJobId) return;

      try {
        const detail = await api.getJob(activeJobId);
        if (get().activeJobId === activeJobId) {
          set({ activeJobDetail: detail });

          if (detail.status === 'completed' || detail.status === 'failed' || detail.status === 'cancelled') {
            get().stopPolling();
            get().fetchJobs();
          }
        }
      } catch (error) {
        console.error('Failed to poll active job', error);
        get().stopPolling();
      }
    },

    startPolling: () => {
      if (get().isPolling) return;
      
      set({ isPolling: true });
      get().pollActiveJob();
      pollInterval = setInterval(() => {
        get().pollActiveJob();
      }, 1000);
    },

    stopPolling: () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
      set({ isPolling: false });
    }
  };
});
