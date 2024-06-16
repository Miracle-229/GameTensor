import { IStatusData } from '@/helper/Types/game';
import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const patchStatusAdAction = createAsyncThunk(
  'pathStatusAd',
  async ({ key, id }: IStatusData) => {
    try {
      const response = await api.patch(`ad/${id}/status`, {
        status: key,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  }
);
