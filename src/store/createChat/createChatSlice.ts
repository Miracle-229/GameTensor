import { createSlice } from '@reduxjs/toolkit';
import { createChatAction } from './createChatThunk';

type createChatState = {
  data: number | string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: createChatState = {
  data: 0,
  status: 'idle',
  error: null,
};

export const createChatSlice = createSlice({
  name: 'create chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChatAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createChatAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createChatAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
