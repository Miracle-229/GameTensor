import { createAction, createSlice } from '@reduxjs/toolkit';
import { IBookmarkData } from '@/helper/Types/game';
import { HYDRATE } from 'next-redux-wrapper';
import { getBookmarkAction } from './getBookmarkThunk';
import type { AppState } from '../store';

const hydrate = createAction<AppState>(HYDRATE);

type bookmarkState = {
  data: IBookmarkData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: bookmarkState = {
  data: [
    {
      ad: {
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
      bookmarkId: 0,
    },
  ],
  status: 'idle',
  error: null,
};

export const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.bookmark,
        };
      })
      .addCase(getBookmarkAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBookmarkAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getBookmarkAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});
