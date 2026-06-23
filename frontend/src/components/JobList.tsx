import { useEffect } from 'react';
import { useJobStore } from '../store/useJobStore';
import { format } from 'date-fns';
import {
  ListContainer,
  Title,
  JobItem,
  JobHeader,
  JobId,
  StatusBadge,
  JobStats,
  Stat
} from './JobList.styles';


export const JobList = () => {
  const { jobs, fetchJobs, activeJobId, setActiveJob } = useJobStore();

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ListContainer>
      <Title>Последние задания</Title>
      {jobs.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>Нет заданий</p>
      ) : (
        jobs.map(job => (
          <JobItem
            key={job.id}
            active={activeJobId === job.id}
            onClick={() => setActiveJob(job.id)}
          >
            <JobHeader>
              <JobId>...{job.id.slice(-8)}</JobId>
              <StatusBadge status={job.status}>{job.status.replace('_', ' ')}</StatusBadge>
            </JobHeader>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              {format(new Date(job.createdAt), 'dd MMM yyyy, HH:mm:ss')}
            </div>
            <JobStats>
              <Stat>Всего: {job.tasksCount}</Stat>
              <Stat type="success">Успешно: {job.stats.success}</Stat>
              <Stat type="error">Ошибок: {job.stats.error}</Stat>
            </JobStats>
          </JobItem>
        ))
      )}
    </ListContainer>
  );
};
