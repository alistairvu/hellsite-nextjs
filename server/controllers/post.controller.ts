import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../prisma';
import { postSerializer } from '../lib/prisma';

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { content } = req.body.post;

    if (!content) {
      throw new createError.UnprocessableEntity('Missing post content');
    }

    const post = await prisma.post.create({
      data: {
        content,
        userId: req.user.id,
        repostId: undefined,
      },
    });

    res.status(201).send({ success: 1, post });
  } catch (err) {
    next(err);
  }
};

export const showPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user?.id || 0;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        notes: true,
        user: {
          select: {
            id: true,
            email: true,
            username: true,
          },
        },
      },
    });

    if (!post) {
      throw new createError.NotFound('No posts with matching id found');
    }

    res.send({ success: 1, post: postSerializer(post, userId) });
  } catch (err) {
    next(err);
  }
};

export const destroyPost = async (
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
      throw new createError.NotFound('No posts with matching id found');
    }

    if (post.userId !== req.user.id) {
      throw new createError.NotAuthorized('You cannot delete this post');
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.send({ success: 1, deleted: 1 });
  } catch (err) {
    next(err);
  }
};
