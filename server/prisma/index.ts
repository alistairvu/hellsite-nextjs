import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

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

export type PostWithUser = Prisma.PostGetPayload<typeof postWithUser>;

export default prisma;
