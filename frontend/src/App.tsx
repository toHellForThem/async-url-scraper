import styled from '@emotion/styled';
import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { JobDetails } from './components/JobDetails';
import { LucideActivity } from 'lucide-react';
import './index.css';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--panel-border);
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #6366f1, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <LucideActivity size={32} color="#6366f1" />
        <h1>Async URL Checker</h1>
      </Header>
      
      <MainContent>
        <Sidebar>
          <JobForm />
          <JobList />
        </Sidebar>
        <JobDetails />
      </MainContent>
    </AppContainer>
  );
}

export default App;
