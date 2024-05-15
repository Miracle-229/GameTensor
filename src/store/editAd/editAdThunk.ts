import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const editAdAction = createAsyncThunk(
  'edit Ad',
  async (formData: FormData) => {
    try {
      const response = await api.put('ad', formData, {
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
