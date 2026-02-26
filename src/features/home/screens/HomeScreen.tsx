import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SafeLayout } from '../../../shared/components/SafeLayout';
import { Button } from '../../../shared/components/Button';
import { useAuth } from '../../auth/hooks/useAuth';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

export const HomeScreen: React.FC = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SafeLayout style={styles.container}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          {user?.user_metadata?.avatar_url ? (
            <Image
              source={{ uri: user.user_metadata.avatar_url }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarInitial}>
                {user?.email?.[0].toUpperCase()}
              </Text>
            </View>
          )}
          
          <Text style={styles.userName}>
            {user?.user_metadata?.full_name ?? user?.email?.split('@')[0]}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Log Out"
            onPress={handleSignOut}
            loading={loading}
            variant="error"
          />
        </View>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: spacing.xxl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },
  avatarPlaceholder: {
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    ...typography.h1,
    color: colors.textSecondary,
  },
  userName: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footer: {
    paddingBottom: spacing.lg,
  },
});
