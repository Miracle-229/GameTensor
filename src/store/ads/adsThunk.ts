import { RequestBody } from '@/helper/Types/game';
import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAdsAction = createAsyncThunk(
  'getAd',
  async ({ value, key, page = 0, status = 'APPROVED' }: RequestBody) => {
    try {
      let requestBody: RequestBody[] = [];
      requestBody = [
        {
          key: 'status',
          value: status,
        },
      ];
      if (key && value) {
        requestBody.push({
          key,
          value,
        });
      }
      const response = await api.post(
        `ad?page=${page}&size=9&sort=creationDate,desc`,
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  }
);
