import { createSlice } from '@reduxjs/toolkit';
import { createAdAction } from './createAdThunk';

type createAdState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: createAdState = {
  status: 'idle',
  error: null,
};

export const createAdSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createAdAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createAdAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
