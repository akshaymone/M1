import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { supabase } from '../lib/supabase';

interface MapScreenProps {
  userId: string;
  onClose: () => void;
  currentUserId: string;
}

export default function MapScreen({ userId, onClose, currentUserId }: MapScreenProps) {
  const [targetUser, setTargetUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myLocation, setMyLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    // 1. Fetch initial location of the target user
    fetchTargetUser();

    // 2. Subscribe to realtime updates for this user
    const channel = supabase
      .channel(`user_tracking_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          setTargetUser(payload.new);
        }
      )
      .subscribe();

    // 3. Start tracking my own location and updating Supabase
    let locationSubscription: Location.LocationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Update my location in DB every time it changes significantly
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // Update every 10 meters
        },
        async (location) => {
          setMyLocation(location);

          // Debounce or just update directly.
          await supabase.from('profiles').update({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            last_seen: new Date().toISOString(),
          }).eq('id', currentUserId);
        }
      );
    })();

    return () => {
      supabase.removeChannel(channel);
      if (locationSubscription) locationSubscription.remove();
    };
  }, [userId]);

  const fetchTargetUser = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) console.error('Error fetching target user:', error);
    if (data) setTargetUser(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Locating user...</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
             <Text style={styles.closeButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!targetUser || !targetUser.latitude || !targetUser.longitude) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>User has not shared their location yet.</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
            <Text style={styles.closeButton}>Close Map</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: targetUser.latitude,
          longitude: targetUser.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
            latitude: targetUser.latitude,
            longitude: targetUser.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: targetUser.latitude,
            longitude: targetUser.longitude,
          }}
          title={targetUser.full_name || targetUser.email}
          description={"Last seen: " + (targetUser.last_seen ? new Date(targetUser.last_seen).toLocaleTimeString() : "")}
        />

        {myLocation && (
             <Marker
                coordinate={{
                    latitude: myLocation.coords.latitude,
                    longitude: myLocation.coords.longitude,
                }}
                pinColor="blue"
                title="You"
             />
        )}
      </MapView>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={onClose}>
             <Text style={styles.closeButton}>Close Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButtonContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  closeButton: {
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold',
  },
});
