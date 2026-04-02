import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReviewRequestScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState(1); // 1: GPS Verification, 2: GPS Verified & Waiting

  useEffect(() => {
    if (phase === 1) {
      const timer = setTimeout(() => {
        setPhase(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

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

        {/* GPS Verification Section */}
        {phase === 1 ? (
          <View style={styles.gpsSection}>
            <Text style={styles.sectionTitle}>📍 Step 1: Confirming Your Location</Text>
            
            <View style={styles.gpsAnimationContainer}>
              <View style={styles.gpsPulseRing} />
              <View style={[styles.gpsPulseRing, { width: 100, height: 100, opacity: 0.2 }]} />
              <View style={styles.gpsIconCircle}>
                <Text style={{ fontSize: 40 }}>📍</Text>
              </View>
            </View>

            <Text style={styles.gpsStatusText}>Checking your location...</Text>
            
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '60%' }]} />
            </View>

            <View style={styles.locationDetailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Required Location</Text>
                <Text style={styles.detailValue}>Pune - Sector 4 Aundh</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Your Current Location</Text>
                <Text style={[styles.detailValue, { color: '#ffc107' }]}>Checking...</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Distance from tree</Text>
                <Text style={[styles.detailValue, { color: '#ffc107' }]}>Calculating...</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Required radius</Text>
                <Text style={[styles.detailValue, { color: '#888888' }]}>Within 50 meters</Text>
              </View>
            </View>

            <Text style={styles.gpsNoteText}>
              Please make sure GPS is enabled and you are at the tree location
            </Text>
          </View>
        ) : (
          <View style={styles.gpsSection}>
            <Text style={styles.bigCheck}>✅</Text>
            <Text style={styles.verifiedTitle}>📍 Location Verified!</Text>
            <Text style={styles.verifiedSubtitle}>You are at the correct location</Text>

            <View style={[styles.locationDetailsCard, { backgroundColor: '#1b5e20' }]}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabelWhite}>Your Location</Text>
                <Text style={styles.detailValue}>Pune - Sector 4 Aundh</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabelWhite}>Distance from tree</Text>
                <Text style={[styles.detailValue, { color: '#4caf50', fontWeight: 'bold', backgroundColor: 'white', paddingHorizontal: 6, borderRadius: 4, overflow: 'hidden' }]}>12 meters away ✅</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabelWhite}>Accuracy</Text>
                <Text style={[styles.detailValue, { color: '#4caf50', fontWeight: 'bold', backgroundColor: 'white', paddingHorizontal: 6, borderRadius: 4, overflow: 'hidden' }]}>High (±5m)</Text>
              </View>
            </View>

            {/* Waiting Section */}
            <View style={styles.waitingSection}>
              <Text style={[styles.waitingText, { color: '#4caf50', fontWeight: 'bold' }]}>
                ✅ Location confirmed! Notifying reviewers...
              </Text>
              <View style={styles.spinnerContainer}>
                 <ActivityIndicator color="#2e7d32" size="large" />
              </View>
              <Text style={styles.notifiedText}>3 users notified</Text>
            </View>
          </View>
        )}

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
    marginBottom: 24,
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
  gpsSection: {
    marginHorizontal: 16,
    marginBottom: 32,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gpsAnimationContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#1a1a1a',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  gpsPulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#2e7d32',
    opacity: 0.4,
  },
  gpsIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpsStatusText: {
    color: '#888888',
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2e7d32',
    borderRadius: 3,
  },
  locationDetailsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#888888',
    fontSize: 13,
  },
  detailLabelWhite: {
    color: '#ffffff',
    fontSize: 13,
    opacity: 0.8,
  },
  detailValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  gpsNoteText: {
    color: '#f57c00',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  bigCheck: {
    fontSize: 64,
    marginBottom: 8,
  },
  verifiedTitle: {
    color: '#4caf50',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  verifiedSubtitle: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 20,
  },
  waitingSection: {
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },
  waitingText: {
    fontSize: 14,
    textAlign: 'center',
  },
  spinnerContainer: {
    marginVertical: 16,
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
