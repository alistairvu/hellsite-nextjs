import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import Follow from '../models/follow.model';

export const createFollow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id: followerId } = req.user;
    const { id: followingId } = req.params;

    const existingFollow = await Follow.findOne({
      where: {
        followerId,
        followingId,
      },
    });

    if (existingFollow) {
      throw new createError.UnprocessableEntity(
        'You already follow this user!'
      );
    }

    const follow = await Follow.create({ followerId, followingId });

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
    const { id: followingId } = req.params;

    const follow = await Follow.findOne({
      where: {
        followerId,
        followingId,
      },
    });

    if (!follow) {
      throw new createError.UnprocessableEntity(
        'You have not followed this user yet!'
      );
    }

    await follow.destroy();

    res.send({
      success: 1,
      unfollowed: 1,
      message: `Successfully unfollowed user ${followingId}`,
    });
  } catch (err) {
    next(err);
  }
};
