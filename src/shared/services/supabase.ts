import 'react-native-get-random-values';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

// These should ideally be in a secure place, but we'll use process.env
// and configure them in App.tsx or similar via a provider if needed.
// For now, we'll assume they're available via process.env.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // For React Native, handled manually with AuthSession
  },
});
