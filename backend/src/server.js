import dotenv from 'dotenv';
dotenv.config();
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import uploadRoutes from './routes/uploadRoutes.js';
import chatBotRoutes from './routes/chatBotRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', uploadRoutes);
app.use('/api/chatbot', chatBotRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
