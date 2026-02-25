import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@/ctx/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black p-4">
      <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Welcome to M1Corp
      </Text>

      <TouchableOpacity
        onPress={signIn}
        className="bg-blue-600 px-6 py-3 rounded-lg flex-row items-center"
      >
        <Text className="text-white font-semibold text-lg">
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}
