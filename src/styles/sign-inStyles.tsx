import {StyleSheet} from 'react-native';
import {COLORS, wp} from './theme-styles';
import globalStyles, {FONTS} from './globalStyles';

export const styles = StyleSheet.create({
  firstInputContainer: {
    bottom: wp * 0.05,
    justifyContent: 'center',
    gap: wp * 0.02,
  },
  signInText: {
    fontFamily: FONTS.bold,
    fontWeight: '700',
    fontSize: wp * 0.06,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: wp * 0.001,
    width: wp * 0.22,
  },
  accountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: wp * 0.04,
    marginTop: wp * 0.09,
  },
  signUpText: {
    color: COLORS.PRIMARY,
    fontWeight: '700',
    fontSize: wp * 0.03,
  },
  forgetTxt: {
    fontSize: wp * 0.03,
    fontWeight: '700',
    textAlign: 'right',
  },
  loginContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: wp * 0.08,
    gap: wp * 0.025,
  },
  loginWith: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: wp * 0.04,
  },
  googleBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHTPURPLE,
    paddingHorizontal: wp * 0.02,
    paddingVertical: wp * 0.02,
    borderRadius: wp * 0.02,
    borderColor: COLORS.PURPLE,
    borderWidth: wp * 0.005,
  },
  mainContainer: {
    marginTop: wp * 0.04,
    marginBottom: wp * 0.07,
    alignItems: 'center',
    width: wp * 0.92,
    paddingHorizontal: wp * 0.05,
    paddingVertical: wp * 0.05,
    borderRadius: wp * 0.05,
    flexDirection: 'row',
    gap: wp * 0.045,
    ...globalStyles.shadowInput,
  },
  bodyContainer: {
    padding: wp * 0.003,
    borderRadius: 150 / 1,
    borderWidth: wp * 0.005,
  },
  rightContainer: {
    borderLeftWidth: wp * 0.004,
    gap: wp * 0.04,
    paddingHorizontal: wp * 0.05,
  },
  addressContainer: {
    gap: wp * 0.025,
    marginBottom: wp * 0.07,
    paddingRight: wp * 0.1,
  },
  detailsText: {
    fontSize: wp * 0.05,
  },

  accountTxt: {
    color: COLORS.MIDPURPLE,
    fontSize: wp * 0.03,
  },
  resetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp * 0.14,
  },
  usaText: {fontWeight: '700', fontSize: wp * 0.05},
  profileText: {
    textAlign: 'center',
    fontFamily: FONTS.timesRegular,
    fontSize: wp * 0.06,
    fontWeight: '700',
  },
});
