import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteBookmarkAction = createAsyncThunk(
  'deleteBookmark',
  async (id: number) => {
    try {
      await api.delete(`bookmark/${id}`);
      return id;
    } catch (error) {
      console.error('Error fetching delete bookmark:', error);
      throw error;
    }
  }
);
