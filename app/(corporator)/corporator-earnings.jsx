import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CorporatorEarnings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Earnings Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
});
