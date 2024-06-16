import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getNotifCountAction = createAsyncThunk(
  'getNotifCount',
  async () => {
    try {
      const response = await api.get(`notification/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching get count notification:', error);
      throw error;
    }
  }
);
