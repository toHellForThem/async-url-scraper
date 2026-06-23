import styled from '@emotion/styled';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  padding: 24px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--panel-border);
  border-radius: 8px;
  color: var(--text-primary);
  padding: 12px;
  font-family: 'Inter', monospace;
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
`;

export const SubmitButton = styled.button`
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background: var(--accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
