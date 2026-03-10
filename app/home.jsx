import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { getUsers } from '../services/userService';

export default function HomeScreen() {
  const { user, logout, loading: authLoading } = useAuth();
  const [users, setUsers] = useState([]);
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('[Home] Rendering, user:', user?.email ?? 'null');
    
    if (user) {
      const unsubscribe = getUsers((allUsers) => {
        // Sort users: current user first, then others by lastLoginAt (descending)
        const sortedUsers = [...allUsers].sort((a, b) => {
          if (a.uid === user.uid) return -1;
          if (b.uid === user.uid) return 1;
          return new Date(b.lastLoginAt) - new Date(a.lastLoginAt);
        });
        setUsers(sortedUsers);
        setFetchingUsers(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      // NavigationGuard will handle redirect automatically
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!user && authLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: user.photoURL || 'https://via.placeholder.com/100' }} 
          style={styles.avatar} 
        />
        <Text style={styles.welcomeText}>Welcome, {user.displayName}!</Text>
        <Text style={styles.emailText}>{user.email}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.statsText}>{users.length} users registered</Text>

        {fetchingUsers ? (
          <ActivityIndicator size="large" color="#4285F4" style={{ marginTop: 40 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.tableScroll}>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.columnHeader, { width: 60 }]}>Avatar</Text>
                <Text style={[styles.columnHeader, { width: 150 }]}>Name</Text>
                <Text style={[styles.columnHeader, { width: 200 }]}>Email</Text>
                <Text style={[styles.columnHeader, { width: 150 }]}>Last Login</Text>
              </View>

              {/* Table Body */}
              <ScrollView style={styles.tableBodyScroll}>
                {users.map((item, index) => {
                  const isCurrentUser = item.uid === user.uid;
                  const rowStyle = [
                    styles.tableRow,
                    index % 2 === 0 ? styles.rowEven : styles.rowOdd,
                    isCurrentUser && styles.rowHighlight
                  ];

                  return (
                    <View key={item.uid} style={rowStyle}>
                      <View style={[styles.cell, { width: 60, alignItems: 'center' }]}>
                        <Image source={{ uri: item.photoURL || 'https://via.placeholder.com/50' }} style={styles.smallAvatar} />
                      </View>
                      <Text style={[styles.cellText, { width: 150 }]} numberOfLines={1}>{item.displayName || 'N/A'}</Text>
                      <Text style={[styles.cellText, { width: 200 }]} numberOfLines={1}>{item.email}</Text>
                      <Text style={[styles.cellText, { width: 150 }]}>
                        {new Date(item.lastLoginAt).toLocaleDateString()} {new Date(item.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  emailText: {
    fontSize: 14,
    color: '#888888',
  },
  content: {
    flex: 1,
  },
  statsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  tableScroll: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
  },
  table: {
    minWidth: 560, // Total of columns widths
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  columnHeader: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  tableBodyScroll: {
    maxHeight: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rowEven: {
    backgroundColor: '#0a0a0a',
  },
  rowOdd: {
    backgroundColor: '#111111',
  },
  rowHighlight: {
    backgroundColor: '#4285F444', // Highlight with low opacity
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
  },
  cell: {
    paddingHorizontal: 10,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  cellText: {
    color: '#cccccc',
    fontSize: 13,
    paddingHorizontal: 10,
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e53935',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
