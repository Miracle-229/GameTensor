import { RequestBody } from '@/helper/Types/game';
import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchGamesAction = createAsyncThunk(
  'searchGames',
  async ({ query, status }: { query: string; status: string }) => {
    try {
      let requestBody: RequestBody | RequestBody[] = [];
      requestBody = [
        {
          key: 'title',
          value: query,
        },
        {
          key: 'status',
          value: status,
        },
      ];
      const response = await api.post(
        'ad?page=0&sort=creationDate,desc',
        requestBody
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  }
);
