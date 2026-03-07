import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const WEB_CLIENT_ID = "914222557654-mseg724qoodm8iin0ah51pf61jr0q1hn.apps.googleusercontent.com";

export async function signInWithGoogle() {
  try {
    await WebBrowser.warmUpAsync();
    
    const redirectUri = AuthSession.makeRedirectUri({ 
      scheme: 'm1',
      preferLocalhost: true,
    });
    console.log('Redirect URI:', redirectUri);

    const authUrl = 
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${WEB_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=openid%20profile%20email` +
      `&prompt=select_account`;
    console.log('Auth URL:', authUrl);

    const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
    
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
    await WebBrowser.coolDownAsync();
  } catch (error) {
    console.error('Google Sign-in error:', error);
    throw error;
  }
}

export async function logout() {
  await auth.signOut();
}
