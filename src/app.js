import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app= express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))


//routes
import userRouter from './routes/user.routes.js';
app.use("/api/v1/users", userRouter);

//routes declaration
export {app}