import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { generateAccess, verifyRefresh } from '../lib/jwt';
import { setIsMember } from '../lib/redis';

export const refreshAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refresh: refreshToken } = req.cookies;

    if (!req.cookies) {
      throw new createError.UnprocessableEntity('No refresh tokens found');
    }

    let userId: number;

    try {
      const payload = verifyRefresh(refreshToken);
      userId = payload.userId;
    } catch (err) {
      throw new createError.NotAuthorized('No valid refresh tokens found');
    }

    const isRefreshToken = await setIsMember(
      `hellsite-nextjs-${userId}`,
      refreshToken
    );
    if (!isRefreshToken) {
      throw new createError.NotAuthorized('No valid refresh tokens found');
    }

    const accessToken = generateAccess(userId);

    res.send({ success: 1, token: accessToken });
  } catch (err) {
    next(err);
  }
};
