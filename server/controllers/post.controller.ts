import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import Post from '../models/post.model';

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

    const post = await req.user.createPost({ content, repostId: null });

    res.status(201).send({ success: 1, post });
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
    const { id: postId } = req.params;

    const post = await Post.findByPk(postId);

    if (!post) {
      throw new createError.NotFound('No posts with matching id found');
    }

    if (post.userId !== req.user.id) {
      throw new createError.NotAuthorized('You cannot delete this post');
    }

    await post.destroy();

    res.send({ success: 1, deleted: 1 });
  } catch (err) {
    next(err);
  }
};
