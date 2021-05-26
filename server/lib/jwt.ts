import jwt from 'jsonwebtoken';

export const generateAccess = (id: number): string =>
  jwt.sign({ userId: id }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRY,
  });

export const verifyAccess = (token: string): { userId: number } =>
  jwt.verify(token, process.env.ACCESS_SECRET) as { userId: number };

export const decodeAccess = (token: string): { userId: number } =>
  jwt.decode(token) as { userId: number };

export const generateRefresh = (id: number): string =>
  jwt.sign({ userId: id }, process.env.REFRESH_SECRET);

export const verifyRefresh = (token: string): { userId: number } =>
  jwt.verify(token, process.env.REFRESH_SECRET) as { userId: number };
