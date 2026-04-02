import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function GPSCheckScreen() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Simulate GPS check delay
    const timer = setTimeout(() => {
      setIsVerified(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Verification</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>We need to confirm you are at the tree location</Text>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
             {/* Grid lines simulated */}
             <View style={styles.gridLineV} />
             <View style={[styles.gridLineV, { left: '40%' }]} />
             <View style={[styles.gridLineV, { left: '70%' }]} />
             <View style={styles.gridLineH} />
             <View style={[styles.gridLineH, { top: '40%' }]} />
             <View style={[styles.gridLineH, { top: '70%' }]} />
             
             {/* Tree Location */}
             <View style={styles.treeMarker}>
                <Text style={styles.markerIcon}>📍</Text>
                <Text style={styles.markerLabel}>Tree Location</Text>
             </View>

             {/* User Location */}
             <View style={styles.userMarker}>
                <View style={styles.pulseRing} />
                <View style={styles.userDot} />
                <Text style={styles.userLabel}>You</Text>
             </View>

             {/* Distance Line */}
             <View style={styles.distanceLine} />
             <View style={styles.distanceBadge}>
                <Text style={styles.distanceBadgeText}>12m</Text>
             </View>

             <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE</Text>
             </View>
          </View>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
             <Text style={styles.statusIcon}>🌳</Text>
             <Text style={styles.statusLabel}>Tree Location</Text>
             <Text style={styles.statusValue}>Pune - Sector 4 Aundh</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.statusRow}>
             <Text style={styles.statusIcon}>📍</Text>
             <Text style={styles.statusLabel}>Your Location</Text>
             <Text style={[styles.statusValue, { color: '#4caf50', fontWeight: 'bold' }]}>
               {isVerified ? '12 meters away' : 'Checking...'}
             </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.statusRow}>
             <Text style={styles.statusIcon}>🎯</Text>
             <Text style={styles.statusLabel}>Required</Text>
             <Text style={styles.statusValue}>Within 50 meters</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.statusRow}>
             <Text style={styles.statusIcon}>✅</Text>
             <Text style={styles.statusLabel}>Status</Text>
             <Text style={[styles.statusValue, { color: '#4caf50', fontWeight: 'bold' }]}>
               {isVerified ? 'You are in range!' : 'Verifying...'}
             </Text>
          </View>
        </View>

        {/* Success State */}
        {isVerified && (
          <View style={styles.successContainer}>
            <Text style={styles.checkmark}>✅</Text>
            <Text style={styles.successTitle}>Perfect! You are at the correct location</Text>
            <Text style={styles.successSubtitle}>Proceed to submit your care task for review</Text>
          </View>
        )}

        {/* Failed State Comment: 
            If user is too far: red ❌ icon, "You are 500m away" red,
            "Please go to the tree location first" gray,
            "Retry" button outlined green
        */}
      </ScrollView>

      {/* Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.proceedButton, !isVerified && { opacity: 0.5 }]}
          disabled={!isVerified}
          onPress={() => router.push('/review-request')}
        >
          <Text style={styles.proceedButtonText}>Proceed to Review</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  subtitle: {
    color: '#888888',
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 24,
  },
  mapContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  mapPlaceholder: {
    height: 280,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#333',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '20%',
    width: 1,
    backgroundColor: '#222222',
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '20%',
    height: 1,
    backgroundColor: '#222222',
  },
  treeMarker: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    alignItems: 'center',
    transform: [{ translateX: -40 }, { translateY: -20 }],
  },
  markerIcon: {
    fontSize: 32,
  },
  markerLabel: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  userMarker: {
    position: 'absolute',
    top: '55%',
    left: '42%',
    alignItems: 'center',
  },
  userDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196f3',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  pulseRing: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    top: -9,
  },
  userLabel: {
    color: '#2196f3',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  distanceLine: {
    position: 'absolute',
    top: '45%',
    left: '46%',
    width: 40,
    height: 2,
    backgroundColor: '#4caf50',
    transform: [{ rotate: '45deg' }],
    opacity: 0.6,
  },
  distanceBadge: {
    position: 'absolute',
    top: '50%',
    left: '48%',
    backgroundColor: '#000',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  distanceBadgeText: {
    color: '#4caf50',
    fontSize: 8,
    fontWeight: 'bold',
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e53935',
    marginRight: 6,
  },
  liveText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 24,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
  },
  statusLabel: {
    color: '#888888',
    fontSize: 14,
    flex: 1,
  },
  statusValue: {
    color: '#ffffff',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#222222',
    marginVertical: 12,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 48,
    marginBottom: 8,
  },
  successTitle: {
    color: '#4caf50',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successSubtitle: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: '#0a0a0a',
  },
  proceedButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
