import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReviewSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Header */}
        <View style={styles.successHeader}>
          <Text style={styles.successEmoji}>✅</Text>
          <Text style={styles.title}>Verification Complete!</Text>
          <Text style={styles.subtitle}>
            The tree planting has been successfully verified
          </Text>
        </View>

        {/* Rewards Card */}
        <View style={styles.rewardsCard}>
          <Text style={styles.cardTitle}>Rewards Distributed 🎉</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.rewardRow}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=8' }} 
              style={styles.rewardAvatar} 
            />
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>Akshay Mone</Text>
              <Text style={styles.rewardStatus}>Doer</Text>
            </View>
            <Text style={styles.rewardAmount}>₹100 credited</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rewardRow}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
              style={styles.rewardAvatar} 
            />
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardName}>Rahul Sharma</Text>
              <Text style={styles.rewardStatus}>Reviewer</Text>
            </View>
            <Text style={styles.rewardAmount}>₹25 credited</Text>
          </View>
        </View>

        {/* Green Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            🌱 Neem Tree successfully planted and verified!
          </Text>
          <Text style={styles.summarySubtitle}>
            Pune - Sector 4 Aundh • Today
          </Text>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.mapButton}
            onPress={() => router.push('/(user)/home')}

          >
            <Text style={styles.mapButtonText}>View Tree on Map</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => router.push('/(user)/home')}

          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
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
  successHeader: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 24,
  },
  successEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 32,
    marginTop: 12,
    lineHeight: 22,
  },
  rewardsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginHorizontal: 24,
    padding: 20,
    marginVertical: 24,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#222222',
    marginVertical: 12,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardStatus: {
    color: '#888888',
    fontSize: 12,
  },
  rewardAmount: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  summaryCard: {
    backgroundColor: '#1b5e20',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    marginTop: 16,
  },
  summaryTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  summarySubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  mapButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  homeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
