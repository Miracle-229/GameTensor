import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const postTagAction = createAsyncThunk(
  'post tag',
  async (name: string) => {
    try {
      const response = await api.post('tag', {
        name,
      });
      return response.data;
    } catch (error) {
      console.error('Error post tag:', error);
      throw error;
    }
  }
);
