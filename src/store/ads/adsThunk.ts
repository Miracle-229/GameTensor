import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAdsAction = createAsyncThunk('getGenres', async () => {
  const ADS_URL = `${process.env.API_URL}games`;
  try {
    const response = await axios.get(ADS_URL, {
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
