import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const createChatAction = createAsyncThunk('chat', async (id: string) => {
  try {
    const response = await api.post(`chat`, {
      usersId: [id],
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching get notification:', error);
    throw error;
  }
});
