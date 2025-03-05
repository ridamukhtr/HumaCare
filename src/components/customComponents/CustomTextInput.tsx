import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, wp} from '../../styles/theme-styles';
import globalStyles from '../../styles/globalStyles';
import {Eye, HideIcon, MoveNext} from '../../assets/svgIcons';
import {selectedThemeSelector} from '../../redux/themeReducer';
import {useSelector} from 'react-redux';
import useThemeManager from '../../lib/customHooks/useThemeManger';
const CustomTextInput: React.FC<CustomTextInputProps> = ({
  // email,
  // codeVerify,
  // search,
  editable = true,
  // password,
  // confirmPassword,
  // newPassword,
  placeholder,
  // placeholderTextColor,
  secureTextEntry,
  value,
  defaultValue,
  onChangeText,
  numberOfLines,
  autoCapitalize,
  eye = false,
  style,
  inputStyle,
  right,
  inputBodyStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme, darkTheme, lightTheme} = useThemeManager(theme);
  return (
    <View
      style={[
        styles.inputBox,
        style,
        {
          backgroundColor: colorTheme.textField,
          borderColor: colorTheme.borderColor,
        },
      ]}>
      <View style={[styles.inputBody, inputBodyStyle]}>
        <TextInput
          placeholder={placeholder ?? ''}
          placeholderTextColor={COLORS.PURPLE}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          value={value}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          numberOfLines={numberOfLines}
          autoCapitalize={autoCapitalize}
          editable={editable}
          cursorColor={COLORS.DARKPURPLE}
          style={[styles.input, inputStyle, {color: colorTheme.borderColor}]}
        />

        {eye && (
          <TouchableOpacity
            style={{right: wp * 0.03}}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? (
              <HideIcon width={wp * 0.05} height={wp * 0.05} />
            ) : (
              <Eye />
            )}
          </TouchableOpacity>
        )}
        {/* {right} */}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp * 0.02,
    borderWidth: wp * 0.005,
    paddingHorizontal: wp * 0.02,
    ...globalStyles.shadowInput,
    width: 'auto',
  },
  input: {
    ...globalStyles.defaultTxt,
    paddingVertical: wp * 0.04,
  },
  inputBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
