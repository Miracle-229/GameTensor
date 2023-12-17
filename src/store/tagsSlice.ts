/* eslint-disable no-console */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTagsAction = createAsyncThunk('getGenres', async () => {
  const GENRE_URL = `${process.env.API_URL}genres`;
  try {
    const response = await axios.get(GENRE_URL, {
      params: {
        key: process.env.API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
});

export const tagsSlice = createSlice({
  name: 'genres',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null as string | null, // Change 'Error' to 'string' or the appropriate type
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagsAction.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTagsAction.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getTagsAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});
