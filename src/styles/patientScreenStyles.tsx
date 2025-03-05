import {StyleSheet} from 'react-native';
import {hp, wp} from './theme-styles';
import {FONTS} from './globalStyles';

export const styles = StyleSheet.create({
  headingText: {
    textAlign: 'center',
    fontFamily: FONTS.bold,
    fontSize: wp * 0.05,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: wp * 0.04,
  },
  dateTxt: {
    fontFamily: FONTS.medium,
    fontSize: wp * 0.03,
  },
  profileContainer: {
    padding: wp * 0.035,
    borderRadius: wp * 0.04,
    marginVertical: wp * 0.025,
    gap: wp * 0.02,
  },
  searchContainer: {
    alignItems: 'center',
    paddingHorizontal: wp * 0.05,
    paddingVertical: wp * 0.049,
    borderTopRightRadius: wp * 0.018,
    borderBottomRightRadius: wp * 0.02,
    right: wp * 0.016,
  },

  // patient profile detail styling
  backBtnContainer: {
    flexDirection: 'row',
    borderRadius: wp * 0.02,
    borderWidth: wp * 0.004,
    paddingHorizontal: wp * 0.01,
    paddingVertical: wp * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profiletxt: {
    fontSize: wp * 0.05,
    fontWeight: 'bold',
    fontFamily: FONTS.bold,
  },
  patientContainer: {
    padding: wp * 0.04,
    borderRadius: wp * 0.04,
    // marginTop: wp * 0.087,
    marginBottom: wp * 0.05,
    borderWidth: wp * 0.004,
    gap: wp * 0.035,
  },
  patientTxt: {
    fontFamily: FONTS.medium,
    fontWeight: '500',
    fontSize: wp * 0.05,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp * 0.03,
    marginTop: wp * 0.04,
  },
  mainContainer: {
    flexDirection: 'row',
    gap: wp * 0.23,
    alignItems: 'center',
    marginBottom: wp * 0.088,
  },
});
