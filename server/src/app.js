// Importing the necessary libraries
import express from 'express';
import cors from 'cors';

// Importing the routes
import authRoutes from './routes/authRoutes.js';

const app = express();

// Setting up the middle ware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

export default app;