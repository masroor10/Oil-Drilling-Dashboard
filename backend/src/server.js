import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import uploadRoutes from './routes/uploadRoutes.js';
import chatBotRoutes from './routes/chatBotRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', uploadRoutes);
app.use('/api/chatbot', chatBotRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
