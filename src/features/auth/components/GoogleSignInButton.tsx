import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { supabase } from '../../../shared/services/supabase';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

WebBrowser.maybeCompleteAuthSession();

export const GoogleSignInButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const performOAuth = async () => {
    try {
      setLoading(true);
      const redirectUri = Linking.createURL('/auth/callback');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      const res = await WebBrowser.openAuthSessionAsync(
        data.url ?? '',
        redirectUri
      );

      if (res.type === 'success' && res.url) {
        const parsed = Linking.parse(res.url);
        const { access_token, refresh_token } = parsed.queryParams || {};
        
        if (access_token && refresh_token) {
          await supabase.auth.setSession({
            access_token: access_token as string,
            refresh_token: refresh_token as string,
          });
        }
      }
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={performOAuth}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <View style={styles.content}>
          <Text style={styles.text}>Sign in with Google</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
});
