import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { logout as googleSignOut } from '../services/authService';

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Using the Web Client ID for all platforms is usually best for Expo Go.
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "914222557654-mseg724qoodm8iin0ah51pf61jr0q1hn.apps.googleusercontent.com",
    androidClientId: "914222557654-mseg724qoodm8iin0ah51pf61jr0q1hn.apps.googleusercontent.com",
    // iosClientId: "YOUR_IOS_CLIENT_ID",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const processResponse = async () => {
      if (response?.type === 'success') {
        const { id_token, authentication } = response.params;
        // id_token is what we need for GoogleAuthProvider.
        // Some responses might use 'authentication.idToken' instead.
        const token = id_token || authentication?.idToken;
        if (token) {
          const credential = GoogleAuthProvider.credential(token);
          setLoading(true);
          try {
            await signInWithCredential(auth, credential);
          } catch (error) {
            console.error('Sign-In Error during Firebase credential exchange:', error);
          } finally {
            setLoading(false);
          }
        }
      } else if (response?.type === 'error' || response?.type === 'cancel') {
        console.log('Google Auth Response:', response);
        setLoading(false);
      }
    };

    processResponse();
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
