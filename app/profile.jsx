import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [isReviewer, setIsReviewer] = useState(true);

  const leaderboard = [
    { rank: 1, name: 'Priya Patel', tasks: 32, earnings: '₹3,200', avatar: 'https://i.pravatar.cc/150?img=15', color: '#f57f17' },
    { rank: 2, name: 'Rahul Sharma', tasks: 28, earnings: '₹2,800', avatar: 'https://i.pravatar.cc/150?img=12', color: '#9e9e9e' },
    { rank: 3, name: 'Akshay Mone (You)', tasks: 19, earnings: '₹1,250', avatar: 'https://i.pravatar.cc/150?img=8', color: '#bf8650', isMe: true },
    { rank: 4, name: 'Suresh Kumar', tasks: 15, earnings: '₹890', avatar: 'https://i.pravatar.cc/150?img=20', color: '#444' },
    { rank: 5, name: 'Anita Singh', tasks: 12, earnings: '₹750', avatar: 'https://i.pravatar.cc/150?img=25', color: '#444' },
  ];

  const myTrees = [
    { id: 1, name: 'Neem Tree', location: 'Sector 4', health: '85%' },
    { id: 2, name: 'Banyan Tree', location: 'Kothrud', health: '90%' },
    { id: 3, name: 'Mango Tree', location: 'Baner', health: '75%' },
    { id: 4, name: 'Peepal Tree', location: 'Aundh', health: '95%' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=8' }} style={styles.avatar} />
          <Text style={styles.userName}>Akshay Mone</Text>
          <Text style={styles.userEmail}>mone.akshay@gmail.com</Text>
          <View style={styles.guardianBadge}>
            <Text style={styles.guardianBadgeText}>🌱 Tree Guardian</Text>
          </View>
        </View>

        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsTitle}>💰 Total Earnings</Text>
          <Text style={styles.earningsAmount}>₹1,250</Text>
          <View style={styles.divider} />
          <View style={styles.earningsStatsRow}>
            <View style={styles.earningsStatItem}>
              <Text style={[styles.earningsStatValue, { color: '#4caf50' }]}>₹900</Text>
              <Text style={styles.earningsStatLabel}>Task Rewards</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.earningsStatItem}>
              <Text style={[styles.earningsStatValue, { color: '#2196f3' }]}>₹350</Text>
              <Text style={styles.earningsStatLabel}>Review Rewards</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.earningsStatItem}>
              <Text style={[styles.earningsStatValue, { color: '#f57c00' }]}>₹0</Text>
              <Text style={styles.earningsStatLabel}>Pending</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.withdrawBtn}
            onPress={() => router.push('/wallet')}
          >
            <Text style={styles.withdrawBtnText}>Withdraw Earnings</Text>
          </TouchableOpacity>
        </View>

        {/* My Contribution Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#4caf50' }]}>8</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#2196f3' }]}>47</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>12</Text>
            <Text style={styles.statLabel}>Reviews Done</Text>
          </View>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🏆 Leaderboard</Text>
            <Text style={styles.sectionSubtitle}>This Month</Text>
          </View>
          {leaderboard.map((user) => (
            <View key={user.rank} style={[styles.leaderboardRow, { borderLeftColor: user.color }, user.isMe && styles.meRow]}>
              <View style={styles.leaderboardLeft}>
                <Image source={{ uri: user.avatar }} style={styles.smallAvatar} />
                <View>
                  <Text style={styles.leaderboardName}>{user.name}</Text>
                  <Text style={styles.leaderboardTasks}>{user.tasks} tasks</Text>
                </View>
              </View>
              <Text style={styles.leaderboardEarnings}>{user.earnings}</Text>
            </View>
          ))}
        </View>

        {/* My Trees Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🌳 My Trees</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {myTrees.map((tree) => (
              <View key={tree.id} style={styles.treeCard}>
                <Text style={styles.treeEmoji}>🌳</Text>
                <Text style={styles.treeCardName}>{tree.name}</Text>
                <Text style={styles.treeCardLoc}>{tree.location}</Text>
                <View style={styles.treeHealthBarBg}>
                  <View style={[styles.treeHealthBarFill, { width: tree.health }]} />
                </View>
                <Text style={styles.treeHealthText}>{tree.health} healthy</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Reviewer Toggle */}
        <View style={styles.reviewerToggleCard}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLeft}>
              <Text style={{ fontSize: 20 }}>📹</Text>
              <Text style={styles.toggleLabel}>Available as Reviewer</Text>
            </View>
            <Switch 
              value={isReviewer} 
              onValueChange={setIsReviewer}
              trackColor={{ false: '#444', true: '#2e7d32' }}
              thumbColor={isReviewer ? '#ffffff' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.toggleSubtext}>Earn ₹25 per review you complete</Text>
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
  headerIcon: {
    fontSize: 22,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#2e7d32',
    marginBottom: 12,
  },
  userName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },
  guardianBadge: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  guardianBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  earningsCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  earningsTitle: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 8,
  },
  earningsAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#333333',
    marginBottom: 16,
  },
  earningsStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  earningsStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  earningsStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  earningsStatLabel: {
    color: '#888888',
    fontSize: 10,
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#333333',
    alignSelf: 'center',
  },
  withdrawBtn: {
    backgroundColor: '#2e7d32',
    width: '100%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  withdrawBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#888888',
    fontSize: 12,
  },
  leaderboardRow: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  meRow: {
    backgroundColor: '#1565c022',
    borderColor: '#1565c0',
    borderWidth: 1,
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  leaderboardName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  leaderboardTasks: {
    color: '#888888',
    fontSize: 11,
  },
  leaderboardEarnings: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    marginTop: 12,
  },
  treeCard: {
    width: 140,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  treeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  treeCardName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  treeCardLoc: {
    color: '#888888',
    fontSize: 11,
    marginBottom: 8,
  },
  treeHealthBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginBottom: 4,
  },
  treeHealthBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 2,
  },
  treeHealthText: {
    color: '#4caf50',
    fontSize: 10,
  },
  reviewerToggleCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleSubtext: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 32,
  },
});
