/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IGameData } from '@/helper/Types/game';
import type { AppState } from '../store';
import { searchGamesAction } from './searchThunk';

const hydrate = createAction<AppState>(HYDRATE);

type SearchState = {
  data: IGameData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: SearchState = {
  data: [],
  status: 'idle',
  error: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
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
