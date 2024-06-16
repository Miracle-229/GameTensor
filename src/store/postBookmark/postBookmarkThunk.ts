import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postBookmarkAction = createAsyncThunk(
  'postBookmark',
  async (id: number) => {
    try {
      await api.post('bookmark', {
        adId: id,
      });
      return id;
    } catch (error) {
      console.error('Error fetching post bookmark:', error);
      throw error;
    }
  }
);
