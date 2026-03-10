import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { signInWithGoogle, logout as logoutService } from '../services/authService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthContext] Setting up onAuthStateChanged listener');
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('[AuthContext] onAuthStateChanged fired, user:', firebaseUser?.email ?? 'null');
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
      setUser(loggedInUser);
    } catch (error) {
      console.log('[AuthContext] signIn() error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    console.log('[AuthContext] logout() called');
    try {
      await logoutService();
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
