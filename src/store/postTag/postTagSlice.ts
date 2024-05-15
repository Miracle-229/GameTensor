import { ITags } from '@/helper/Types/game';
import { createSlice } from '@reduxjs/toolkit';
import { postTagAction } from './postTagThunk';

type postTagState = {
  data: ITags[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: postTagState = {
  data: [],
  status: 'idle',
  error: null,
};

export const postTagSlice = createSlice({
  name: 'postTag',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTagAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postTagAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(postTagAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
