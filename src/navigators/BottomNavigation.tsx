// BottomNavigation.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ROUTES} from '../routes/RoutesConstants';
import ProfileScreen from '../screens/ProfileScreen';
import PatientScreen from '../screens/PatientScreen';
import CalenderScreen from '../screens/CalenderScreen';
import {
  CalendarIcon,
  CalenderDarkMode,
  HomeDarkMode,
  HomeIcon,
  MoveNext,
  UsersDarkMode,
  UsersIcon,
} from '../assets/svgIcons';
import CustomTab from '../components/customComponents/CustomTab';
import {useSelector} from 'react-redux';
import {selectedThemeSelector} from '../redux/themeReducer';
import useThemeManager from '../lib/customHooks/useThemeManger';
import {createStackNavigator} from '@react-navigation/stack';
import PatientProfileDetails from '../screens/PatientProfileDetails';
import CalenderDetail from '../screens/CalenderDetail';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const PatientStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ROUTES.screenPatient} component={PatientScreen} />
    <Stack.Screen
      name={ROUTES.screenPatientProfileDetails}
      component={PatientProfileDetails}
    />
  </Stack.Navigator>
);
const CalenderStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name={ROUTES.screenCalender} component={CalenderScreen} />
    <Stack.Screen
      name={ROUTES.screenCalenderDetail}
      component={CalenderDetail}
    />
  </Stack.Navigator>
);

const BottomNavigation = () => {
  const theme = useSelector(selectedThemeSelector);
  const {colorTheme, darkTheme} = useThemeManager(theme);
  console.log('color', colorTheme.text);

  return (
    <Tab.Navigator
      tabBar={props => <CustomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.screenProfile}>
      <Tab.Screen
        name={ROUTES.screenProfile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) =>
            colorTheme.text ? <HomeDarkMode /> : <HomeIcon />,
        }}
      />

      <Tab.Screen
        name={ROUTES.screenPatient}
        component={PatientStackNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <UsersIcon /> : <UsersDarkMode />,
        }}
      />

      <Tab.Screen
        name={ROUTES.screenCalender}
        component={CalenderStackNavigator}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <CalendarIcon /> : <CalenderDarkMode />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
