import { IGameData, RequestBody } from '@/helper/Types/game';
import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchGamesAction = createAsyncThunk(
  'searchGames',
  async (query: string) => {
    try {
      let requestBody: RequestBody | RequestBody[] = [];
      requestBody = [
        {
          key: 'title',
          value: query,
        },
        {
          key: 'status',
          value: 'APPROVED',
        },
      ];
      const response = await api.post(
        'ad?page=0&sort=creationDate,desc',
        requestBody
      );
      const data = await response.data.content;
      const parsedData = data.map((game: IGameData) => ({
        medias: game.medias.map((media) => ({
          amId: media.amId,
          preview: media.preview,
        })),
        adId: game.adId,
        title: game.title,
        price: game.price,
        user: game.user,
      }));
      return parsedData;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  }
);
