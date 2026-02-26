import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SafeLayout } from '../../../shared/components/SafeLayout';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

export const LoginScreen: React.FC = () => {
  return (
    <SafeLayout style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to M1</Text>
          <Text style={styles.subtitle}>Sign in to start earning rewards</Text>
        </View>
        
        <View style={styles.footer}>
          <GoogleSignInButton />
          <Text style={styles.terms}>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: spacing.md,
  },
  terms: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
