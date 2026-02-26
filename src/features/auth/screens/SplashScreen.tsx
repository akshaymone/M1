import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeLayout } from '../../../shared/components/SafeLayout';
import { colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';

export const SplashScreen: React.FC = () => {
  return (
    <SafeLayout style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>M1</Text>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: 24,
  },
});
