import {ScrollView, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import {wp} from '../styles/theme-styles';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  DownloadIcon,
  LoadingIcon,
} from '../assets/svgIcons';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../redux/themeReducer';
import useThemeManager from '../lib/customHooks/useThemeManger';
import {styles} from '../styles/patientScreenStyles';
import globalStyles, {FONTS} from '../styles/globalStyles';
import PatientDetailCardView from '../components/views/PatientDetailCardView';
import PatientCard from '../components/views/PatientCard';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const CalenderDetail = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  console.log('wid', wp * 0.09);

  return (
    <CustomView isSimpleView={true}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.backBtnContainer,
            {
              backgroundColor: colorTheme.textField,
              borderColor: colorTheme.borderColor,
            },
          ]}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <CustomText style={globalStyles.headingText}>Episode View</CustomText>
        <View />
      </View>

      <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false}>
        <PatientCard
          name="Ethan Reynolds"
          birthDate="Jan 15, 1992"
          phone="(891) 242-0043"
        />

        {/* <PatientDetailCardView /> */}

        <View
          style={[
            styles.profileContainer,
            {backgroundColor: colorTheme.profileBg, paddingVertical: wp * 0.04},
          ]}>
          <View
            style={[
              globalStyles.container,
              {justifyContent: 'space-between', marginBottom: wp * 0.02},
            ]}>
            <CustomText
              style={[styles.patientTxt, {color: colorTheme.textPrimary}]}>
              Blood Test
            </CustomText>
            <CustomText style={{color: colorTheme.borderColor}}>
              Jun 15, 2023
            </CustomText>
          </View>
          <View style={styles.statusContainer}>
            <LoadingIcon />
            <CustomText style={{color: colorTheme.midPurple}}>
              In the process
            </CustomText>
          </View>
          <TouchableOpacity
            style={[
              globalStyles.btnContainer,
              {
                paddingVertical: wp * 0.03,
                borderRadius: wp * 0.02,
                backgroundColor: colorTheme.btnColor,
                borderWidth: wp * 0.003,
              },
            ]}
            // onPress={handleSignIn}
          >
            <CustomText
              style={{
                color: colorTheme.textGray,
                fontFamily: FONTS.regular,
              }}>
              Full Report
            </CustomText>
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <DownloadIcon />
            <CustomText
              style={{color: colorTheme.midPurple, fontWeight: 'bold'}}>
              Get Report (PDF)
            </CustomText>
          </View>
        </View>

        <View style={[styles.profileContainer, {paddingVertical: wp * 0.04}]}>
          <View
            style={[
              globalStyles.container,
              {justifyContent: 'space-between', marginBottom: wp * 0.02},
            ]}>
            <CustomText
              style={[styles.patientTxt, {color: colorTheme.textPrimary}]}>
              Medicor Lab
            </CustomText>
            <CustomText style={{color: colorTheme.borderColor}}>
              Jun 15, 2023
            </CustomText>
          </View>
          <View style={styles.statusContainer}>
            <CheckCircleIcon />
            <CustomText style={{color: colorTheme.midPurple}}>Done</CustomText>
          </View>
          <TouchableOpacity
            style={[
              globalStyles.btnContainer,
              {
                paddingVertical: wp * 0.03,
                borderRadius: wp * 0.02,
                borderWidth: wp * 0.003,
              },
            ]}
            // onPress={handleSignIn}
          >
            <CustomText
              style={{
                color: colorTheme.textPrimary,
                fontFamily: FONTS.regular,
              }}>
              Full Report
            </CustomText>
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <DownloadIcon />
            <CustomText
              style={{color: colorTheme.midPurple, fontWeight: 'bold'}}>
              Get Report (PDF)
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </CustomView>
  );
};

export default CalenderDetail;
