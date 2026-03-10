import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { signInWithGoogle, loading } = useAuth();
  console.log('[Login] Rendering');
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    console.log('[Login] handleSignIn called');
    setError(null);
    try {
      await signInWithGoogle();
      console.log('[Login] signInWithGoogle completed');
      // NavigationGuard will handle redirect automatically
    } catch (err) {
      console.log('[Login] handleSignIn error:', err.message);
      setError(err.message || 'Something went wrong during sign in');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>M1</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={handleSignIn}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>Sign in with Google</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
    marginBottom: 40,
  },
  errorText: {
    color: '#e53935',
    marginBottom: 20,
  },
  googleButton: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: '600',
  },
});
