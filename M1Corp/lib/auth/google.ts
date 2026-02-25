import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { supabase } from '../supabase';

export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    webClientId: '173114998005-e3pmatmddnelcdoreeehui8meps5put2.apps.googleusercontent.com', // From user input
    offlineAccess: true,
  });
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.data?.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });

      if (error) {
        throw error;
      }

      return data;
    } else {
      throw new Error('No ID token present!');
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('User cancelled login');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('Login in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('Play services not available');
    } else {
      // some other error happened
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Sign Out Error:', error);
  }
};
