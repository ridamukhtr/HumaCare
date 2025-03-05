// import {TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {useSelector} from 'react-redux';
// import {selectedThemeSelector} from '../../redux/themeReducer';
// import useThemeManager from '../../lib/customHooks/useThemeManger';
// import {DownloadIcon, LoadingIcon, SearchIcon} from '../../assets/svgIcons';
// import CustomText from '../customComponents/CustomText';
// import globalStyles, {FONTS} from '../../styles/globalStyles';
// import {styles} from '../../styles/patientScreenStyles';
// import {wp} from '../../styles/theme-styles';
// import {NavigationProp, useNavigation} from '@react-navigation/native';
// import {ROUTES} from '../../routes/RoutesConstants';

// const PatientDetailCardView: React.FC<PatientDetailCardViewProps> = ({
//   onPress,
//   isBtn = false,
// }) => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const theme = useSelector(selectedThemeSelector);
//   const {colorTheme} = useThemeManager(theme);

//   return (
//     <TouchableOpacity
//       onPress={() => navigation.navigate(ROUTES.screenCalenderDetail)}
//       style={[
//         styles.profileContainer,
//         {backgroundColor: colorTheme.profileBg, paddingVertical: wp * 0.04},
//       ]}>
//       <View
//         style={[
//           globalStyles.container,
//           {justifyContent: 'space-between', marginBottom: wp * 0.02},
//         ]}>
//         <CustomText
//           style={[styles.patientTxt, {color: colorTheme.textPrimary}]}>
//           Laboratorium
//         </CustomText>
//         <CustomText
//           style={{fontSize: wp * 0.05, color: colorTheme.borderColor}}>
//           Jun 15, 2023
//         </CustomText>
//       </View>
//       <CustomText style={{fontSize: wp * 0.05, color: colorTheme.borderColor}}>
//         Ethan Reynolds
//       </CustomText>
//       <CustomText style={{fontSize: wp * 0.04}}>
//         Lorem ipsum dolor sit amet consectetur. Nibh mauris morbi velit ut
//         lobortis. Ac dolor viverra tristique pulvinar euismod id netus eget
//         amet. Augue diam mauris sed id malesuada viverra integer nec. Egestas
//         blandit lobortis massa duis faucibus.
//       </CustomText>
//       <View style={styles.statusContainer}>
//         <LoadingIcon />
//         <CustomText style={{color: colorTheme.midPurple}}>
//           In the process
//         </CustomText>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default PatientDetailCardView;

import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../../redux/themeReducer';
import useThemeManager from '../../lib/customHooks/useThemeManger';
import {CheckCircleIcon, LoadingIcon} from '../../assets/svgIcons';
import CustomText from '../customComponents/CustomText';
import globalStyles from '../../styles/globalStyles';
import {styles} from '../../styles/patientScreenStyles';
import {wp} from '../../styles/theme-styles';

interface PatientDetailCardViewProps {
  title: string;
  date: string;
  name: string;
  description: string;
  status: string;
  onPress?: () => void;
}

const PatientDetailCardView: React.FC<PatientDetailCardViewProps> = ({
  title,
  date,
  name,
  description,
  status,
  onPress,
}) => {
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
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
          {title}
        </CustomText>
        <CustomText
          style={{fontSize: wp * 0.05, color: colorTheme.borderColor}}>
          {date}
        </CustomText>
      </View>
      <CustomText style={{fontSize: wp * 0.05, color: colorTheme.borderColor}}>
        {name}
      </CustomText>
      <CustomText style={{fontSize: wp * 0.04}}>{description}</CustomText>
      <View style={styles.statusContainer}>
        {status === 'Complete' ? <CheckCircleIcon /> : <LoadingIcon />}
        <CustomText style={{color: colorTheme.midPurple}}>{status}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default PatientDetailCardView;
