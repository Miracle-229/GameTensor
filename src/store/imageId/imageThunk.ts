import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setImageId } from './imageSlice';
import { AppThunk } from '../store';

export const getImageIdAction = createAsyncThunk(
  'getImageId',
  async (amId: string) => {
    const response = await axios.get(
      `http://localhost:8080/api/ad/media/${amId}`,
      { responseType: 'arraybuffer' }
    );
    const blob = new Blob([response.data], { type: 'image/webp' });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  }
);

export const fetchImageId =
  (amId: string, adId: string): AppThunk =>
  async (dispatch) => {
    const imageSrc = await dispatch(getImageIdAction(amId)).unwrap();
    if (imageSrc) {
      dispatch(setImageId({ adId, imageSrc }));
    }
  };
