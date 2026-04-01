import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Navigate directly to login
    router.replace('/login');
  };

  const dummyUsers = [
    { id: '1', name: 'Akshay Mone', email: 'mone.akshay@gmail.com', avatar: 'https://i.pravatar.cc/150?u=akshay', current: true },
    { id: '2', name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://i.pravatar.cc/150?u=john' },
    { id: '3', name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://i.pravatar.cc/150?u=jane' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Top Header Section */}
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?u=akshay' }} 
            style={styles.avatar} 
          />
          <View style={styles.headerText}>
            <Text style={styles.welcomeBack}>Welcome back,</Text>
            <Text style={styles.userName}>Akshay Mone</Text>
            <Text style={styles.userEmail}>mone.akshay@gmail.com</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member since</Text>
            <Text style={styles.infoValue}>April 2024</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account ID</Text>
            <Text style={styles.infoValue}>M1-984210</Text>
          </View>
        </View>

        {/* People Table */}
        <View style={styles.peopleSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>People</Text>
            <Text style={styles.userCount}>3 users</Text>
          </View>

          <View style={styles.table}>
            {dummyUsers.map((user) => (
              <View key={user.id} style={[styles.tableRow, user.current && styles.highlightedRow]}>
                <Image source={{ uri: user.avatar }} style={styles.smallAvatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.tableUserName}>{user.name}</Text>
                  <Text style={styles.tableUserEmail}>{user.email}</Text>
                </View>
                <TouchableOpacity style={styles.trackButton}>
                  <Text style={styles.trackButtonText}>Track</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  headerText: {
    flex: 1,
  },
  welcomeBack: {
    fontSize: 14,
    color: '#888',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 4,
  },
  peopleSection: {
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  userCount: {
    fontSize: 14,
    color: '#888',
  },
  table: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  highlightedRow: {
    backgroundColor: '#1a1a1a',
    borderLeftWidth: 4,
    borderLeftColor: '#4285F4',
  },
  smallAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  tableUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  tableUserEmail: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  trackButton: {
    backgroundColor: '#333',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  trackButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
