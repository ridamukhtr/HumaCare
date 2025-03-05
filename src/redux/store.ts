// Import Redux Toolkit functions
import {configureStore} from '@reduxjs/toolkit';
// Import the theme reducer
import themeReducer from './themeReducer';
export const store = configureStore({
  reducer: {
    theme: themeReducer, // Keep the key concise
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
