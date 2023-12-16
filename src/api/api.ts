/* eslint-disable import/no-extraneous-dependencies */
import { IGameData } from '@/helper/Types/game';
import axios from 'axios';

export const data1221 = {
  data: '123',
};

const BASE_URL = 'https://api.rawg.io/api/games';
const API_KEY = '9be60daafabb43db8e41e7bff910446b';

export const handleSearch = async (
  query: string,
  setIsLoading: (value: boolean) => void,
  setOptions: (options: IGameData[]) => void
) => {
  const page = 1; // Ваша текущая страница
  const pageSize = 20; // Количество результатов на странице
  setIsLoading(true);
  try {
    const response = await axios.get(
      `${BASE_URL}?search=${query}&key=${API_KEY}&page=${page}&page_size=${pageSize}`
    );
    const data = await response.data;
    const parsedData = data.results.map((game: IGameData) => ({
      poster: game.background_image,
      date: game.released,
      label: game.name,
      rating: game.metacritic || 'N/A',
      slug: game.slug,
      platforms: game.parent_platforms
        .map((platform) => platform.platform.slug)
        .join(', '),
    }));
    setOptions(parsedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    setOptions([]);
  } finally {
    setIsLoading(false);
  }
};
