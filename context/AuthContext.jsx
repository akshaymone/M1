import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { logout as googleSignOut } from '../services/authService';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "914222557654-mseg724qoodm8iin0ah51pf61jr0q1hn.apps.googleusercontent.com",
    webClientId: "914222557654-mseg724qoodm8iin0ah51pf61jr0q1hn.apps.googleusercontent.com",
    redirectUri: makeRedirectUri({
      scheme: 'https',
      path: 'auth.expo.io/@akshaymone/M1'
    })
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await promptAsync();
      if (result.type !== 'success') {
        setLoading(false);
      }
    } catch (error) {
      console.error('Sign-In Error during prompt:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await googleSignOut();
      setUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
