import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

function NavigationGuard() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    
    // segments[0] is the root folder name. expo-router 
    // routes usually start with (tabs), login, etc.
    const inAuthGroup = segments[0] === 'login';
    
    console.log('[NavigationGuard] user:', user?.email, 'segments:', segments, 'inAuthGroup:', inAuthGroup);
    
    if (user && inAuthGroup) {
      console.log('[NavigationGuard] User logged in, redirecting to /home');
      router.replace('/home');
    } else if (!user && !inAuthGroup && segments[0] !== undefined) {
      // Avoid redirecting if segments is empty (during initial load)
      console.log('[NavigationGuard] No user, redirecting to /login');
      router.replace('/login');
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
