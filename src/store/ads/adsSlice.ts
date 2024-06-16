/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IGameData } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getAdsAction } from './adsThunk';

const hydrate = createAction<AppState>(HYDRATE);

type AdsState = {
  data: {
    content: IGameData[];
    pageable: {
      pageNumber: number;
    };
    totalPages: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: AdsState = {
  data: {
    content: [
      {
        adId: 0,
        user: {
          login: '',
          userId: 0,
        },
        title: '',
        background_image: '',
        price: '',
        date: '',
        tags: [],
        description: '',
        creationDate: '',
        medias: [],
        status: '',
      },
    ],
    pageable: {
      pageNumber: 0,
    },
    totalPages: 0,
  },
  status: 'idle',
  error: null,
};

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.ads,
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
