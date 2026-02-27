import { useState, useEffect, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../../shared/services/supabase';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const initialSessionSet = useRef(false);

  useEffect(() => {
    // Step 1: Set up listener FIRST before getSession()
    // This ensures we never miss an auth event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth] onAuthStateChange event:', event, 'session:', !!session);

      // Only update session from listener AFTER initial session has been set
      // This prevents race condition where listener fires with null before
      // getSession() restores session from AsyncStorage
      if (initialSessionSet.current) {
        setSession(session);
        setUser(session?.user ?? null);
      }

      // Always update loading on these events
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    // Step 2: THEN check for existing session in AsyncStorage
    const initializeAuth = async () => {
      try {
        console.log('[Auth] Checking existing session...');
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('[Auth] Error fetching session:', error);
          throw error;
        }

        console.log('[Auth] Initial session found:', !!initialSession);
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        initialSessionSet.current = true;
      } catch (error) {
        console.error('[Auth] Session initialization error:', error);
        initialSessionSet.current = true;
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
    } catch (error) {
      console.error('[Auth] Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    session,
    user,
    loading,
    signOut,
  };
};
