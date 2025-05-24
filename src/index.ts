import express, { Request, Response } from "express";
import dotenv from "dotenv";
import weatherRouter from "./routes/weatherRoute.js";
import { createClient } from "redis";

const app = express();

// Load environment variables from .env file
dotenv.config();

export const redis = createClient({
  url: process.env.REDIS_URL,
});
redis.on('error', (err) => console.error('Redis error', err));
await redis.connect();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/weather", weatherRouter);

const PORT: number = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
