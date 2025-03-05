import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ROUTES} from '../../routes/RoutesConstants';
import {
  CalendarIcon,
  CalenderDarkMode,
  HomeDarkMode,
  HomeIcon,
  UsersDarkMode,
  UsersIcon,
} from '../../assets/svgIcons';
import {COLORS, wp} from '../../styles/theme-styles';
import {useSelector} from 'react-redux';
import useThemeManager from '../../lib/customHooks/useThemeManger';
import {selectedThemeSelector} from '../../redux/themeReducer';
import globalStyles from '../../styles/globalStyles';

const CustomTab = ({state, descriptors, navigation}) => {
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme, darkTheme} = useThemeManager(theme);
  return (
    <View
      style={[
        styles.tabBarContainer,
        {backgroundColor: colorTheme.background},
      ]}>
      <View style={[styles.tabBar, {backgroundColor: colorTheme.container}]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const renderIcon = () => {
            console.log(colorTheme.text);
            if (route.name === ROUTES.screenProfile) {
              return colorTheme.text === '#000000' ? (
                <HomeIcon />
              ) : (
                <HomeDarkMode />
              );
            } else if (route.name === ROUTES.screenPatient) {
              return colorTheme.text === '#000000' ? (
                <UsersIcon />
              ) : (
                <UsersDarkMode />
              );
            } else if (route.name === ROUTES.screenCalender) {
              return colorTheme.text === '#000000' ? (
                <CalendarIcon />
              ) : (
                <CalenderDarkMode />
              );
            }
            return null;
          };

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={onPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}>
              {renderIcon()}
              {isFocused && (
                <View
                  style={[styles.indicator, {backgroundColor: colorTheme.text}]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  tabBarContainer: {
    paddingHorizontal: wp * 0.05,
    // paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // bottom: wp * 0.03,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    bottom: wp * 0.03,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    ...globalStyles.shadowInput,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  indicator: {
    width: wp * 0.009,
    height: wp * 0.009,
    borderRadius: wp * 0.04,
    position: 'absolute',
    bottom: 8,
  },
});
