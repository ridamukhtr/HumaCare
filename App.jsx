import { View, } from 'react-native';
import React, { useEffect, useState } from 'react';
import useThemeManager from './src/lib/customHooks/useThemeManger';
import AppNavigator, { navigationRef } from './src/navigators/AppNavigator';
import { Provider, useDispatch } from 'react-redux';
import { loadTheme } from './src/redux/themeReducer';
import { store } from './src/redux/store';
import 'react-native-url-polyfill/auto';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from './src/routes/RoutesConstants';
import { supabase } from './src/config/supabaseClient';

const App = () => {

  useEffect(() => {
    loadTheme().then((theme) => {
      store.dispatch(changeTheme(theme));
    });

    listenToAuthChanges();
  }, []);

  const listenToAuthChanges = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        // Token expired or user signed out
        await AsyncStorage.removeItem('authToken');
        navigationRef.current?.reset({
          index: 0,
          routes: [{ name: ROUTES.screenSignin }],
        });
      }
    });
  };


  return (
    <Provider store={store}>

      <View style={{ flex: 1 }}>
        <AppNavigator />

      </View>
    </Provider>
  );
};

export default App;

