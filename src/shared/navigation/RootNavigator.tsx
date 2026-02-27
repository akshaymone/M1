import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import { SplashScreen } from '../../features/auth/screens/SplashScreen';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { RootStackParamList } from '../../types';
import { supabase } from '../services/supabase';

const Stack = createNativeStackNavigator<RootStackParamList>();

const handleAuthUrl = async (url: string) => {
  console.log('[Navigator] Handling auth URL:', url);

  if (!url.startsWith('m1://')) return;

  const parsed = Linking.parse(url);
  console.log('[Navigator] Parsed URL params:', JSON.stringify(parsed.queryParams));

  const code = parsed.queryParams?.code as string | undefined;

  if (code) {
    console.log('[Navigator] Exchanging PKCE code for session...');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('[Navigator] Code exchange error:', error);
    } else {
      console.log('[Navigator] Session obtained successfully:', !!data.session);
    }
  } else {
    console.warn('[Navigator] No code found in callback URL:', url);
  }
};

export const RootNavigator = () => {
  const { session, loading } = useAuth();

  useEffect(() => {
    // Handle deep link when app is already running (foreground)
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('[Navigator] Deep link received (foreground):', url);
      handleAuthUrl(url);
    });

    // Handle deep link when app was closed/background
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('[Navigator] Initial URL on launch:', url);
        handleAuthUrl(url);
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : session ? (
          <Stack.Screen name="App" component={AppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
