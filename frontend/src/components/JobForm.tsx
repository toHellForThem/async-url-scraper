import { useState } from 'react';
import { useJobStore } from '../store/useJobStore';
import {
  FormContainer,
  Title,
  StyledTextarea,
  SubmitButton
} from './JobForm.styles';


export const JobForm = () => {
  const [urlsText, setUrlsText] = useState('');
  const createAndSetActiveJob = useJobStore((state) => state.createAndSetActiveJob);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const urls = urlsText
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0);

    if (urls.length === 0) return;

    setIsSubmitting(true);
    await createAndSetActiveJob(urls);
    setUrlsText('');
    setIsSubmitting(false);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <div>
        <Title>Создать задание</Title>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Введите URL-адреса для проверки (каждый с новой строки)
        </p>
      </div>

      <StyledTextarea
        placeholder={"https://example.com\nhttps://google.com"}
        value={urlsText}
        onChange={(e) => setUrlsText(e.target.value)}
        disabled={isSubmitting}
      />

      <SubmitButton type="submit" disabled={isSubmitting || urlsText.trim().length === 0}>
        {isSubmitting ? 'Запуск...' : 'Запустить проверку'}
      </SubmitButton>
    </FormContainer>
  );
};
