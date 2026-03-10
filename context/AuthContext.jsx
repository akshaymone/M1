import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { signInWithGoogle, logout as logoutService } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredSession = async () => {
      try {
        const stored = await AsyncStorage.getItem('user_session');
        if (stored) {
          console.log('[AuthContext] Found stored session, restoring...');
          setUser(JSON.parse(stored));
          setLoading(false);
        }
      } catch (error) {
        console.log('[AuthContext] Error reading stored session:', error);
      }
    };
    checkStoredSession();
  }, []);

  useEffect(() => {
    console.log('[AuthContext] Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('[AuthContext] onAuthStateChanged fired, user:', firebaseUser?.email ?? 'null');
      
      try {
        if (firebaseUser) {
          await AsyncStorage.setItem('user_session', JSON.stringify({
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            uid: firebaseUser.uid,
          }));
        } else {
          await AsyncStorage.removeItem('user_session');
        }
      } catch (error) {
        console.log('[AuthContext] Error persisting session:', error);
      }

      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    console.log('[AuthContext] signIn() called');
    try {
      const loggedInUser = await signInWithGoogle();
      console.log('[AuthContext] signInWithGoogle() returned:', loggedInUser?.email ?? 'null');
      
      // Manual state update for immediate reaction
      setUser(loggedInUser);
      
      // Also persist manually just in case
      if (loggedInUser) {
        await AsyncStorage.setItem('user_session', JSON.stringify({
          email: loggedInUser.email,
          displayName: loggedInUser.displayName,
          photoURL: loggedInUser.photoURL,
          uid: loggedInUser.uid,
        }));
      }
    } catch (error) {
      console.log('[AuthContext] signIn() error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    console.log('[AuthContext] logout() called');
    try {
      await logoutService();
      await AsyncStorage.removeItem('user_session');
      setUser(null);
    } catch (error) {
      console.log('[AuthContext] logout() error:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle: signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
