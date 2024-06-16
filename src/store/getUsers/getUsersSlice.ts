import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IAuth } from '@/helper/Types/game';
import type { AppState } from '../store';
import { getUsersAction } from './getUsersThunk';

const hydrate = createAction<AppState>(HYDRATE);

type userState = {
  data: IAuth[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: userState = {
  data: [{ userId: 0, email: '', login: '', status: '', subscribers: [] }],
  status: 'idle',
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        return {
          ...state,
          ...action.payload.users,
        };
      })
      .addCase(getUsersAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUsersAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});
