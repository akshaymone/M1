import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

GoogleSignin.configure({
  webClientId: '914222557654-mseg724qoodm8iin0ah51pf61jr0q1hn.apps.googleusercontent.com',
  offlineAccess: true,
});

export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    const idToken = response.data?.idToken;
    if (!idToken) throw new Error('No ID token returned');
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Sign in cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign in already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play services not available');
    }
    throw error;
  }
}

export async function logout() {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    await auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
