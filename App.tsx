import 'react-native-url-polyfill/auto';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/shared/navigation/RootNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
  );
}
