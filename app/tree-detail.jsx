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

        {/* Care History */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Care History</Text>
          {history.map((item) => (
            <View key={item.id} style={[styles.historyItem, { borderLeftColor: item.color }]}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyIcon}>{item.icon}</Text>
                <View>
                  <Text style={styles.historyType}>{item.type}</Text>
                  <Text style={styles.historyPerson}>by {item.person}</Text>
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

        {/* Bottom Button */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/gps-check')}
        >
          <Text style={styles.actionButtonText}>💧 Take Care of This Tree</Text>
        </TouchableOpacity>
        
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
  actionButton: {
    backgroundColor: '#2e7d32',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
