// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatStore/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    // Add other reducers here if you have them (e.g., for user authentication)
  },
  // Optional: Add middleware (e.g., for logging, Redux DevTools)
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //Keep default middlewares
});