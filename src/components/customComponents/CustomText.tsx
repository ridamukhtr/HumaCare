import {Text} from 'react-native';
import React from 'react';
import globalStyles from '../../styles/globalStyles';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../../redux/themeReducer';
import useThemeManager from '../../lib/customHooks/useThemeManger';

const CustomText: React.FC<CustomTextProps> = ({
  children,
  onPress,
  numberOfLines,
  style,
}) => {
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);
  return (
    <Text
      allowFontScaling={false}
      onPress={onPress}
      style={[globalStyles.defaultTxt, {color: colorTheme.text}, style]}
      numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default CustomText;
