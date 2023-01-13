import { createSlice } from '@reduxjs/toolkit';
import { Notification } from 'models';
import { RootState } from './../../app/store';

export interface NotificationInitialize {
  dataNotification: number | null;
  notificationDetail: Notification;
  isReadAll: boolean | null;
}

const initialState: NotificationInitialize = {
  dataNotification: null,
  notificationDetail: {
    id: 0,
    subject: '',
    message: '',
    isSeen: false,
    createdDate: '',
  },
  isReadAll: false,
};

const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setDataNotification: (state, action) => {
      state.dataNotification = action.payload;
    },
    setIsReadAllNotification: (state, action) => {
      state.isReadAll = action.payload;
    },
    setDetailNotification: (state, action) => {
      state.notificationDetail = action.payload;
    },
  },
  extraReducers: {},
});

// Actions
export const { setDataNotification, setDetailNotification, setIsReadAllNotification } =
  NotificationSlice.actions;

// Selectors
export const SelectDataNotificationSocket = (state: RootState) =>
  state.notification.dataNotification;
export const SelectDetailNotification = (state: RootState) => state.notification.notificationDetail;
export const SelectIsReadAllNotification = (state: RootState) => state.notification.isReadAll;
// Reducer
const NotificationReducer = NotificationSlice.reducer;
export default NotificationReducer;
