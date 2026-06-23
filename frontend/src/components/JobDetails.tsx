import { useJobStore } from '../store/useJobStore';
import {
  DetailsContainer,
  Header,
  Title,
  StatusBadge,
  CancelButton,
  ProgressBarContainer,
  ProgressBarFill,
  Table,
  Th,
  Td,
  TaskStatusDot
} from './JobDetails.styles';


export const JobDetails = () => {
  const { activeJobId, activeJobDetail, cancelActiveJob } = useJobStore();

  if (!activeJobId) {
    return (
      <DetailsContainer style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Выберите задание из списка или создайте новое
      </DetailsContainer>
    );
  }

  if (!activeJobDetail) {
    return (
      <DetailsContainer style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Загрузка деталей задания...
      </DetailsContainer>
    );
  }

  const { status, tasks } = activeJobDetail;
  const total = tasks.length;
  const completed = tasks.filter(t => t.status !== 'pending' && t.status !== 'in_progress').length;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  const isCancellable = status === 'pending' || status === 'in_progress';

  return (
    <DetailsContainer>
      <Header>
        <Title>
          Детали задания
          <StatusBadge status={status}>{status.replace('_', ' ')}</StatusBadge>
        </Title>
        {isCancellable && (
          <CancelButton onClick={() => cancelActiveJob()}>
            Отменить задание
          </CancelButton>
        )}
      </Header>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>Прогресс обработки</span>
          <span>{completed} из {total} обработано</span>
        </div>
        <ProgressBarContainer>
          <ProgressBarFill progress={progress} />
        </ProgressBarContainer>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <Th>URL</Th>
              <Th>Статус</Th>
              <Th>HTTP Код</Th>
              <Th>Время (мс)</Th>
              <Th>Ошибка</Th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <Td title={task.url}>{task.url}</Td>
                <Td>
                  <TaskStatusDot status={task.status} />
                  {task.status.replace('_', ' ')}
                </Td>
                <Td>{task.httpStatus || '-'}</Td>
                <Td>{task.duration ? `${task.duration}ms` : '-'}</Td>
                <Td style={{ color: 'var(--error-color)' }}>{task.errorMessage || '-'}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DetailsContainer>
  );
};
