import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
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

    let userId: number;

    try {
      const payload = decodeAccess(token);
      userId = payload.userId;
    } catch (err) {
      req.user = null;
      next();
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default setUser;
