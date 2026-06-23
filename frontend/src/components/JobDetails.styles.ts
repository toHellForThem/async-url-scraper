import styled from '@emotion/styled';

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  padding: 24px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  flex-grow: 1;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusBadge = styled.span<{ status: string }>`
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 16px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'completed': return 'rgba(16, 185, 129, 0.2)';
      case 'failed': return 'rgba(239, 68, 68, 0.2)';
      case 'in_progress': return 'rgba(99, 102, 241, 0.2)';
      case 'cancelled': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'completed': return 'var(--success-color)';
      case 'failed': return 'var(--error-color)';
      case 'in_progress': return 'var(--accent-color)';
      case 'cancelled': return 'var(--warning-color)';
      default: return 'var(--pending-color)';
    }
  }};
`;

export const CancelButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: var(--accent-color);
  transition: width 0.3s ease;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid var(--panel-border);
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
`;

export const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 0.9rem;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TaskStatusDot = styled.span<{ status: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background: ${props => {
    switch (props.status) {
      case 'success': return 'var(--success-color)';
      case 'error': return 'var(--error-color)';
      case 'in_progress': return 'var(--accent-color)';
      case 'cancelled': return 'var(--warning-color)';
      default: return 'var(--pending-color)';
    }
  }};
`;
