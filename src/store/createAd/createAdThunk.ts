import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createAdAction = createAsyncThunk(
  'create Ad',
  async (formData: FormData) => {
    try {
      const response = await api.post('ad', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.removeItem('selectedTags');
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  }
);
