import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../prisma';

export const createQuotePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const repostId = Number(req.params.id);
    const { content } = req.body.post;

    if (!content) {
      throw new createError.UnprocessableEntity('Missing quote content');
    }

    const repost = await prisma.post.findUnique({
      where: {
        id: repostId,
      },
    });

    if (!repost) {
      throw new createError.UnprocessableEntity('No matching posts found');
    }

    const post = await prisma.post.create({
      data: {
        content,
        userId: req.user.id,
        repostId,
      },
    });

    const note = await prisma.note.create({
      data: {
        userId: req.user.id,
        postId: repostId,
        repostId: post.id,
        type: 'QUOTE',
      },
    });

    res.status(201).send({ success: 1, post, note });
  } catch (err) {
    next(err);
  }
};

export const destroyQuotePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = Number(req.params.id);
    const { content } = req.body.post;

    if (!content) {
      throw new createError.UnprocessableEntity('Missing quote content');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new createError.UnprocessableEntity('No matching posts found');
    }

    if (!post.repostId) {
      throw new createError.UnprocessableEntity('This is not a quote post');
    }

    await Promise.all([
      prisma.note.delete({
        where: {
          noteInfo: {
            userId: req.user.id,
            repostId: postId,
            postId: post.repostId,
            type: 'REPOST',
          },
        },
      }),
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),
    ]);

    res.status(201).send({ success: 1, deleted: 1 });
  } catch (err) {
    next(err);
  }
};
