import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getNotifAction = createAsyncThunk(
  'getNotif',
  async (page?: string | number) => {
    try {
      const response = await api.get(`notification?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching get notification:', error);
      throw error;
    }
  }
);
