import {Dimensions, Platform} from 'react-native';

export const COLORS = {
  // Light Theme Colors
  WHITE: '#FFFFFF',
  PRIMARY: '#05143a',
  LIGHTBGCOLOR: '#f8f8f8',
  BLACK: '#000000',
  SECONDARY: '#0D0D0D',
  LIGHTPURPLE: '#F4F5FF',
  PURPLE: '#CCD1FF',
  DARKPURPLE: '#A3AAED',
  MIDPURPLE: '#60669E',
  GRAY: '#BCBABA',
  RED: '#EC1F26',
  // LIGHTB

  // Dark Theme Colors (Renamed as DARK_MODE)
  DARK_MODE_BACKGROUND: '#121212', // Dark background
  DARK_MODE_PRIMARY: '#1E2A47', // Darker primary
  DARK_MODE_LIGHTBGCOLOR: '#1C1C1C', // Dark background alternative
  DARK_MODE_TEXT: '#FFFFFF', // White text on dark background
  DARK_MODE_SECONDARY: '#E0E0E0', // Light gray for contrast
  DARK_MODE_LIGHTPURPLE: '#2A2E5A', // Muted purple
  DARK_MODE_PURPLE: '#4B4F7D', // Darker purple
  DARK_MODE_DARKPURPLE: '#1F2238', // Deeper purple tone
  DARK_MODE_MIDPURPLE: '#3D416B', // Slightly lighter but dark purple
  DARK_MODE_GRAY: '#808080', // Dark gray
  DARK_MODE_RED: '#D32F2F', // Muted red
};

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const hp = Dimensions.get('window').height;
export const wp = Dimensions.get('window').width;
