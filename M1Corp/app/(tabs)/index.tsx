import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '@/ctx/AuthContext';

export default function TabOneScreen() {
  const { session, signOut } = useAuth();
  const user = session?.user;
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black p-4">
      <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Welcome Back!
      </Text>

      {avatarUrl && (
        <Image
          source={{ uri: avatarUrl }}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <Text className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        {user?.email}
      </Text>

      <Text className="text-sm text-gray-500 mb-8">
        User ID: {user?.id}
      </Text>

      <TouchableOpacity
        onPress={signOut}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
