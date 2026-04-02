import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function AdminScreen() {
  const router = useRouter();

  const locations = [
    { id: 1, name: 'Pune - Sector 4 Aundh', spots: 5, planted: 12, status: 'Active', statusColor: '#4caf50' },
    { id: 2, name: 'Pune - Kothrud Hills', spots: 3, planted: 8, status: 'Active', statusColor: '#4caf50' },
    { id: 3, name: 'Pune - Baner Forest Edge', spots: 8, planted: 5, status: 'Active', statusColor: '#4caf50' },
    { id: 4, name: 'Pune - Wakad Greenway', spots: 0, planted: 15, status: 'Inactive', statusColor: '#c62828' },
  ];

  const pendingApprovals = [
    { id: 1, tree: 'Neem Tree', time: '2 hours ago', location: 'Sector 4 Aundh', user: 'Rahul Sharma', video: true, gps: true },
    { id: 2, tree: 'Banyan Tree', time: '5 hours ago', location: 'Kothrud Hills', user: 'Priya Patel', video: true, gps: true },
    { id: 3, tree: 'Mango Tree', time: '1 day ago', location: 'Baner Forest Edge', user: 'Suresh Kumar', video: false, gps: true },
  ];

  const rewards = [
    { label: 'Tree Planting Reward', value: '₹100' },
    { label: 'Watering Task', value: '₹25' },
    { label: 'Fertilizing Task', value: '₹40' },
    { label: 'Health Check Task', value: '₹20' },
    { label: 'Reviewer Reward', value: '₹25' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>⚙️ Admin Panel</Text>
        <View style={styles.adminBadge}>
          <Text style={styles.adminBadgeText}>Admin</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#4caf50' }]}>47</Text>
            <Text style={styles.statLabel}>Total Trees</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#2196f3' }]}>8</Text>
            <Text style={styles.statLabel}>Locations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#f57c00' }]}>23</Text>
            <Text style={styles.statLabel}>Pending Reviews</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#fbc02d' }]}>₹12,500</Text>
            <Text style={styles.statLabel}>Rewards Paid</Text>
          </View>
        </View>

        {/* Manage Locations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📍 Planting Locations</Text>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {locations.map((loc) => (
            <View key={loc.id} style={styles.locationCard}>
              <View style={styles.locationTop}>
                <View style={styles.locationInfo}>
                  <View style={styles.locIconCircle}>
                    <Text style={{ fontSize: 14 }}>📍</Text>
                  </View>
                  <View>
                    <Text style={styles.locName}>{loc.name}</Text>
                    <Text style={styles.locStats}>
                      {loc.spots} spots available • {loc.planted} trees planted
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: loc.statusColor + '22', borderColor: loc.statusColor, borderWidth: 1 }]}>
                  <Text style={[styles.statusBadgeText, { color: loc.statusColor }]}>{loc.status}</Text>
                </View>
              </View>
              <View style={styles.locationActions}>
                <TouchableOpacity style={styles.outlineBtn}>
                  <Text style={styles.outlineBtnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.outlineBtn, { borderColor: loc.status === 'Active' ? '#c62828' : '#4caf50' }]}>
                  <Text style={[styles.outlineBtnText, { color: loc.status === 'Active' ? '#c62828' : '#4caf50' }]}>
                    {loc.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Pending Approvals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏳ Pending Tree Approvals</Text>
          <Text style={styles.sectionSubtitle}>3 trees waiting for admin verification</Text>
          {pendingApprovals.map((appr) => (
            <View key={appr.id} style={styles.approvalCard}>
              <View style={styles.approvalHeader}>
                <Text style={styles.approvalTreeName}>{appr.tree}</Text>
                <Text style={styles.approvalTime}>{appr.time}</Text>
              </View>
              <Text style={styles.approvalInfo}>📍 {appr.location}</Text>
              <Text style={styles.approvalInfo}>👤 Planted by {appr.user}</Text>
              <Text style={[styles.verificationStatus, { color: appr.video ? '#4caf50' : '#f57c00' }]}>
                {appr.video ? '📹 Video review completed ✅' : '📹 Awaiting video review ⏳'}
              </Text>
              <Text style={[styles.verificationStatus, { color: appr.gps ? '#4caf50' : '#f57c00' }]}>
                {appr.gps ? '📍 GPS confirmed ✅' : '📍 GPS pending ⏳'}
              </Text>
              <View style={styles.approvalActions}>
                <TouchableOpacity 
                  style={[styles.filledBtn, { backgroundColor: '#2e7d32' }, (!appr.video || !appr.gps) && styles.disabledBtn]}
                  disabled={!appr.video || !appr.gps}
                >
                  <Text style={styles.filledBtnText}>✅ Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filledBtn, { backgroundColor: '#c62828' }]}>
                  <Text style={styles.filledBtnText}>❌ Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Reward Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Reward Settings</Text>
          <View style={styles.rewardsCard}>
            {rewards.map((reward, index) => (
              <View key={reward.label}>
                <View style={styles.rewardRow}>
                  <Text style={styles.rewardLabel}>{reward.label}</Text>
                  <Text style={styles.rewardValue}>{reward.value}</Text>
                </View>
                {index < rewards.length - 1 && <View style={styles.rewardDivider} />}
              </View>
            ))}
            <TouchableOpacity style={styles.editRewardsBtn}>
              <Text style={styles.editRewardsBtnText}>Edit Rewards</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 40 }} />
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
    marginTop: 10,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  adminBadge: {
    backgroundColor: '#c62828',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888888',
    fontSize: 12,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#f57c00',
    fontSize: 13,
    marginBottom: 12,
  },
  addBtn: {
    borderColor: '#2e7d32',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addBtnText: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  locationTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  locIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2e7d3222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  locStats: {
    color: '#888888',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  locationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  outlineBtn: {
    borderColor: '#444',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  outlineBtnText: {
    color: '#888888',
    fontSize: 12,
  },
  approvalCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  approvalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  approvalTreeName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  approvalTime: {
    color: '#888888',
    fontSize: 12,
  },
  approvalInfo: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 4,
  },
  verificationStatus: {
    fontSize: 12,
    marginTop: 4,
  },
  approvalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  filledBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  filledBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  disabledBtn: {
    backgroundColor: '#333333',
    opacity: 0.5,
  },
  rewardsCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rewardLabel: {
    color: '#888888',
    fontSize: 14,
  },
  rewardValue: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rewardDivider: {
    height: 1,
    backgroundColor: '#222222',
  },
  editRewardsBtn: {
    borderColor: '#2e7d32',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  editRewardsBtnText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
