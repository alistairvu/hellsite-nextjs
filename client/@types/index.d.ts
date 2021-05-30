interface PostInterface {
  id: number;
  user: {
    id: number;
    email: string;
    username: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
  repostId: null | number;
  noteCount: number;
  isLiked: boolean;
  isReposted: boolean;
}

declare module '@tailwindcss/forms';
