import styled from '@emotion/styled';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  padding: 24px;
  border-radius: 12px;
  height: 100%;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const JobItem = styled.div<{ active: boolean }>`
  padding: 16px;
  border-radius: 8px;
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.2)'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'var(--panel-border)'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: var(--accent-hover);
    transform: translateY(-2px);
  }
`;

export const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const JobId = styled.span`
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

export const StatusBadge = styled.span<{ status: string }>`
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'completed': return 'rgba(16, 185, 129, 0.2)';
      case 'failed': return 'rgba(239, 68, 68, 0.2)';
      case 'in_progress': return 'rgba(99, 102, 241, 0.2)';
      case 'cancelled': return 'rgba(245, 158, 11, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return 'var(--success-color)';
      case 'failed': return 'var(--error-color)';
      case 'in_progress': return 'var(--accent-color)';
      case 'cancelled': return 'var(--warning-color)';
      default: return 'var(--pending-color)';
    }
  }};
`;

export const JobStats = styled.div`
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

export const Stat = styled.span<{ type?: 'success' | 'error' }>`
  color: ${props => props.type === 'success' ? 'var(--success-color)' : props.type === 'error' ? 'var(--error-color)' : 'inherit'};
`;
