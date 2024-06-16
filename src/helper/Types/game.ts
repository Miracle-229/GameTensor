export type IAuth = {
  login: string;
  password?: string;
  userId?: number | string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
  status?: string;
  roles?: string[];
  subscribers?: IAuth[];
  followers?: IAuth[];
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
  key?: string;
  page?: number;
  value?: number[] | number | string[] | string;
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

export type IStatusData = {
  id: number | string;
  key: string;
};
export type AdFormData = {
  image: File[];
  title: string;
  tags: string;
  description: string;
  price: number;
};

export type IChats = {
  chatId: string;
  name: string;
  lastMessage: {
    text: string;
    isRead: boolean;
  };
  users: IAuth[];
}[];

export type IMessages = {
  date: string;
  messageId: number;
  chatId: string;
  isChanged: boolean;
  isRead: boolean;
  text: string;
  user: IAuth;
};

export type INotif = {
  creationDate: string;
  linkId: string;
  message: string;
  notificationId: number;
  read: boolean;
};
