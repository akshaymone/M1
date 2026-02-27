import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
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

      const redirectUri = 'm1://auth/callback';
      console.log('[OAuth] Starting OAuth with redirectUri:', redirectUri);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        console.error('[OAuth] signInWithOAuth error:', error);
        throw error;
      }

      console.log('[OAuth] Opening browser...');

      // Open browser - RootNavigator handles the deep link callback
      await WebBrowser.openBrowserAsync(data.url ?? '', {
        showTitle: false,
        toolbarColor: colors.primary,
        enableBarCollapsing: false,
      });

      console.log('[OAuth] Browser closed');

    } catch (error) {
      console.error('[OAuth] performOAuth error:', error);
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
