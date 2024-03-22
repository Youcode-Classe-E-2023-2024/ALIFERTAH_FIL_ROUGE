
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    const authToken = tokenCookie ? tokenCookie.split('=')[1] : null;

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
