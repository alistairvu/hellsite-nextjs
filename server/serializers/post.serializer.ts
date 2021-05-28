import { Prisma } from '@prisma/client';

const postWithUser = Prisma.validator<Prisma.PostArgs>()({
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

type PostWithUser = Prisma.PostGetPayload<typeof postWithUser>;

interface NoteInterface {
  id: number;
  userId: number;
  repostId: number;
  type: string;
}

export const isLiked = (notes: NoteInterface[], userId: number): boolean => {
  const matchingNote = notes.filter(
    (note) => note.userId === userId && note.type === 'LIKE'
  );
  return matchingNote.length > 0;
};

export const isReposted = (notes: NoteInterface[], userId: number): boolean => {
  const matchingNote = notes.filter(
    (note) => note.userId === userId && note.type === 'REPOST'
  );
  return matchingNote.length > 0;
};

export const postSerializer = (
  post: PostWithUser,
  userId: number
): Record<string, unknown> => ({
  id: post.id,
  user: post.user,
  content: post.content,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  repostId: post.repostId,
  noteCount: post.notes.length,
  isLiked: isLiked(post.notes, userId),
  isReposted: isReposted(post.notes, userId),
});

export default postSerializer;
