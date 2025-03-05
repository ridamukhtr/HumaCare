import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigation from './BottomNavigation';
import SignInScreen from '../screens/SignInScreen';
import {ROUTES} from '../routes/RoutesConstants';
import ProfileScreen from '../screens/ProfileScreen';
import ResetScreen from '../screens/ResetScreen';
import PatientProfileDetails from '../screens/PatientProfileDetails';
import CalenderDetail from '../screens/CalenderDetail';

const Stack = createStackNavigator();

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('authToken');
      console.log('token', token);

      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return null;
  console.log('auth', isAuthenticated);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          isAuthenticated ? ROUTES.screenHome : ROUTES.screenSignin
        }>
        <Stack.Screen name={ROUTES.screenHome} component={BottomNavigation} />
        <Stack.Screen name={ROUTES.screenSignin} component={SignInScreen} />
        <Stack.Screen
          name={ROUTES.screenPatientProfileDetails}
          component={PatientProfileDetails}
        />
        <Stack.Screen
          name={ROUTES.screenCalenderDetail}
          component={CalenderDetail}
        />
        <Stack.Screen name={ROUTES.screenReset} component={ResetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
