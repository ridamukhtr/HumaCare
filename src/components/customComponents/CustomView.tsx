import {KeyboardAvoidingView, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Logo} from '../../assets/svgImages';
import {COLORS, hp, IS_IOS, wp} from '../../styles/theme-styles';
import useThemeManager from '../../lib/customHooks/useThemeManger';
import {useDispatch, useSelector} from 'react-redux';
import {Switch} from 'react-native-switch';
import {
  changeTheme,
  selectedThemeSelector,
  setInitialTheme,
} from '../../redux/themeReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NightMode, LightMode} from '../../assets/svgIcons';

const CustomView: React.FC<CustomViewProps> = ({
  children,
  isSimpleView = false,
  isTopView = false,
  isSwitch = false,
}) => {
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme} = useThemeManager(theme);

  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(theme === 'light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      const defaultTheme = savedTheme;
      dispatch(setInitialTheme(defaultTheme));
    };

    loadTheme();
  }, [dispatch]);
  const fnToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setIsEnabled(!isEnabled);
    dispatch(changeTheme(newTheme));
  };
  return (
    <>
      {isSimpleView ? (
        isTopView ? (
          <View style={{backgroundColor: COLORS.LIGHTBGCOLOR}}>
            <StatusBar
              barStyle={colorTheme.statusBar}
              backgroundColor={colorTheme.background}
              translucent={false}
            />

            <View style={{backgroundColor: colorTheme.background}}>
              <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
                <View
                  style={{
                    backgroundColor: colorTheme.background,
                  }}>
                  <View
                    style={[
                      styles.logo,
                      {
                        flexDirection: 'row',
                        justifyContent: 'center',
                      },
                    ]}>
                    <View style={styles.logoSvg}>
                      <Logo />
                    </View>
                    {isSwitch && (
                      <Switch
                        value={isEnabled}
                        onValueChange={fnToggleTheme}
                        activeText={''}
                        inActiveText={''}
                        circleSize={wp * 0.05}
                        barHeight={wp * 0.052}
                        circleBorderWidth={0}
                        backgroundActive={COLORS.PRIMARY}
                        backgroundInactive={COLORS.DARK_MODE_RED}
                        innerCircleStyle={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        renderInsideCircle={() => (
                          <View
                            style={{
                              alignItems: 'center',
                              width: wp * 0.01,
                              height: wp * 0.01,
                            }}>
                            {isEnabled ? <NightMode /> : <LightMode />}
                          </View>
                        )}
                      />
                    )}
                  </View>
                </View>
                <View
                  style={[
                    styles.container,
                    {backgroundColor: colorTheme.container},
                  ]}>
                  {children}
                </View>
              </KeyboardAvoidingView>
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: colorTheme.sheetModule,
              flex: 1,
            }}>
            <StatusBar
              barStyle={colorTheme.statusBar}
              backgroundColor={colorTheme.container}
              translucent={false}
            />

            <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
              <View
                style={{
                  backgroundColor: colorTheme.container,
                }}>
                <View
                  style={[
                    styles.logo,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                    },
                  ]}>
                  <View style={{width: wp * 0.8, alignItems: 'center'}}>
                    <Logo />
                  </View>
                  {isSwitch && (
                    <Switch
                      value={isEnabled}
                      onValueChange={fnToggleTheme}
                      activeText={''}
                      inActiveText={''}
                      circleSize={wp * 0.05}
                      barHeight={wp * 0.052}
                      circleActiveColor={COLORS.LIGHTBGCOLOR}
                      circleBorderWidth={0}
                      backgroundActive={COLORS.PRIMARY}
                      backgroundInactive={COLORS.GRAY}
                      innerCircleStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      renderInsideCircle={() => (
                        <View
                          style={{
                            alignItems: 'center',
                            width: wp * 0.03,
                            height: wp * 0.03,
                          }}>
                          {isEnabled ? <LightMode /> : <NightMode />}
                        </View>
                      )}
                    />
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.bodyContainer,
                  {
                    backgroundColor: colorTheme.container,
                    paddingBottom: wp * 0.06,
                  },
                ]}>
                {children}
              </View>
            </KeyboardAvoidingView>
          </View>
        )
      ) : (
        <View style={{backgroundColor: colorTheme.background, flex: 1}}>
          <StatusBar
            barStyle={colorTheme.statusBar}
            backgroundColor={colorTheme.background}
            translucent={false}
          />

          <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : 'height'}>
            <View style={styles.logo}>
              <Logo />
            </View>
            <View
              style={[
                styles.container,
                {backgroundColor: colorTheme.container},
              ]}>
              {children}
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    paddingTop: wp * 0.05,
    paddingBottom: wp * 0.1,
  },
  logoSvg: {
    width: wp * 0.8,
    alignItems: 'center',
  },

  container: {
    position: 'relative',
    minHeight: wp * 50,
    borderTopLeftRadius: wp * 0.1,
    borderTopRightRadius: wp * 0.1,
    paddingHorizontal: wp * 0.04,
    paddingTop: wp * 0.05,
  },
  bodyContainer: {
    minHeight: hp * 0.78,
    borderBottomLeftRadius: wp * 0.1,
    borderBottomRightRadius: wp * 0.1,
    paddingHorizontal: wp * 0.04,
  },
});
