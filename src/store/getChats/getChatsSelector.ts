import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectChats = (state: AppState) => state.getChats;

export const chatsData = createSelector(selectChats, (chats) => chats.data);

export const chatsStatus = createSelector(selectChats, (chats) => chats.status);

export const chatsError = createSelector(selectChats, (chats) => chats.error);
