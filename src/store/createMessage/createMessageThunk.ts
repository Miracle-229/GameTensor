import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createMessageAction = createAsyncThunk(
  'createMessage',
  async ({ id, text }: { id: string; text: string }) => {
    try {
      await api.post('chat/message', {
        chatId: id,
        text,
      });
      return id;
    } catch (error) {
      console.error('Error fetching post bookmark:', error);
      throw error;
    }
  }
);
