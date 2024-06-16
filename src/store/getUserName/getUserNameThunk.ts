import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getUserNameAction = createAsyncThunk(
  'getUserName',
  async (name: string) => {
    try {
      const response = await api.get(`user/username?username=${name}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching get current user:', error);
      throw error;
    }
  }
);
