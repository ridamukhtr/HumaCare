import {View} from 'react-native';
import React from 'react';
import globalStyles from '../../styles/globalStyles';
import {wp} from '../../styles/theme-styles';
import CustomText from '../customComponents/CustomText';
import {styles} from '../../styles/patientScreenStyles';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../../redux/themeReducer';
import useThemeManager from '../../lib/customHooks/useThemeManger';

const PatientCard: React.FC<PatientCardProps> = ({name, birthDate, phone}) => {
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  return (
    <View
      style={[
        styles.patientContainer,
        {
          backgroundColor: colorTheme.profileBg,
          borderColor: colorTheme.borderColor,
        },
      ]}>
      <View style={[globalStyles.container, {justifyContent: 'space-between'}]}>
        <CustomText
          style={[
            styles.patientTxt,
            {
              color: colorTheme.borderColor,
              fontWeight: '600',
            },
          ]}>
          Patient
        </CustomText>
        <CustomText style={{color: colorTheme.textPrimary}}>
          {birthDate}
        </CustomText>
      </View>
      <View style={[globalStyles.container, {justifyContent: 'space-between'}]}>
        <CustomText style={[styles.nameText, {color: colorTheme.textPrimary}]}>
          {name}
        </CustomText>
        <CustomText
          style={[
            styles.patientTxt,
            {fontSize: wp * 0.035, color: colorTheme.textPrimary},
          ]}>
          {phone}
        </CustomText>
      </View>
    </View>
  );
};

export default PatientCard;
