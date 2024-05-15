import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUsersAction = createAsyncThunk('getUsers', async () => {
  try {
    const response = await api.get('user');
    return response.data;
  } catch (error) {
    console.error('Error fetching get users:', error);
    throw error;
  }
});
