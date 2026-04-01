import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReviewRequestScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Warning Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⏳ Verification Required</Text>
        </View>

        {/* Center Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.largeIcon}>📹</Text>
        </View>

        {/* Titles */}
        <Text style={styles.title}>Review Requested!</Text>
        <Text style={styles.subtitle}>
          A reviewer will join shortly to verify your tree planting. Please stay at the location.
        </Text>

        <View style={styles.divider} />

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Action</Text>
            <Text style={styles.infoValue}>Tree Planting</Text>
          </View>
          <View style={styles.cardDivider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>Pune - Sector 4 Aundh</Text>
          </View>
          <View style={styles.cardDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reward</Text>
            <Text style={[styles.infoValue, { color: '#ffc107' }]}>₹100 (pending review)</Text>
          </View>
          <View style={styles.cardDivider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Reviewer Reward</Text>
            <Text style={[styles.infoValue, { color: '#4caf50', fontSize: 12 }]}>₹25</Text>
          </View>
        </View>

        {/* Waiting Section */}
        <View style={styles.waitingSection}>
          <Text style={styles.waitingText}>Waiting for reviewer...</Text>
          <View style={styles.spinnerContainer}>
             <View style={styles.dot} />
             <View style={[styles.dot, { opacity: 0.6 }]} />
             <View style={[styles.dot, { opacity: 0.3 }]} />
          </View>
          <Text style={styles.notifiedText}>2 users notified</Text>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel Request</Text>
        </TouchableOpacity>

        {/* Bottom Note */}
        <Text style={styles.bottomNote}>
          Your reward will be credited once reviewer approves
        </Text>
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
  banner: {
    backgroundColor: '#f57c00',
    borderRadius: 12,
    padding: 12,
    margin: 16,
    alignItems: 'center',
  },
  bannerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  largeIcon: {
    fontSize: 64,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 24,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#222222',
    marginVertical: 24,
    marginHorizontal: 16,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    color: '#888888',
    fontSize: 14,
  },
  infoValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#222222',
    marginVertical: 12,
  },
  waitingSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  waitingText: {
    color: '#888888',
    fontStyle: 'italic',
    fontSize: 14,
  },
  spinnerContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2e7d32',
  },
  notifiedText: {
    color: '#888888',
    fontSize: 12,
  },
  cancelButton: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e53935',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNote: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 40,
  },
});
