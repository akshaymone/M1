import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  latitude: number | null;
  longitude: number | null;
  last_seen: string | null;
}

interface UserListProps {
  onUserPress: (userId: string) => void;
  currentUserId: string | undefined;
}

export default function UserList({ onUserPress, currentUserId }: UserListProps) {
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    fetchUsers();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:profiles')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setUsers((prev) => [...prev, payload.new as Profile]);
          } else if (payload.eventType === 'UPDATE') {
            setUsers((prev) =>
              prev.map((user) =>
                user.id === payload.new.id ? (payload.new as Profile) : user
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUsers = async () => {
    if (!currentUserId) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', currentUserId);

    if (error) console.error('Error fetching users:', error);
    if (data) setUsers(data as Profile[]);
  };

  const renderItem = ({ item }: { item: Profile }) => (
    <TouchableOpacity style={styles.item} onPress={() => onUserPress(item.id)}>
      <Image
        source={{
          uri: item.avatar_url || 'https://via.placeholder.com/50',
        }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.full_name || item.email}</Text>
        <Text style={styles.status}>
          {item.latitude && item.longitude ? '📍 Location Shared' : 'Last seen: ' + (item.last_seen ? new Date(item.last_seen).toLocaleDateString() : 'Never')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Members</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});
