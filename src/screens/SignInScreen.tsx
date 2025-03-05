import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SignIn} from '../assets/svgImages';
import {wp} from '../styles/theme-styles';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import CustomTextInput from '../components/customComponents/CustomTextInput';
import {styles} from '../styles/sign-inStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useThemeManager from '../lib/customHooks/useThemeManger';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../redux/themeReducer';
import {ROUTES} from '../routes/RoutesConstants';
import {supabase} from '../config/supabaseClient';
import globalStyles, {FONTS} from '../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme, darkTheme, lightTheme} = useThemeManager(theme);
  console.log('Supabase response:');

  const handleSignIn = async () => {
    setLoading(true);
    setError('');

    console.log('Attempting to sign in with:', email, password);

    const {data, error} = await supabase.auth.signInWithPassword({
      email: 'humacaremobile@gmail.com',
      password: 'testingHash!!!!',
    });

    console.log('Supabase response:', data);

    setLoading(false);

    if (error) {
      console.error('Sign-in error:', error.message);
      setError(error.message);
    } else if (data?.session?.access_token) {
      console.log('User signed in successfully:', data);

      // Store token and user details
      await AsyncStorage.setItem('authToken', data.session.access_token);
      await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
          userId: data.user.id,
          userEmail: data.user.email,
        }),
      );

      navigation.replace(ROUTES.screenHome);
    } else {
      console.error('Unexpected response:', data);
    }
  };

  return (
    <CustomView>
      <View style={styles.signInContainer}>
        <CustomText
          style={[styles.signInText, {color: colorTheme.textPrimary}]}>
          Sign In
        </CustomText>
        <SignIn />
      </View>
      <View style={styles.firstInputContainer}>
        <CustomText
          style={{
            color: colorTheme.textPrimary,
            fontSize: wp * 0.04,
          }}>
          Email
        </CustomText>
        <CustomTextInput
          value={'humacaremobile@gmail.com'}
          onChangeText={setEmail}
        />
      </View>

      <View style={{gap: wp * 0.02, bottom: wp * 0.02}}>
        <CustomText
          style={{fontSize: wp * 0.04, color: colorTheme.textPrimary}}>
          Password
        </CustomText>
        <CustomTextInput
          eye={true}
          value={'testingHash!!!!'}
          onChangeText={setPassword}
          secureTextEntry
          inputBodyStyle={{flex: 1, justifyContent: 'space-between'}}
        />
      </View>
      <TouchableOpacity
        style={[
          globalStyles.btnContainer,
          {backgroundColor: colorTheme.btnColor},
        ]}
        onPress={handleSignIn}>
        <CustomText style={{color: colorTheme.textGray, fontSize: wp * 0.04}}>
          Sign In
        </CustomText>
      </TouchableOpacity>
      {/* <View style={{marginTop: wp * 0.03}}>
        <CustomText style={[styles.forgetTxt, {color: colorTheme.text}]}>
          Forget Password?
        </CustomText>
        <CustomText>{error}</CustomText>
      </View> */}
    </CustomView>
  );
};

export default SignInScreen;
