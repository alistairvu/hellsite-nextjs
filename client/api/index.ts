import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const newConfig = { ...config };

  const token = window.localStorage.getItem('jwt');
  if (token) {
    newConfig.headers.authorization = `Bearer ${token}`;
  }

  return newConfig;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { data } = await axiosClient.get('/api/refresh');
      if (data.success) {
        const { token: newToken } = data;

        window.localStorage.setItem('jwt', newToken);
        originalRequest.headers.authorization = `Bearer ${newToken}`;
        await axiosClient(originalRequest);
        return;
      }
    }

    Promise.reject(error);
  }
);

export default axiosClient;
