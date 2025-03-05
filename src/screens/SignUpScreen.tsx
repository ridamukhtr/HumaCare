import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SignUp} from '../assets/svgImages';
import {COLORS, wp} from '../styles/theme-styles';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import CustomTextInput from '../components/customComponents/CustomTextInput';
import {styles} from '../styles/sign-inStyles';
import globalStyles from '../styles/globalStyles';

const SignUpScreen = () => {
  return (
    <CustomView>
      <View style={styles.signInContainer}>
        <CustomText style={styles.signInText}>Sign Up</CustomText>
        <SignUp />
      </View>
      <View style={styles.firstInputContainer}>
        <CustomText>Full Name</CustomText>
        <CustomTextInput />
      </View>
      <View style={styles.firstInputContainer}>
        <CustomText>Email</CustomText>
        <CustomTextInput />
      </View>

      <View style={{gap: wp * 0.02, bottom: wp * 0.02}}>
        <CustomText>Phone Number</CustomText>
        <CustomTextInput eye={true} />
      </View>
      <TouchableOpacity style={globalStyles.btnContainer}>
        <CustomText style={{color: COLORS.WHITE}}>Sign Up</CustomText>
      </TouchableOpacity>

      <View style={[styles.accountBtn, {marginTop: wp * 0.2}]}>
        <CustomText style={styles.accountTxt}>Have an Account</CustomText>
        <CustomText style={styles.signUpText}>Sign In</CustomText>
      </View>
    </CustomView>
  );
};

export default SignUpScreen;
