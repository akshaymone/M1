import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const users = [
    { id: 1, name: 'Akshay Mone', email: 'mone.akshay@gmail.com', avatar: 'https://i.pravatar.cc/150?img=8', isMe: true },
    { id: 2, name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com', avatar: 'https://i.pravatar.cc/150?img=12', isMe: false },
    { id: 3, name: 'Priya Patel', email: 'priya.patel@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5', isMe: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=8' }} style={styles.largeAvatar} />
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.profileName}>Akshay Mone</Text>
          <Text style={styles.profileEmail}>mone.akshay@gmail.com</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>March 2024</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account ID</Text>
            <Text style={styles.infoValue}>#AX-00123</Text>
          </View>
        </View>

        {/* People Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>People</Text>
          <Text style={styles.sectionCount}>3 users</Text>
        </View>

        <View style={styles.tableContainer}>
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <View style={[styles.userRow, user.isMe && styles.highlightedRow]}>
                <Image source={{ uri: user.avatar }} style={styles.smallAvatar} />
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, user.isMe && styles.boldText]}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                {user.isMe ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>You</Text>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.trackButton}>
                    <Text style={styles.trackButtonText}>Track</Text>
                  </TouchableOpacity>
                )}
              </View>
              {index < users.length - 1 && <View style={styles.rowDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 24,
  },
  largeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  welcomeText: {
    color: '#888888',
    fontSize: 14,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#888888',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    color: '#888888',
  },
  infoValue: {
    color: '#ffffff',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionCount: {
    color: '#888888',
  },
  tableContainer: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  highlightedRow: {
    backgroundColor: '#1a3a5c',
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#888888',
    fontSize: 12,
  },
  badge: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  trackButton: {
    backgroundColor: '#4285F4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  trackButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#222222',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
