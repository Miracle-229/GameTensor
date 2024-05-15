import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const onSubscribeAction = createAsyncThunk(
  'onSubscribe',
  async (id: string) => {
    try {
      const response = await api.delete(`user/subscriber?subscribeeId=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error subscribe:', error);
      throw error;
    }
  }
);
