import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getTagsAction = createAsyncThunk('getGenres', async () => {
  try {
    const response = await api.get('tag');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
});
