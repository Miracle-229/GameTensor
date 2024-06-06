import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getCurrentUserAction = createAsyncThunk(
  'currentUser',
  async () => {
    try {
      const response = await api.get('user/current');
      return response.data;
    } catch (error) {
      console.error('Error fetching get current user:', error);
      throw error;
    }
  }
);
