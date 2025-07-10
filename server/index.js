import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import { connectDB } from './db/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: `http://localhost:${process.env.FRONTEND_PORT}`,
  credentials: true
}));

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
