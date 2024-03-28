import { RequestBody } from '@/helper/Types/game';
import api from '@/interceptors/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAdsAction = createAsyncThunk(
  'getAd',
  async ({ value = [], key, page = 0, status = '' }: RequestBody) => {
    try {
      let requestBody: RequestBody[] = [];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          requestBody = [
            {
              key,
              value,
              status,
            },
          ];
        }
      }
      const response = await api.post(
        `ad?page=${page}&size=9&sort=creationDate,desc`,
        requestBody
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching ads:', error);
      throw error;
    }
  }
);
// export const getAdsAction = createAsyncThunk('getGenres', async () => {
//   const ADS_URL = `${process.env.API_URL}games`;
//   try {
//     const response = await axios.get(ADS_URL, {
//       params: {
//         key: process.env.API_KEY,
//       },
//     });
//     return response.data.results;
//   } catch (error) {
//     console.error('Error fetching genres:', error);
//     throw error;
//   }
// });
