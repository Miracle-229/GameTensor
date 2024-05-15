import { createSlice } from '@reduxjs/toolkit';
import { subscribeAction } from './subscribeThunk';

type subscribeState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: subscribeState = {
  status: 'idle',
  error: null,
};

export const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(subscribeAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(subscribeAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
