import { useState, useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { UserLocation } from '../../../types';
import { locationService } from '../services/locationService';

export const useUserLocation = (userId: string | undefined) => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: RealtimeChannel | null = null;

    const fetchInitialLocation = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const initialLocation = await locationService.getUserLocation(userId);
        setLocation(initialLocation);
        
        subscription = locationService.subscribeToUserLocation(userId, (newLocation) => {
          setLocation(newLocation);
        });
      } catch (err) {
        console.error('Error fetching/subscribing to user location:', err);
        setError('Failed to fetch user location');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLocation();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [userId]);

  return {
    location,
    loading,
    error,
  };
};
