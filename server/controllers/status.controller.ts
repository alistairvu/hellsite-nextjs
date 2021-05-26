import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { generateAccess, verifyRefresh } from '../lib/jwt';
import { setIsMember } from '../lib/redis';

export const getStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refresh: refreshToken } = req.cookies;

    if (!req.cookies) {
      res.send({ success: 1, loggedIn: 0 });
      return;
    }

    let userId: string;

    try {
      const payload = verifyRefresh(refreshToken);
      userId = payload.userId;
    } catch (err) {
      res.send({ success: 1, loggedIn: 0 });
      return;
    }

    const user = await User.findByPk(userId);
    if (!user) {
      res.send({ success: 1, loggedIn: 0 });
      return;
    }

    const isRefreshToken = await setIsMember(
      `hellsite-nextjs-${userId}`,
      refreshToken
    );
    if (!isRefreshToken) {
      res.send({ success: 1, loggedIn: 0 });
      return;
    }

    const accessToken = generateAccess(userId);

    res.send({ success: 1, loggedIn: 1, user, token: accessToken });
  } catch (err) {
    next(err);
  }
};
