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
  playtime?: string;
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

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export type ITags = {
  id: number;
  name: string;
  image_background: string;
};

export type IAds = {
  id: number;
  slug: string;
  name: string;
  playtime: number;
  metacritic: number;
  background_image: string;
};
