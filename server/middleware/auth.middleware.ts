import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import User from '../models/user.model';
import { verifyAccess } from '../lib/jwt';

const checkAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      throw new createError.Unauthorized('Invalid request');
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token || token === 'undefined') {
      throw new createError.Unauthorized('Invalid request');
    }

    let userId: string;

    try {
      const payload = verifyAccess(token);
      userId = payload.userId;
    } catch (err) {
      throw new createError.Forbidden('Invalid token');
    }

    const user = await User.findByPk(userId);

    if (!user) {
      throw new createError.Unauthorized('Invalid request');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuth;
