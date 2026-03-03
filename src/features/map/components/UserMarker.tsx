import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { Profile, UserLocation } from '../../../types';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface UserMarkerProps {
  profile: Profile;
  location: UserLocation;
  onPress?: () => void;
}

export const UserMarker = ({ profile, location, onPress }: UserMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      onPress={onPress}
      title={profile.full_name}
    >
      <View style={styles.markerContainer}>
        {profile.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.initials}>
              {profile.full_name.substring(0, 1).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.arrow} />
      </View>
      <Callout>
        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>{profile.full_name}</Text>
          <Text style={styles.calloutSubtitle}>
            Last seen: {new Date(location.updated_at).toLocaleTimeString()}
          </Text>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'white',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
  },
  initials: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
    marginTop: -2,
  },
  callout: {
    padding: spacing.sm,
    minWidth: 150,
  },
  calloutTitle: {
    ...typography.h2,
    fontSize: 14,
    marginBottom: 4,
  },
  calloutSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
