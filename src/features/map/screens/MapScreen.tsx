import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useAuth } from '../../auth/hooks/useAuth';
import { useMyLocation } from '../hooks/useMyLocation';
import { locationService } from '../services/locationService';
import { UserMarker } from '../components/UserMarker';
import { UserListSheet } from '../components/UserListSheet';
import { Profile, UserLocation } from '../../../types';
import { colors } from '../../../shared/theme/colors';

export const MapScreen = () => {
  const { user } = useAuth();
  const { location: myLocation, errorMsg: locationError } = useMyLocation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userLocations, setUserLocations] = useState<Record<string, UserLocation>>({});
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [allProfiles, allLocations] = await Promise.all([
        locationService.getAllProfiles(),
        locationService.getAllUserLocations(),
      ]);

      setProfiles(allProfiles);
      
      const locationsMap: Record<string, UserLocation> = {};
      allLocations.forEach(loc => {
        locationsMap[loc.user_id] = loc;
      });
      setUserLocations(locationsMap);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch users data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const subscription = locationService.subscribeToAllUserLocations((payload) => {
      const { eventType, new: newLoc, old: oldLoc } = payload;
      
      if (eventType === 'INSERT' || eventType === 'UPDATE') {
        if (newLoc.user_id === user?.id) return; // Skip own location
        
        setUserLocations(prev => ({
          ...prev,
          [newLoc.user_id]: newLoc as UserLocation,
        }));
      } else if (eventType === 'DELETE') {
        setUserLocations(prev => {
          const newState = { ...prev };
          delete newState[oldLoc.user_id];
          return newState;
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, fetchData]);

  const handleSelectUser = (profile: Profile) => {
    const location = userLocations[profile.id];
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    } else {
      Alert.alert('Not Found', `${profile.full_name} has no shared location`);
    }
  };

  if (loading && Object.keys(userLocations).length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: myLocation?.coords.latitude || 0,
          longitude: myLocation?.coords.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {profiles.map(profile => {
          const location = userLocations[profile.id];
          if (!location) return null;
          return (
            <UserMarker
              key={profile.id}
              profile={profile}
              location={location}
            />
          );
        })}
      </MapView>
      <UserListSheet
        profiles={profiles}
        onSelectUser={handleSelectUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
