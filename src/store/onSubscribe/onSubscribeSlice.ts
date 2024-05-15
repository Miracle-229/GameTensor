import { createSlice } from '@reduxjs/toolkit';
import { onSubscribeAction } from './onSubscribeThunk';

type subscribeState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: subscribeState = {
  status: 'idle',
  error: null,
};

export const onSubscribeSlice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onSubscribeAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(onSubscribeAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(onSubscribeAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
