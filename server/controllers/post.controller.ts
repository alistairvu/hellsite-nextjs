import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

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

    const post = await req.user.createPost({ content });

    res.send({ success: 1, post });
  } catch (err) {
    next(err);
  }
};
