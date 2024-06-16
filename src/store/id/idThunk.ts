import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getIdAction = createAsyncThunk('getId', async (id: string) => {
  const ADS_URL = `${process.env.LOCAL_URL}ad/${id}`;
  try {
    const response = await axios.get(ADS_URL);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game with ${id} :`, error);
    throw error;
  }
});
