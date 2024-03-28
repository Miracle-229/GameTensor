import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';
import { IAuth } from '@/helper/Types/game';

export const registrationAction = createAsyncThunk(
  'registration',
  async ({ login, email, password }: IAuth) => {
    try {
      const response = await api.post('auth/signup', {
        login,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw error;
    }
  }
);
