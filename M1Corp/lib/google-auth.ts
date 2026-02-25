import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './supabase';

export const configureGoogleSignin = () => {
  GoogleSignin.configure({
    webClientId: '173114998005-e3pmatmddnelcdoreeehui8meps5put2.apps.googleusercontent.com',
  });
};

export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.data?.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });

      if (error) throw error;
      return data.session;
    } else {
      throw new Error('No ID token present!');
    }
  } catch (error: any) {
    if (error.code === 'SIGN_IN_CANCELLED') {
      // user cancelled the login flow
    } else if (error.code === 'IN_PROGRESS') {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
      // play services not available or outdated
    } else {
      // some other error happened
      console.error(error);
    }
  }
}

export async function googleSignOut() {
  try {
    await GoogleSignin.signOut();
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
}
