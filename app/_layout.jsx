import React from "react";
import { View } from "react-native";
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
    <SafeAreaProvider>
      <Slot />
    </View>
    </SafeAreaProvider>
  );
}
