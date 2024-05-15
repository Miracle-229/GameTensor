import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const subscribeAction = createAsyncThunk(
  'subscribe',
  async (id: string) => {
    try {
      const response = await api.post(`user/subscriber?subscribeeId=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error subscribe:', error);
      throw error;
    }
  }
);
