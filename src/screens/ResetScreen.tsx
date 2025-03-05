import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Reset} from '../assets/svgImages';
import {COLORS, hp, wp} from '../styles/theme-styles';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import CustomTextInput from '../components/customComponents/CustomTextInput';
import {styles} from '../styles/sign-inStyles';
import globalStyles from '../styles/globalStyles';

const ResetScreen = () => {
  return (
    <CustomView isTopView={true} isSimpleView={true}>
      <View style={styles.signInContainer}>
        <CustomText style={styles.signInText}>Reset Password</CustomText>
        <Reset height={hp * 0.2} />
      </View>

      <View style={styles.firstInputContainer}>
        <CustomText>Email</CustomText>
        <CustomTextInput />
      </View>

      <TouchableOpacity
        style={[globalStyles.btnContainer, {marginTop: wp * 0.02}]}>
        <CustomText style={{color: COLORS.WHITE}}>Reset Password</CustomText>
      </TouchableOpacity>
    </CustomView>
  );
};

export default ResetScreen;
