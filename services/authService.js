import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

// Use ANDROID client ID (not web client ID)
// Get from google-services.json where client_type is 1
const ANDROID_CLIENT_ID = "914222557654-8pqljd07acchcgjg8qqlv0ks4hvc022h.apps.googleusercontent.com";

const redirectUri = 'http://localhost';

export async function signInWithGoogle() {
  try {
    const authUrl = 
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${ANDROID_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=openid%20profile%20email` +
      `&prompt=select_account`;

    const result = await WebBrowser.openAuthSessionAsync(
      authUrl, 
      redirectUri
    );

    if (result.type === 'success') {
      const url = result.url;
      const params = new URLSearchParams(url.split('#')[1]);
      const access_token = params.get('access_token');
      if (access_token) {
        const credential = GoogleAuthProvider.credential(null, access_token);
        const userCredential = await signInWithCredential(auth, credential);
        return userCredential.user;
      }
    }
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
}

export async function logout() {
  await auth.signOut();
}
