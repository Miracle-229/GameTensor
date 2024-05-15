import { createSlice } from '@reduxjs/toolkit';
import { createMessageAction } from './createMessageThunk';

type bookmarkState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: bookmarkState = {
  status: 'idle',
  error: null,
};

export const createMessageSlice = createSlice({
  name: 'createMessage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessageAction.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMessageAction.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createMessageAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});
