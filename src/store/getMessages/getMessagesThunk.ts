import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/interceptors/api';

export const getMessagesAction = createAsyncThunk(
  'getMessages',
  async ({ id, page }: { id: string; page?: number }) => {
    try {
      const response = await api.get(`chat/message?page=${page}&chatId=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching get current user:', error);
      throw error;
    }
  }
);
