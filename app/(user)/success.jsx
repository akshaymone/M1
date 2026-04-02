import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.successEmoji}>🌳</Text>
          <Text style={styles.successTitle}>Tree Planted Successfully!</Text>
          <Text style={styles.successSubtitle}>
            Your Neem tree has been planted at Pune - Sector 4 Aundh
          </Text>

          <View style={styles.rewardCard}>
            <Text style={styles.rewardTitle}>₹100 credited to your wallet 🎉</Text>
            <Text style={styles.rewardSubtitle}>Keep planting to earn more rewards!</Text>
            <Text style={styles.protectionNote}>
              🏛️ Your tree is now under protection of Rajesh Patil, Ward 15 Representative
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>13</Text>
              <Text style={styles.statLabel}>Trees Planted</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: '#ffc107' }]}>₹550</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.outlineButton}
              onPress={() => router.replace('/(user)/home')}

            >
              <Text style={styles.outlineButtonText}>View on Map</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.filledButton}
              onPress={() => router.replace('/(user)/home')}

            >
              <Text style={styles.filledButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
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
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
  },
  successEmoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  successTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  successSubtitle: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 16,
    marginBottom: 40,
  },
  rewardCard: {
    backgroundColor: '#1b5e20',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  rewardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  rewardSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
  protectionNote: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 40,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#4caf50',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#333',
  },
  footer: {
    width: '100%',
    gap: 12,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#2e7d32',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filledButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
  },
  filledButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
