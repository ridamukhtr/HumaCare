import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  theme: 'light',
};

export const loadTheme = async () => {
  const storedTheme = await AsyncStorage.getItem('theme');
  return storedTheme || initialState.theme;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
      AsyncStorage.setItem('theme', action.payload);
    },
    setInitialTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {changeTheme, setInitialTheme} = themeSlice.actions;
export const selectedThemeSelector = (state: any) => state.theme.theme;
export default themeSlice.reducer;
