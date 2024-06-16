/* eslint-disable no-console */

import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IChats } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getChatsAction } from './getChatsThunk';

const hydrate = createAction<AppState>(HYDRATE);

type chatsState = {
  data: IChats;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: chatsState = {
  data: [
    {
      chatId: '',
      name: '',
      lastMessage: {
        text: '',
        isRead: false,
      },
      users: [
        {
          userId: '',
          email: '',
          login: '',
          status: '',
        },
      ],
    },
  ],
  status: 'idle',
  error: null,
};

export const getChatsSlice = createSlice({
  name: 'getChats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.getChats,
        };
      })
      .addCase(getChatsAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getChatsAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getChatsAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
