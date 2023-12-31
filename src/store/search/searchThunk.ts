import { IGameData } from '@/helper/Types/game';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchGamesAction = createAsyncThunk(
  'searchGames',
  async (query: string, thunkAPI) => {
    const page = 1;
    const pageSize = 20;
    try {
      const response = await axios.get(
        `${process.env.API_URL}games?search=${query}&key=${process.env.API_KEY}&page=${page}&page_size=${pageSize}`
      );
      const data = await response.data;
      const parsedData = data.results.map((game: IGameData) => ({
        poster: game.background_image,
        date: game.released,
        label: game.name,
        rating: game.metacritic || 'N/A',
        slug: game.slug,
        platforms: game.parent_platforms
          .map((platform) => platform.platform.slug)
          .join(', '),
      }));
      return parsedData;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      console.error('Caught error:', error);
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);
