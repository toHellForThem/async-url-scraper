import express from 'express';
import cors from 'cors';
import { createJob, getJobs, getJob, cancelJob } from './controllers/jobController.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/jobs', createJob);
app.get('/api/jobs', getJobs);
app.get('/api/jobs/:id', getJob);
app.delete('/api/jobs/:id', cancelJob);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
