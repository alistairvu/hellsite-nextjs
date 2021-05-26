import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../prisma';

export const createFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: followerId } = req.user;
    const followingId = Number(req.params.id);

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followInfo: {
          followerId,
          followingId,
        },
      },
    });

    if (existingFollow) {
      throw new createError.UnprocessableEntity(
        'You already follow this user!'
      );
    }

    const follow = await prisma.follow.create({
      data: {
        followingId,
        followerId,
      },
    });

    res.send({
      success: 1,
      followed: 1,
      message: `Successfully followed user ${followingId}`,
      follow,
    });
  } catch (err) {
    next(err);
  }
};

export const destroyFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: followerId } = req.user;
    const followingId = Number(req.params.id);

    const follow = await prisma.follow.findUnique({
      where: {
        followInfo: {
          followerId,
          followingId,
        },
      },
    });

    if (!follow) {
      throw new createError.UnprocessableEntity(
        'You have not followed this user yet!'
      );
    }

    await prisma.follow.delete({
      where: {
        followInfo: {
          followerId,
          followingId,
        },
      },
    });

    res.send({
      success: 1,
      unfollowed: 1,
      message: `Successfully unfollowed user ${followingId}`,
    });
  } catch (err) {
    next(err);
  }
};
