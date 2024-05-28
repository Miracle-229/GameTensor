import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getChatsAction = createAsyncThunk('getChats', async () => {
  try {
    const response = await api.get(`chat`);
    return response.data;
  } catch (error) {
    console.error('Error fetching get chats:', error);
    throw error;
  }
});
