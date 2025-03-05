declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

interface CustomViewProps {
  children?: React.ReactNode;
  isSimpleView?: boolean;
  isTopView?: boolean;
  isSwitch?: boolean;
}

interface CustomTextProps {
  children?: React.ReactNode;
  onPress?: () => void;
  numberOfLines?: number;
  style?: any;
}

interface CustomTextInputProps {
  email?: boolean;
  codeVerify?: boolean;
  search?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
  newPassword?: boolean;
  inputStyle?: object;
  editable: boolean;
  placeholder: string;
  placeholderTextColor: string;
  secureTextEntry: boolean;
  value: string;
  defaultValue: string;
  onChangeText?: (text: string) => void;
  numberOfLines: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: object;
  eye: boolean;
  right: React.ReactNode;
  inputBodyStyle: string;
}

interface PatientDetailCardViewProps {
  onPress: () => void;
  isBtn: boolean;
}

type RootStackParamList = {
  screenSignIn: undefined;
  screenSignUp: undefined;
  HomeScreen: undefined;
  screenProfile: {userId: string; userEmail?: string};
  screenReset: undefined;
  name: undefined;
};

type Patient = {
  id: number;
  name: string;
  dob: string;
  phone: string;
  onPress: () => void;
};

interface PatientCardProps {
  name: string;
  birthDate: string;
  phone: string;
}
