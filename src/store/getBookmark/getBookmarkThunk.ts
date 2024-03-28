import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBookmarkAction = createAsyncThunk('getBookmark', async () => {
  try {
    const response = await api.get('bookmark');
    return response.data;
  } catch (error) {
    console.error('Error fetching get bookmark:', error);
    throw error;
  }
});
