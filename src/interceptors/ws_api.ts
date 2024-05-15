/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import axios from 'axios';

const baseURL = `ws://localhost:8080/ws`;
const isServer = typeof window === 'undefined';

const wsApi = axios.create({
  baseURL,
});

wsApi.interceptors.request.use(
  async (config) => {
    if (isServer) {
      // Если мы на сервере, то здесь можно выполнить какие-то специфические действия
      // Например, можно получить токен из заголовков запроса или из какого-то другого источника
    } else {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

wsApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = isServer
        ? null
        : localStorage.getItem('refreshToken');
      try {
        const response = await axios.post(
          `${process.env.LOCAL_URL}auth/refresh`,
          {
            refreshToken,
          }
        );
        if (!isServer) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        console.log(response);
        return wsApi.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);

export default wsApi;
