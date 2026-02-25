import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TabOneScreen() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        M1Corp App
      </Text>
      <View className="w-4/5 h-px bg-gray-300 dark:bg-gray-700 my-4" />
      <Text className="text-base text-gray-600 dark:text-gray-400">
        Supabase Connection: {loading ? 'Checking...' : 'Connected'}
      </Text>
      <Text className="text-sm text-gray-500 mt-2">
        Session: {session ? 'Active' : 'No Session'}
      </Text>
    </View>
  );
}
