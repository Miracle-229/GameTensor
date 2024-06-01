import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuth } from '@/helper/Types/game';
import api from '@/interceptors/api';
import { setCookie } from 'cookies-next';

export const loginAction = createAsyncThunk(
  'login',
  async ({ login, password }: IAuth) => {
    try {
      const response = await api.post('auth/login', {
        login,
        password,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setCookie('role', response.data.roles[0], { maxAge: 60 * 60 * 24 });
      return response.data.accessToken;
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw error;
    }
  }
);
