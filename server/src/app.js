// Importing the necessary libraries
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importing the routes
import authRoutes from "./routes/authRoutes.js";

// Importing the necessary middleware
import checkApiKey from "./middleware/checkAPIKey.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Setting up the middle ware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Setting up check api key middleware for api routes
app.use('/api', checkApiKey);

// Using authMiddleware to verify jwt tokens
app.use("/api/auth/logout", authMiddleware);

// Routes
app.use("/api/auth", authRoutes);

export default app;
