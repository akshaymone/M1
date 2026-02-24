import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image, Modal } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import UserList from './components/UserList';
import MapScreen from './screens/MapScreen';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    // Log the redirect URL for debugging Supabase config
    const redirectUrl = Linking.createURL('/auth/callback');
    console.log('----------------------------------------------------');
    console.log('ADD THIS URL TO SUPABASE AUTH REDIRECT URLs:');
    console.log(redirectUrl);
    console.log('----------------------------------------------------');

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
      console.log('Signing in with redirect URL:', redirectUrl);

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

  const handleUserPress = (userId: string) => {
    setSelectedUserId(userId);
  };

  const closeMap = () => {
    setSelectedUserId(null);
  };

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <View style={styles.mainContent}>
          <View style={styles.header}>
            {session.user.user_metadata?.avatar_url && (
              <Image
                source={{ uri: session.user.user_metadata.avatar_url }}
                style={styles.avatar}
              />
            )}
            <View style={styles.headerText}>
              <Text style={styles.email}>{session.user.email}</Text>
              <Button title="Sign Out" onPress={signOut} disabled={loading} color="#ff4444" />
            </View>
          </View>

          <UserList onUserPress={handleUserPress} currentUserId={session.user.id} />

          <Modal visible={!!selectedUserId} animationType="slide">
             {selectedUserId && (
               <MapScreen
                  userId={selectedUserId}
                  onClose={closeMap}
                  currentUserId={session.user.id}
               />
             )}
          </Modal>
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  mainContent: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    marginLeft: 15,
    flex: 1,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#eee',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
