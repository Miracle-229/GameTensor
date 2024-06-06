import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

export const changePasswordAction = createAsyncThunk(
  'changePassword',
  async (
    { oldPass, newPass }: { oldPass: string; newPass: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put('auth/password', {
        oldPassword: oldPass,
        newPassword: newPass,
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
