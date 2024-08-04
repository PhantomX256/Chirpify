// Importing the necessary libraries
import express from 'express';
import cors from 'cors';

// Importing the routes
import authRoutes from './routes/authRoutes.js';

// Importing the necessary middleware
import checkApiKey from './middleware/checkAPIKey.js';

const app = express();

// Setting up the middle ware
app.use(cors());
app.use(express.json());

// Setting up check api key middleware for api routes
app.use('/api', checkApiKey);

// Routes
app.use('/api/auth', authRoutes);

export default app;