declare namespace Express {
  interface Request {
    user: import('../../prisma').user;
  }
}
