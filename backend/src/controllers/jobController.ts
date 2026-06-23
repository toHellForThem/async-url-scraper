import type { Request, Response } from 'express';
import { jobService } from '../services/jobService.js';

export const createJob = (req: Request, res: Response) => {
  const { urls } = req.body;
  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of URLs' });
  }

  if (urls.some(url => typeof url !== 'string')) {
    return res.status(400).json({ error: 'All URLs must be strings' });
  }

  const jobId = jobService.createJob(urls);
  res.status(201).json({ jobId });
};

export const getJobs = (req: Request, res: Response) => {
  const jobs = jobService.getJobs();
  res.json(jobs);
};

export const getJob = (req: Request, res: Response) => {
  const { id } = req.params;
  const job = jobService.getJob(id as string);
  
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(job);
};

export const cancelJob = (req: Request, res: Response) => {
  const { id } = req.params;
  const success = jobService.cancelJob(id as string);
  
  if (!success) {
    return res.status(400).json({ error: 'Job not found or cannot be cancelled' });
  }

  res.json({ success: true });
};
