import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getMessagesAction = createAsyncThunk(
  'getMessages',
  async (id: string) => {
    try {
      const response = await api.get(`chat/message?chatId=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching get current user:', error);
      throw error;
    }
  }
);
