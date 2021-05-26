import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import { decodeAccess } from '../lib/jwt';

const setUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token || token === 'undefined') {
      req.user = null;
      next();
      return;
    }

    let userId: string;

    try {
      const payload = decodeAccess(token);
      userId = payload.userId;
    } catch (err) {
      req.user = null;
      next();
      return;
    }

    const user = await User.findByPk(userId);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default setUser;
