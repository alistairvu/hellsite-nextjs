import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import User from '../models/user.model';
import { generateAccess, generateRefresh, verifyRefresh } from '../lib/jwt';
import { setAdd, setRemove } from '../lib/redis';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, username, password } = req.body.user;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      throw new createError.UnprocessableEntity(
        'User with this email or username already exists'
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordDigest = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      username,
      passwordDigest,
    });

    const accessToken = generateAccess(user.id);
    const refreshToken = generateRefresh(user.id);

    await setAdd(`hellsite-nextjs-${user.id}`, refreshToken);

    res.cookie('refresh', refreshToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 20 * 365 * 24 * 3600 * 1000,
    });

    res.send({ success: 1, user, token: accessToken });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body.user;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new createError.UnprocessableEntity(
        'Wrong email/password combination'
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordDigest);

    if (!isPasswordMatch) {
      throw new createError.UnprocessableEntity(
        'Wrong email/password combination'
      );
    }

    const accessToken = generateAccess(user.id);
    const refreshToken = generateRefresh(user.id);

    await setAdd(`hellsite-nextjs-${user.id}`, refreshToken);

    res.cookie('refresh', refreshToken, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 20 * 365 * 24 * 3600 * 1000,
    });

    res.send({ success: 1, user, token: accessToken });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refresh: refreshToken } = req.cookies;
    const { userId } = verifyRefresh(refreshToken);

    await setRemove(`hellsite-nextjs-${userId}`, refreshToken);

    res.clearCookie('refresh');

    res.send({ success: 1, loggedOut: 1 });
  } catch (err) {
    next(err);
  }
};
