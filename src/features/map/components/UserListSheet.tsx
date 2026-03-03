import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Profile, UserLocation } from '../../../types';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface UserListSheetProps {
  profiles: Profile[];
  onSelectUser: (profile: Profile) => void;
}

export const UserListSheet = ({ profiles, onSelectUser }: UserListSheetProps) => {
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const renderItem = ({ item }: { item: Profile }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={() => onSelectUser(item)}
    >
      <View style={styles.profileContent}>
        {item.avatar_url ? (
          <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.initials}>{item.full_name.substring(0, 1).toUpperCase()}</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.full_name}</Text>
          <Text style={styles.lastSeen}>
            {item.last_seen ? `Last active: ${new Date(item.last_seen).toLocaleString()}` : 'Never active'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>All Users</Text>
        <BottomSheetFlatList
          data={profiles}
          keyExtractor={(item: Profile) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users found</Text>
          }
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  bottomSheetBackground: {
    backgroundColor: colors.background,
    borderRadius: 24,
  },
  handleIndicator: {
    backgroundColor: colors.border,
    width: 40,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  profileItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.sm,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.border,
  },
  initials: {
    ...typography.h2,
    fontSize: 18,
    color: colors.textSecondary,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...typography.h2,
    fontSize: 16,
  },
  lastSeen: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  emptyText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.xl,
  },
});
