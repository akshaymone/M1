import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DonorProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.profileHeader}>
          <Text style={styles.donorName}>Tata Foundation</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified Donor ✅</Text>
          </View>
        </View>

        <View style={styles.donationCard}>
          <Text style={styles.donationLabel}>Total Donated</Text>
          <Text style={styles.donationAmount}>₹5,00,000</Text>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  inner: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  donorName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  verifiedBadge: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  verifiedText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '600',
  },
  donationCard: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  donationLabel: {
    color: '#888888',
    fontSize: 16,
    marginBottom: 10,
  },
  donationAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff5252',
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
