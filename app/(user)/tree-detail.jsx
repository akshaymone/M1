import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TreeDetailScreen() {
  const router = useRouter();

  const history = [
    { id: 1, type: 'Watered', person: 'Rahul Sharma', time: 'Today 8:00 AM', icon: '💧', color: '#4caf50' },
    { id: 2, type: 'Fertilized', person: 'Priya Patel', time: 'Yesterday 5:30 PM', icon: '🌿', color: '#9c27b0' },
    { id: 3, type: 'Health Check', person: 'Suresh Kumar', time: '2 days ago', icon: '🔍', color: '#2196f3' },
    { id: 4, type: 'Watered', person: 'Akshay Mone', time: '3 days ago', icon: '💧', color: '#4caf50' },
    { id: 5, type: 'Watered', person: 'Rahul Sharma', time: '4 days ago', icon: '💧', color: '#4caf50' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerIcon}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tree Details</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>🔗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.heroEmoji}>🌳</Text>
            <View style={styles.gradientOverlay} />
            <Text style={styles.heroTitle}>Neem Tree</Text>
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✅ Verified</Text>
            </View>
          </View>
        </View>

        {/* Tree Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.treeName}>Neem Tree (Azadirachta indica)</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>📍 Pune - Sector 4 Aundh</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>👤 Planted by Akshay Mone</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>🗓️ Planted on 15 March 2026</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.ageText}>🌱 Sapling - 18 days old</Text>
          </View>
          <View style={[styles.infoRow, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }]}>
            <Text style={styles.infoText}>🏛️ Protected by</Text>
            <Text style={[styles.infoValue, { color: '#1565c0', fontWeight: 'bold' }]}>Rajesh Patil • Ward 15</Text>
          </View>

          <View style={styles.protectorInfoBox}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=33' }} 
              style={styles.smallAvatar} 
            />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.protectorBio}>
                Rajesh Patil is the elected Ward 15 representative responsible for protecting trees in this area.
              </Text>
              <Text style={styles.protectorParty}>BJP • Aundh, Pune</Text>
            </View>
          </View>
          
          <View style={styles.healthContainer}>
            <View style={styles.healthLabelRow}>
              <Text style={styles.healthLabel}>Health Score</Text>
              <Text style={styles.healthValue}>85%</Text>
            </View>
            <View style={styles.healthBarBg}>
              <View style={[styles.healthBarFill, { width: '85%' }]} />
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#4caf50' }]}>18</Text>
            <Text style={styles.statLabel}>Days Alive</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#2196f3' }]}>12</Text>
            <Text style={styles.statLabel}>Care Tasks Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>4</Text>
            <Text style={styles.statLabel}>Reviewers</Text>
          </View>
        </View>

        {/* Completed Tasks History */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Completed Tasks History</Text>
          <Text style={styles.sectionSubtitle}>All tasks were system generated and verified</Text>
          {history.map((item) => (
            <View key={item.id} style={[styles.historyItem, { borderLeftColor: item.color }]}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyIcon}>{item.icon}</Text>
                <View>
                  <Text style={styles.historyType}>{item.type}</Text>
                  <Text style={styles.historyPerson}>by {item.person}</Text>
                  <Text style={styles.historyCommission}>Commission: ₹0.13 → Rajesh Patil</Text>
                </View>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyTime}>{item.time}</Text>
                <Text style={styles.verifiedSmallBadge}>✅ Verified</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Location Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.mapPlaceholder}>
            <Text style={{ fontSize: 40 }}>📍</Text>
            <Text style={styles.mapLocationText}>Pune - Sector 4 Aundh</Text>
            <TouchableOpacity style={styles.openMapsBtn}>
              <Text style={styles.openMapsText}>Open in Maps</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Assignment Info Box / Pending Task Card */}
        {/* Mocking a pending task state for demonstration */}
        {true ? (
          <View style={styles.pendingTaskCard}>
            <Text style={styles.pendingTaskTitle}>You have a pending task for this tree!</Text>
            <View style={styles.pendingTaskBadge}>
              <Text style={styles.pendingTaskBadgeText}>💧 Water</Text>
            </View>
            <Text style={styles.pendingTaskSubtext}>Due by 6:00 PM • ₹25 reward</Text>
            <TouchableOpacity 
              style={styles.goToTaskBtn}
              onPress={() => router.push('/(user)/home')}

            >
              <Text style={styles.goToTaskBtnText}>Go to Task</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text style={styles.infoBoxIcon}>📋</Text>
            <Text style={styles.infoBoxTitle}>Tasks for this tree are automatically assigned by the system</Text>
            <Text style={styles.infoBoxSubtext}>Check your Home screen for pending tasks</Text>
          </View>
        )}
        
        <View style={{ height: 20 }} />
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  heroContainer: {
    width: '100%',
    height: 220,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroEmoji: {
    fontSize: 80,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  heroTitle: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  treeName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoRow: {
    marginBottom: 6,
  },
  infoText: {
    color: '#888888',
    fontSize: 14,
  },
  ageText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
  },
  protectorInfoBox: {
    backgroundColor: '#1a3a5c',
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  protectorBio: {
    color: '#ffffff',
    fontSize: 10,
    lineHeight: 14,
  },
  protectorParty: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
    marginTop: 2,
  },
  healthContainer: {
    marginTop: 16,
  },
  healthLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  healthLabel: {
    color: '#888888',
    fontSize: 14,
  },
  healthValue: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  healthBarBg: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  healthBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'center',
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    fontSize: 20,
  },
  historyType: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  historyPerson: {
    color: '#888888',
    fontSize: 12,
  },
  historyCommission: {
    color: '#888888',
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyTime: {
    color: '#888888',
    fontSize: 11,
    marginBottom: 4,
  },
  verifiedSmallBadge: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: 'bold',
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapLocationText: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 8,
  },
  openMapsBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  openMapsText: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoBoxIcon: {
    fontSize: 24,
    color: '#888888',
    marginBottom: 8,
  },
  infoBoxTitle: {
    color: '#888888',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 4,
  },
  infoBoxSubtext: {
    color: '#666666',
    fontSize: 11,
    textAlign: 'center',
  },
  pendingTaskCard: {
    backgroundColor: '#1b5e20',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  pendingTaskTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  pendingTaskBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  pendingTaskBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pendingTaskSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  goToTaskBtn: {
    borderColor: '#ffffff',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  goToTaskBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
