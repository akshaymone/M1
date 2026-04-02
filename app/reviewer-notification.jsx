import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function ReviewerNotificationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>M1</Text>
        <View style={styles.bellContainer}>
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.redDot} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Notification Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.pulsingDot} />
            <Text style={styles.cardHeaderText}>Review Request</Text>
          </View>
          
          <View style={styles.divider} />

          {/* Profile Row */}
          <View style={styles.profileRow}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
              style={styles.avatar} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Rahul Sharma</Text>
              <Text style={styles.actionText}>wants to verify tree planting</Text>
              <Text style={styles.timeAgo}>2 min ago</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Location Row */}
          <View style={styles.infoRow}>
            <Text style={styles.icon}>📍</Text>
            <View>
              <Text style={styles.infoText}>Pune - Sector 4 Aundh</Text>
              <Text style={styles.distanceText}>1.2 km from you</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* GPS Status Row */}
          <View style={styles.gpsStatusRow}>
            <Text style={styles.gpsLabel}>GPS Status</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedBadgeText}>✅ Verified at location</Text>
            </View>
          </View>

          {/* Map Preview Placeholder */}
          <View style={styles.mapPreview}>
            <View style={styles.mapPreviewGridV} />
            <View style={styles.mapPreviewGridH} />
            <Text style={styles.mapPreviewText}>📍 Doer is 12m from tree</Text>
          </View>

          <View style={styles.divider} />

          {/* Task Row */}
          <View style={styles.infoRow}>
            <Text style={styles.icon}>🌱</Text>
            <Text style={styles.infoText}>New Tree Planting - Neem Tree</Text>
          </View>

          <View style={styles.divider} />

          {/* Reward Row */}
          <View style={styles.rewardSection}>
            <Text style={styles.rewardLabel}>Your reward for reviewing:</Text>
            <Text style={styles.rewardAmount}>₹25</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={() => router.push('/video-call')}
          >
            <Text style={styles.acceptButtonText}>Accept Review</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.declineButton}
            onPress={() => router.back()}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  logo: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  bellContainer: {
    position: 'relative',
    padding: 4,
  },
  bellIcon: {
    fontSize: 22,
  },
  redDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e53935',
    borderWidth: 1,
    borderColor: '#0a0a0a',
  },
  scrollContent: {
    paddingBottom: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    marginRight: 8,
  },
  cardHeaderText: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#222222',
    marginVertical: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionText: {
    color: '#888888',
    fontSize: 14,
    marginTop: 2,
  },
  timeAgo: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    color: '#ffffff',
    fontSize: 15,
  },
  distanceText: {
    color: '#4caf50',
    fontSize: 12,
    marginTop: 2,
  },
  gpsStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gpsLabel: {
    color: '#888888',
    fontSize: 14,
  },
  verifiedBadge: {
    backgroundColor: '#2e7d3222',
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  verifiedBadgeText: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mapPreview: {
    height: 60,
    backgroundColor: '#333333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  mapPreviewGridV: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#444',
  },
  mapPreviewGridH: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#444',
  },
  mapPreviewText: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
  },
  rewardSection: {
    alignItems: 'center',
  },
  rewardLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  rewardAmount: {
    color: '#4caf50',
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  acceptButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  declineButton: {
    borderWidth: 1,
    borderColor: '#444444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  declineButtonText: {
    color: '#888888',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
