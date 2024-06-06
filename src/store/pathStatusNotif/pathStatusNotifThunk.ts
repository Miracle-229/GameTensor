import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const patchStatusNotifAction = createAsyncThunk(
  'pathStatusUser',
  async (ids: string[]) => {
    try {
      const response = await api.patch(`notification/status`, {
        isRead: true,
        notificationId: ids,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  }
);
