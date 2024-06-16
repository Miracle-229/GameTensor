import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';
import { AxiosError } from 'axios';

export const postTagAction = createAsyncThunk(
  'postTag',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.post('tag', {
        name,
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
