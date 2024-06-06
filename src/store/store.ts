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
import { usersSlice } from './getUsers/getUsersSlice';
import { patchStatusAdSlice } from './patchStatusAd/patchStatusSlice';
import { patchStatusUserSlice } from './patchStatusUser/patchStatusUserSlice';
import { createAdSlice } from './createAd/createAdSlice';
import { editAdSlice } from './editAd/editAdSlice';
import { subscribeSlice } from './subscribe/subscribeSlice';
import { onSubscribeSlice } from './onSubscribe/onSubscribeSlice';
import { getUserNameSlice } from './getUserName/getUserNameSlice';
import { getNotifCountSlice } from './getNotifCount/getNotifCountSlice';
import { getNotifSlice } from './getNotif/getNotifSlice';
import { createChatSlice } from './createChat/createChatSlice';
import { getChatsSlice } from './getChats/getChatsSlice';
import { createMessageSlice } from './createMessage/createMessageSlice';
import { getMessagesSlice } from './getMessages/getMessagesSlice';
import { postTagSlice } from './postTag/postTagSlice';
import { patchStatusNotifSlice } from './pathStatusNotif/pathStatusNotifSlice';
import { changePasswordsSlice } from './changePassword/changePasswordSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice.reducer,
      tags: tagsSlice.reducer,
      ads: adsSlice.reducer,
      createAd: createAdSlice.reducer,
      editAd: editAdSlice.reducer,
      id: idSlice.reducer,
      imageId: imageIdSlice.reducer,
      registration: registrationSlice.reducer,
      login: loginSlice.reducer,
      logout: logoutSlice.reducer,
      changePassword: changePasswordsSlice.reducer,
      currentUser: currentUserSlice.reducer,
      postBookmark: postBookmarksSlice.reducer,
      deleteBookmark: deleteBookmarksSlice.reducer,
      bookmark: bookmarkSlice.reducer,
      users: usersSlice.reducer,
      postTag: postTagSlice.reducer,
      patchStatusAd: patchStatusAdSlice.reducer,
      patchStatusUser: patchStatusUserSlice.reducer,
      patchStatusNotif: patchStatusNotifSlice.reducer,
      subscribe: subscribeSlice.reducer,
      onSubscribe: onSubscribeSlice.reducer,
      getUserName: getUserNameSlice.reducer,
      getNotifCount: getNotifCountSlice.reducer,
      getNotif: getNotifSlice.reducer,
      createChat: createChatSlice.reducer,
      getChats: getChatsSlice.reducer,
      createMessage: createMessageSlice.reducer,
      getMessages: getMessagesSlice.reducer,
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
