import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuth } from '@/helper/Types/game';
import api from '@/interceptors/api';

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
      return response.data.accessToken;
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw error;
    }
  }
);
