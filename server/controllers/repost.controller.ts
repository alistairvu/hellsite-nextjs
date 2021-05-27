import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../prisma';

export const createRepost = async (
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

    const existingRepost = await prisma.note.findUnique({
      where: {
        noteInfo: {
          userId: req.user.id,
          postId,
          repostId: 0,
          type: 'REPOST',
        },
      },
    });

    if (existingRepost) {
      throw new createError.UnprocessableEntity(
        'You already reposted this post!'
      );
    }

    const repost = await prisma.post.create({
      data: {
        userId: req.user.id,
        content: '',
        repostId: postId,
      },
    });

    const repostNote = await prisma.note.create({
      data: {
        userId: req.user.id,
        repostId: 0,
        postId,
        type: 'REPOST',
      },
    });

    res.status(201).send({ success: 1, reposted: 1, repostNote, repost });
  } catch (err) {
    next(err);
  }
};

export const destroyRepost = async (
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

    const repost = await prisma.note.findUnique({
      where: {
        noteInfo: {
          userId: req.user.id,
          postId,
          repostId: 0,
          type: 'REPOST',
        },
      },
    });

    if (!repost) {
      throw new createError.UnprocessableEntity(
        'You have not reposted this post!'
      );
    }

    await prisma.note.delete({
      where: {
        noteInfo: {
          userId: req.user.id,
          repostId: 0,
          postId,
          type: 'REPOST',
        },
      },
    });

    res.send({ success: 1, unliked: 1 });
  } catch (err) {
    next(err);
  }
};
