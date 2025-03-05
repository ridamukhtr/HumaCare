import {StyleSheet} from 'react-native';
import {COLORS, hp, wp} from './theme-styles';

export const FONTS = {
  bold: 'JostBold',
  regular: 'JostRegular',
  italic: 'Jost-italic',
  medium: 'Jost-Medium',
  timesRegular: 'TimesCG',
};

const globalStyles = StyleSheet.create({
  defaultTxt: {
    fontSize: wp * 0.035,
    color: COLORS.SECONDARY,
    fontFamily: FONTS.regular,
    fontWeight: 'normal',
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp * 0.05,
    paddingVertical: wp * 0.04,
    borderRadius: wp * 0.02,
  },

  boldText: {
    fontWeight: 'bold',
  },

  headingText: {
    textAlign: 'center',
    fontFamily: FONTS.timesRegular,
    fontSize: wp * 0.06,
    fontWeight: '700',
  },

  shadowDefault: {
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  shadowInput: {
    shadowColor: '#1E3A8A35',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.01,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default globalStyles;
