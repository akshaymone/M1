import { Slot, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

function NavigationGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (navigationState?.key) {
      setIsReady(true);
    }
  }, [navigationState]);

  useEffect(() => {
    if (!isReady || loading) return;
    
    const inAuthGroup = segments[0] === 'login';
    
    console.log('[NavigationGuard] state:', {
      user: user?.email ?? 'null',
      segments,
      inAuthGroup,
      isReady
    });
    
    if (!user) {
      if (!inAuthGroup) {
        console.log('[NavigationGuard] Redirecting to /login');
        router.replace('/login');
      }
    } else {
      if (inAuthGroup || segments.length === 0) {
        console.log('[NavigationGuard] Redirecting to /home');
        router.replace('/home');
      }
    }
  }, [user, loading, segments, isReady]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />
    </AuthProvider>
  );
}
