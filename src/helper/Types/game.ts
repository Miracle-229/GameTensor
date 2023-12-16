export type IGameData = {
  id: number;
  slug?: string;
  name: string;
  label: string;
  rating: string;
  background_image: string;
  poster: string;
  metacritic: string;
  released?: string;
  date: string;
  parent_platforms: {
    platform: {
      slug: string;
    };
  }[];
  genres: {
    name: string;
  }[];
  description_raw: string;
  publishers: {
    name: string;
  }[];
};
