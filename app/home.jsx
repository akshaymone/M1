import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user, logout, loading } = useAuth();
  console.log('[Home] Rendering, user:', user?.email ?? 'null');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // NavigationGuard will handle redirect automatically
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  const creationTime = user.metadata.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : 'N/A';

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

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>UID</Text>
          <Text style={styles.cardValue} numberOfLines={1} ellipsizeMode="middle">{user.uid}</Text>
        </View>
        <View style={styles.cardSeparator} />
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Joined</Text>
          <Text style={styles.cardValue}>{creationTime}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.logoutButtonText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4285F4',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: '#888888',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardLabel: {
    color: '#888888',
    fontSize: 14,
  },
  cardValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  cardSeparator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 5,
  },
  footer: {
    marginBottom: 40,
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
