import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  console.log('[Index] Rendering, user:', user?.email ?? 'null', 'loading:', loading);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace('/home');
    } else {
      router.replace('/login');
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
