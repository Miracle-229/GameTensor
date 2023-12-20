/* eslint-disable no-console */

'use client';

import { IGameData } from '@/helper/Types/game';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import type { AppState } from './store';

const hydrate = createAction<AppState>(HYDRATE);

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

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null as string | null, // Change 'Error' to 'string' or the appropriate type
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.search,
        };
      })
      .addCase(searchGamesAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchGamesAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(searchGamesAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
