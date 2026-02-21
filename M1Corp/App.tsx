import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Handle deep link when the app is opened via URL
    const handleDeepLink = (event: { url: string }) => {
      console.log('Deep link received:', event.url);

      const { queryParams } = Linking.parse(event.url);
      const access_token = queryParams?.access_token;
      const refresh_token = queryParams?.refresh_token;

      if (access_token && refresh_token) {
        supabase.auth.setSession({
          access_token: String(access_token),
          refresh_token: String(refresh_token),
        });
      }
    };

    const subscriptionUrl = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.unsubscribe();
      subscriptionUrl.remove();
    };
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const redirectUrl = Linking.createURL('/auth/callback');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectUrl
        );

        if (result.type === 'success' && result.url) {
          const { queryParams } = Linking.parse(result.url);
          if (queryParams?.access_token && queryParams?.refresh_token) {
             supabase.auth.setSession({
                access_token: String(queryParams.access_token),
                refresh_token: String(queryParams.refresh_token),
             });
          }
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <View style={styles.content}>
          <Text style={styles.title}>Welcome back!</Text>
          {session.user.user_metadata?.avatar_url && (
            <Image
              source={{ uri: session.user.user_metadata.avatar_url }}
              style={styles.avatar}
            />
          )}
          <Text style={styles.subtitle}>{session.user.email}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Sign Out" onPress={signOut} disabled={loading} color="#ff4444" />
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>M1Corp</Text>
          <Text style={styles.subtitle}>Community Building App</Text>
          <Button
            title="Sign in with Google"
            onPress={signInWithGoogle}
            disabled={loading}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#eee',
  },
  buttonContainer: {
    marginTop: 10,
    width: '50%',
  },
});
