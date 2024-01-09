import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTagsAction = createAsyncThunk('getGenres', async () => {
  const GENRE_URL = `${process.env.API_URL}genres`;
  try {
    const response = await axios.get(GENRE_URL, {
      params: {
        key: process.env.API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
});
