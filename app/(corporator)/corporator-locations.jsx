import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function CorporatorLocations() {
  const router = useRouter();

  const locations = [
    {
      id: 1,
      name: 'Pune - Sector 4 Aundh',
      status: 'Active ✅',
      ward: 'Ward 15 • Approved by PMC',
      stats: '47 trees • 5 spots left • 23 tasks this week',
      commission: '₹142',
      health: 82,
    },
    {
      id: 2,
      name: 'Kothrud Hills',
      status: 'Active ✅',
      ward: 'Ward 15 • Approved by PMC',
      stats: '38 trees • 3 spots left • 18 tasks this week',
      commission: '₹98',
      health: 76,
    },
    {
      id: 3,
      name: 'Baner Forest Edge',
      status: 'Active ✅',
      ward: 'Ward 15 • Approved by PMC',
      stats: '42 trees • 8 spots left • 22 tasks this week',
      commission: '₹112',
      health: 79,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 60 }} />
        <Text style={styles.headerTitle}>My Governing Areas</Text>
        <TouchableOpacity style={styles.proposeSmallBtn}>
          <Text style={styles.proposeSmallBtnText}>+ Propose</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            🏛️ You work with municipal corporation to approve plantation locations in your ward. All locations need admin final approval.
          </Text>
        </View>

        {/* Active Location Cards */}
        {locations.map((loc) => (
          <View key={loc.id} style={styles.locationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.locationName}>{loc.name}</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>{loc.status}</Text>
              </View>
            </View>
            
            <Text style={styles.locationWard}>{loc.ward}</Text>
            <Text style={styles.locationProtector}>Protected by Rajesh Patil</Text>
            <Text style={styles.locationStats}>{loc.stats}</Text>
            
            <View style={styles.commissionRow}>
              <Text style={styles.commissionLabel}>Your commission this week:</Text>
              <Text style={styles.commissionValue}>{loc.commission}</Text>
            </View>

            <View style={styles.healthContainer}>
              <View style={styles.healthHeader}>
                <Text style={styles.healthLabel}>Health</Text>
                <Text style={styles.healthValue}>{loc.health}%</Text>
              </View>
              <View style={styles.healthBarBg}>
                <View style={[styles.healthBarFill, { width: `${loc.health}%` }]} />
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.viewTreesBtn}>
                <Text style={styles.viewTreesBtnText}>View Trees</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.activityLogBtn}>
                <Text style={styles.activityLogBtnText}>Activity Log</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Pending Proposal Card */}
        <View style={styles.pendingCard}>
          <Text style={styles.pendingTitle}>⏳ Pending Proposals</Text>
          <View style={styles.pendingContent}>
            <View style={styles.pendingTextContainer}>
              <Text style={styles.pendingLocationName}>Pune - Wakad Greenway</Text>
              <Text style={styles.pendingStatusText}>Submitted to PMC • Awaiting approval</Text>
              <Text style={styles.pendingDetails}>Proposed capacity: 50 trees • Submitted: 15 Mar 2026</Text>
            </View>
            <TouchableOpacity style={styles.withdrawBtn}>
              <Text style={styles.withdrawBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Propose Button Bottom */}
        <TouchableOpacity style={styles.proposeBtn}>
          <Text style={styles.proposeBtnText}>🏛️ Propose New Location to PMC</Text>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  proposeSmallBtn: {
    borderWidth: 1,
    borderColor: '#1565c0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  proposeSmallBtnText: {
    color: '#1565c0',
    fontSize: 12,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#1a3a5c',
    margin: 16,
    padding: 14,
    borderRadius: 12,
  },
  infoBoxText: {
    color: '#ffffff',
    fontSize: 13,
    lineHeight: 18,
  },
  locationCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadgeText: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: 'bold',
  },
  locationWard: {
    color: '#1565c0',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  locationProtector: {
    color: '#1565c0',
    fontSize: 12,
    marginTop: 2,
  },
  locationStats: {
    color: '#888888',
    fontSize: 12,
    marginTop: 8,
  },
  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  commissionLabel: {
    color: '#888888',
    fontSize: 12,
  },
  commissionValue: {
    color: '#1565c0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthContainer: {
    marginTop: 12,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  healthLabel: {
    color: '#888888',
    fontSize: 11,
  },
  healthValue: {
    color: '#1565c0',
    fontSize: 11,
    fontWeight: 'bold',
  },
  healthBarBg: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
  },
  healthBarFill: {
    height: '100%',
    backgroundColor: '#1565c0',
    borderRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 12,
  },
  viewTreesBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1565c0',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewTreesBtnText: {
    color: '#1565c0',
    fontSize: 12,
    fontWeight: '600',
  },
  activityLogBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#444444',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  activityLogBtnText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '600',
  },
  pendingCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  pendingTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pendingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pendingTextContainer: {
    flex: 1,
  },
  pendingLocationName: {
    color: '#ffffff',
    fontSize: 14,
  },
  pendingStatusText: {
    color: '#ff9800',
    fontSize: 12,
    marginTop: 2,
  },
  pendingDetails: {
    color: '#888888',
    fontSize: 11,
    marginTop: 4,
  },
  withdrawBtn: {
    borderWidth: 1,
    borderColor: '#f44336',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  withdrawBtnText: {
    color: '#f44336',
    fontSize: 11,
    fontWeight: '500',
  },
  proposeBtn: {
    backgroundColor: '#1565c0',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  proposeBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
