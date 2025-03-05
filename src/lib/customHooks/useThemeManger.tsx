import {useColorScheme} from 'react-native';
import {COLORS} from '../../styles/theme-styles';

interface Theme {
  background: string;
  statusBar: 'dark-content' | 'light-content';
  container: string;
  text: string;
  sheetModule: string;
  textPrimary: string;
  textGray: string;
  btnColor: string;
  textField: string;
  borderColor: string;
  profileBg: string;
  midPurple: string;
  lightGrey: string;
}

const lightTheme: Theme = {
  background: COLORS.LIGHTBGCOLOR,
  statusBar: 'dark-content',
  container: COLORS.WHITE,
  text: COLORS.BLACK,
  textPrimary: COLORS.PRIMARY,
  sheetModule: COLORS.LIGHTBGCOLOR,
  btnColor: COLORS.PRIMARY,
  textGray: COLORS.WHITE,
  textField: COLORS.LIGHTPURPLE,
  borderColor: COLORS.PURPLE,
  profileBg: COLORS.LIGHTPURPLE,
  midPurple: COLORS.MIDPURPLE,
  lightGrey: COLORS.GRAY,
};

const darkTheme: Theme = {
  background: COLORS.BLACK,
  statusBar: 'light-content',
  container: COLORS.DARK_MODE_LIGHTBGCOLOR,
  text: COLORS.DARK_MODE_SECONDARY,
  textPrimary: COLORS.DARK_MODE_TEXT,
  sheetModule: COLORS.BLACK,
  btnColor: COLORS.MIDPURPLE,
  textGray: COLORS.WHITE,
  textField: COLORS.DARK_MODE_LIGHTBGCOLOR,
  borderColor: COLORS.GRAY,
  profileBg: COLORS.DARK_MODE_GRAY,
  midPurple: COLORS.DARK_MODE_MIDPURPLE,
  lightGrey: COLORS.DARK_MODE_GRAY,
};

const useThemeManager = (theme: string) => {
  const systemTheme = useColorScheme();

  const colorTheme =
    theme === 'dark'
      ? darkTheme
      : theme === 'light'
      ? lightTheme
      : systemTheme == 'dark'
      ? darkTheme
      : lightTheme;
  return {lightTheme, darkTheme, colorTheme};
};

export default useThemeManager;
