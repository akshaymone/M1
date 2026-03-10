import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

function NavigationGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    
    // segments[0] is 'login' if we are at /login
    // segments is [] if we are at / (index)
    const inAuthGroup = segments[0] === 'login';
    
    console.log('[NavigationGuard] user:', user?.email, 'segments:', segments, 'inAuthGroup:', inAuthGroup);
    
    if (!user) {
      // If not logged in and not already in login screen, redirect to login
      if (!inAuthGroup) {
        console.log('[NavigationGuard] No user, redirecting to /login');
        router.replace('/login');
      }
    } else {
      // If logged in and at login screen (or root), redirect to home
      if (inAuthGroup || segments.length === 0) {
        console.log('[NavigationGuard] User logged in, redirecting to /home');
        router.replace('/home');
      }
    }
  }, [user, loading, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />
    </AuthProvider>
  );
}
