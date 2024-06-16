import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

export const logoutAction = createAsyncThunk('logout', async () => {
  try {
    await api.post('auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    deleteCookie('role');
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw error;
  }
});
