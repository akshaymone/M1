import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface SafeLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SafeLayout: React.FC<SafeLayoutProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
