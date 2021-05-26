import jwt from 'jsonwebtoken';

export const generateAccess = (id: string): string =>
  jwt.sign({ userId: id }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRY,
  });

export const verifyAccess = (token: string): { userId: string } =>
  jwt.verify(token, process.env.ACCESS_SECRET) as { userId: string };

export const decodeAccess = (token: string): { userId: string } =>
  jwt.decode(token) as { userId: string };

export const generateRefresh = (id: string): string =>
  jwt.sign({ userId: id }, process.env.REFRESH_SECRET);

export const verifyRefresh = (token: string): { userId: string } =>
  jwt.verify(token, process.env.REFRESH_SECRET) as { userId: string };
