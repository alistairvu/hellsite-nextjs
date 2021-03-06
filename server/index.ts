/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {
  authRouter,
  refreshRouter,
  statusRouter,
  postRouter,
  followRouter,
  likeRouter,
  repostRouter,
  quoteRouter,
} from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 6960;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/ping', (_req, res) => {
  res.send({ success: 1, ping: 'pong' });
});

app.use('/api/auth', authRouter);
app.use('/api/refresh', refreshRouter);
app.use('/api/status', statusRouter);
app.use('/api/posts', postRouter);
app.use('/api/follows', followRouter);
app.use('/api/likes', likeRouter);
app.use('/api/reposts', repostRouter);
app.use('/api/quotes', quoteRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).send({ success: 0, message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
