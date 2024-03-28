import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { searchSlice } from './search/searchSlice';
import { tagsSlice } from './tags/tagsSlice';
import { adsSlice } from './ads/adsSlice';
import { idSlice } from './id/idSlice';
import { imageIdSlice } from './imageId/imageSlice';
import { registrationSlice } from './registration/registrationSlice';
import { loginSlice } from './login/loginSlice';
import { currentUserSlice } from './currentUser/currentUserSlice';
import { logoutSlice } from './logout/logoutSlice';
import { postBookmarksSlice } from './postBookmark/postBookmarkSlice';
import { bookmarkSlice } from './getBookmark/getBookmarkSlice';
import { deleteBookmarksSlice } from './deleteBookmark/deleteBookmarkSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice.reducer,
      tags: tagsSlice.reducer,
      ads: adsSlice.reducer,
      id: idSlice.reducer,
      imageId: imageIdSlice.reducer,
      registration: registrationSlice.reducer,
      login: loginSlice.reducer,
      logout: logoutSlice.reducer,
      currentUser: currentUserSlice.reducer,
      postBookmark: postBookmarksSlice.reducer,
      deleteBookmark: deleteBookmarksSlice.reducer,
      bookmark: bookmarkSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
