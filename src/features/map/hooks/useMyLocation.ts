import { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useAuth } from '../../auth/hooks/useAuth';
import { locationService } from '../services/locationService';

export const useMyLocation = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return false;
    }
    return true;
  };

  const updatePosition = async () => {
    if (!user) return;
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(location);
      await locationService.updateMyLocation(
        user.id,
        location.coords.latitude,
        location.coords.longitude,
        location.coords.accuracy || 0
      );
    } catch (error) {
      console.error('Error getting current position:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      if (granted) {
        await updatePosition();
        
        // Update every 10 seconds
        intervalRef.current = setInterval(() => {
          updatePosition();
        }, 10000);
      }
    })();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [user]);

  return {
    location,
    errorMsg,
    status,
    updatePosition,
  };
};
