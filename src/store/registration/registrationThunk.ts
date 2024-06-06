import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';
import { IAuth } from '@/helper/Types/game';
import { AxiosError } from 'axios';

export const registrationAction = createAsyncThunk(
  'registration',
  async ({ login, email, password }: IAuth, { rejectWithValue }) => {
    try {
      const response = await api.post('auth/signup', {
        login,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return rejectWithValue(axiosError.response.data);
      }
      throw error;
    }
  }
);
