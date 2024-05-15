import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectMessages = (state: AppState) => state.getMessages;

export const messagesData = createSelector(
  selectMessages,
  (message) => message.data
);

export const messagesStatus = createSelector(
  selectMessages,
  (message) => message.status
);

export const messagesError = createSelector(
  selectMessages,
  (message) => message.error
);
