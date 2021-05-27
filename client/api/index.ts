import axios from 'axios';
import { setCookie } from 'nookies';

const publicClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const serverClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

console.log(process.env.NEXT_PUBLIC_BASE_URL);

publicClient.interceptors.request.use((config) => {
  const newConfig = { ...config };

  const token = window.localStorage.getItem('jwt');
  if (token) {
    newConfig.headers.authorization = `Bearer ${token}`;
  }

  return newConfig;
});

const clients = [publicClient, serverClient];

clients.forEach((client) => {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      console.log(error);

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        const { data } = await publicClient.get('/api/refresh');
        if (data.success) {
          const { token: newToken } = data;

          window.localStorage.setItem('jwt', newToken);
          setCookie(null, 'access', data.token, {
            maxAge: 60 * 60 * 24,
            path: '/',
          });
          originalRequest.headers.authorization = `Bearer ${newToken}`;
          await publicClient(originalRequest);
          return;
        }
      }

      Promise.reject(error);
    }
  );
});

export { publicClient, serverClient };
