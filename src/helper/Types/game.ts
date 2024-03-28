export type IAuth = {
  login: string;
  password?: string;
  userId?: number;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type ITags = {
  tagId: number;
  name: string;
};

export type IGameData = {
  adId: number;
  user: IAuth;
  title: string;
  background_image: string;
  price: string;
  date: string;
  tags: ITags[];
  description: string;
  creationDate: string;
  medias: {
    amId: string;
    preview?: true;
  }[];
  status?: string;
};

export type IAdsData = {
  content: IGameData[];
  pageable: {
    pageNumber: number;
  };
  totalPages: number;
};

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export type IUser = {
  id: number;
  name: string;
  image: string;
  isBlocked: boolean;
};

export type RequestBody = {
  key: string;
  page?: number;
  value: number[] | number | string[] | string;
  status?: string;
};
export type IStackImages = {
  original: string;
  thumbnail: string;
};
export type IBookmarkData = {
  ad: IGameData;
  bookmarkId: number;
};
