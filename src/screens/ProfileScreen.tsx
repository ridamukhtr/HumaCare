import {TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomView from '../components/customComponents/CustomView';
import {COLORS, hp, wp} from '../styles/theme-styles';
import CustomText from '../components/customComponents/CustomText';
import {ProfileImg} from '../assets/svgImages';
import {LoadingIcon, MoveNext} from '../assets/svgIcons';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {styles} from '../styles/sign-inStyles';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../redux/themeReducer';
import useThemeManager from '../lib/customHooks/useThemeManger';
import {supabase} from '../config/supabaseClient';
import globalStyles, {FONTS} from '../styles/globalStyles';
import {ROUTES} from '../routes/RoutesConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userData, setUserData] = useState<{
    userId?: string;
    userEmail?: string;
  } | null>(null);

  const [doctor, setDoctor] = useState<{
    userId: string;
    name: string;
    address: string;
    mobile: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [] = useState();

  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {data: sessionData, error} = await supabase.auth.getSession();

        if (error) {
          console.error('Error fetching session:', error.message);
          return;
        }

        const session = sessionData?.session;
        if (!session) {
          navigation.reset({
            index: 0,
            routes: [{name: ROUTES.screenSignin as never}],
          });
          return;
        }

        const {user} = session;
        if (user) {
          setUserData({userId: user.id, userEmail: user.email});

          await AsyncStorage.setItem(
            'userData',
            JSON.stringify({userId: user.id, userEmail: user.email}),
          );
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();
  }, []);

  console.log('wp', wp * 0.03);

  const fetchDoctorDetails = useCallback(async () => {
    if (!userData?.userId) return;

    setLoading(true);
    try {
      const {data, error} = await supabase
        .from('doctor')
        .select('*')
        .eq('userId', userData.userId);

      if (error) {
        console.error('Error fetching doctor:', error);
        if (error.status === 401) {
          await supabase.auth.signOut();
          navigation.reset({
            index: 0,
            routes: [{name: ROUTES.screenSignin as never}],
          });
        }
        return;
      }

      if (data.length > 0) {
        setDoctor(data[0]);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }, [userData?.userId, navigation]);

  useEffect(() => {
    fetchDoctorDetails();
  }, [fetchDoctorDetails]);
  console.log('doctor', doctor);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate(ROUTES.screenSignin as keyof RootStackParamList);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <CustomView isSimpleView={true} isSwitch={true}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <LoadingIcon />
        </View>
      ) : (
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <CustomText style={globalStyles.headingText}>Profile</CustomText>
            <View
              style={[
                styles.mainContainer,
                {backgroundColor: colorTheme.profileBg},
              ]}>
              <View
                style={[
                  styles.bodyContainer,
                  {borderColor: colorTheme.borderColor},
                ]}>
                <View
                  style={{
                    backgroundColor: COLORS.WHITE,
                    borderRadius: 150 / 1,
                  }}>
                  <ProfileImg />
                </View>
              </View>
              <View
                style={[
                  styles.rightContainer,
                  {borderLeftColor: colorTheme.borderColor},
                ]}>
                <CustomText
                  style={{color: colorTheme.borderColor, fontSize: wp * 0.035}}>
                  Full Name
                </CustomText>
                <CustomText
                  style={{
                    fontFamily: FONTS.regular,
                    fontSize: wp * 0.05,
                    color: colorTheme.textPrimary,
                  }}>
                  {doctor?.name}
                </CustomText>
              </View>
            </View>
            <View style={{gap: wp * 0.025, marginBottom: wp * 0.07}}>
              <CustomText style={{color: COLORS.GRAY}}>Phone number</CustomText>
              <CustomText
                style={[styles.detailsText, {color: colorTheme.textPrimary}]}>
                {doctor?.mobile}
              </CustomText>
            </View>
            <View style={styles.addressContainer}>
              <CustomText style={{color: COLORS.GRAY}}>Address</CustomText>

              <View>
                <CustomText
                  style={[styles.detailsText, {color: colorTheme.textPrimary}]}>
                  {doctor?.address?.split('\n').shift()}
                </CustomText>
                <CustomText
                  style={[styles.detailsText, {color: colorTheme.textPrimary}]}>
                  {doctor?.address?.split('\n')[1]}
                </CustomText>
                <CustomText
                  style={[styles.usaText, {color: colorTheme.textPrimary}]}>
                  {doctor?.address?.split('\n').pop()}
                </CustomText>
              </View>
            </View>
          </View>
          {/* <View style={styles.resetContainer}>
        <TouchableOpacity
        // onPress={() => navigation.navigate(ROUTES.screenReset)}
        >
          <CustomText
            style={{fontWeight: 'bold', color: colorTheme.textPrimary}}>
            Reset Password
          </CustomText>
        </TouchableOpacity>
        <CustomText style={{fontWeight: 'bold', color: colorTheme.textPrimary}}>
          Reset Pin-Code
        </CustomText>
      </View> */}
          <View style={styles.loginContainer}>
            <MoveNext />
            <TouchableOpacity onPress={handleLogout}>
              <CustomText
                style={{
                  color: COLORS.RED,
                  fontWeight: '700',
                }}>
                Log Out
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </CustomView>
  );
};

export default ProfileScreen;
