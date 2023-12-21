/* eslint-disable no-console */

'use client';

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import type { AppState } from './store';

const hydrate = createAction<AppState>(HYDRATE);

export const getAdsAction = createAsyncThunk('getGenres', async () => {
  const ADS_URL = `${process.env.API_URL}games`;
  try {
    const response = await axios.get(ADS_URL, {
      params: {
        key: process.env.API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
});

export const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    data: [],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.tags,
        };
      })
      .addCase(getAdsAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAdsAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getAdsAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
