import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../prisma';

export const createLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new createError.NotFound(`No posts with id ${postId} found`);
    }

    const existingLike = await prisma.note.findUnique({
      where: {
        noteInfo: {
          userId: req.user.id,
          repostId: 0,
          postId,
          type: 'LIKE',
        },
      },
    });

    if (existingLike) {
      throw new createError.UnprocessableEntity('You already liked this post!');
    }

    const like = await prisma.note.create({
      data: {
        userId: req.user.id,
        repostId: 0,
        postId,
        type: 'LIKE',
      },
    });

    res.status(201).send({ success: 1, liked: 1, like });
  } catch (err) {
    next(err);
  }
};

export const destroyLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new createError.NotFound(`No posts with id ${postId} found`);
    }

    const like = await prisma.note.findUnique({
      where: {
        noteInfo: {
          userId: req.user.id,
          repostId: 0,
          postId,
          type: 'LIKE',
        },
      },
    });

    if (!like) {
      throw new createError.UnprocessableEntity('You already liked this post!');
    }

    await prisma.note.delete({
      where: {
        noteInfo: {
          userId: req.user.id,
          repostId: 0,
          postId,
          type: 'LIKE',
        },
      },
    });

    res.status(201).send({ success: 1, unliked: 1 });
  } catch (err) {
    next(err);
  }
};
