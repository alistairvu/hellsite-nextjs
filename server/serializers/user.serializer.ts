import { Prisma } from '@prisma/client';

const prismaUser = Prisma.validator<Prisma.UserArgs>()({});
type User = Prisma.UserGetPayload<typeof prismaUser>;

const userSerializer = (user: User): Record<string, unknown> => ({
  id: user.id,
  email: user.email,
  username: user.username,
});

export default userSerializer;
