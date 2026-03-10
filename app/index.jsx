import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Fallback: If NavigationGuard fails, index tries to push
    if (!loading) {
      const timeout = setTimeout(() => {
        if (user) {
          router.replace('/home');
        } else {
          router.replace('/login');
        }
      }, 500); // Small delay to let _layout handle it first
      return () => clearTimeout(timeout);
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4285F4" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
