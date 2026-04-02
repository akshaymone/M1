import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function CorporatorDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ward Representative Portal</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🏛️ Elected Rep</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Banner Card */}
        <LinearGradient
          colors={['#0d47a1', '#1565c0']}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=33' }} 
              style={styles.avatar} 
            />
            <Text style={styles.profileName}>Rajesh Patil</Text>
            <Text style={styles.profileWard}>Ward 15 - Aundh, Pune</Text>
            <Text style={styles.profileAffiliation}>BJP • Elected 2022</Text>
            
            <View style={styles.bannerDivider} />
            
            <View style={styles.bannerStatsRow}>
              <View style={styles.bannerStat}>
                <Text style={styles.bannerStatValue}>3</Text>
                <Text style={styles.bannerStatLabel}>Areas</Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.bannerStat}>
                <Text style={styles.bannerStatValue}>127</Text>
                <Text style={styles.bannerStatLabel}>Trees</Text>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.bannerStat}>
                <Text style={styles.bannerStatValue}>₹2,840</Text>
                <Text style={styles.bannerStatLabel}>Earned</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Overview Stats 2x2 Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <Text style={[styles.statsValue, { color: '#2196f3' }]}>127</Text>
            <Text style={styles.statsLabel}>Trees Protected</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={[styles.statsValue, { color: '#4caf50' }]}>1,240</Text>
            <Text style={styles.statsLabel}>Tasks Done</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={[styles.statsValue, { color: '#ff9800' }]}>23</Text>
            <Text style={styles.statsLabel}>Active Users</Text>
          </View>
          <View style={styles.statsCard}>
            <Text style={[styles.statsValue, { color: '#ffeb3b' }]}>₹2,840</Text>
            <Text style={styles.statsLabel}>Commission Earned</Text>
          </View>
        </View>

        {/* Commission Highlight Card */}
        <View style={styles.commissionCard}>
          <Text style={styles.sectionTitle}>💰 This Week's Commission</Text>
          
          <View style={styles.commissionRow}>
            <Text style={styles.commissionLabel}>Total task rewards in your area</Text>
            <Text style={styles.commissionValue}>₹56,800</Text>
          </View>
          <View style={styles.cardDivider} />
          
          <View style={styles.commissionRow}>
            <Text style={styles.commissionLabel}>Your 0.5% commission</Text>
            <Text style={[styles.commissionValue, { color: '#4caf50', fontWeight: 'bold' }]}>₹284</Text>
          </View>
          <View style={styles.cardDivider} />
          
          <View style={styles.commissionRow}>
            <Text style={styles.commissionLabel}>Next payout</Text>
            <Text style={[styles.commissionValue, { color: '#ffeb3b' }]}>Monday 24 Mar</Text>
          </View>
          
          <Text style={styles.infoText}>
            You earn 0.5% from every task completed by users in your governing area. More trees = more tasks = more earnings.
          </Text>
        </View>

        {/* Protected Trees Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🌳 Trees Under Your Protection</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.treeScroll}>
            {[
              { id: 1, name: 'Neem-Sector4', location: 'Sector 4 Aundh' },
              { id: 2, name: 'Banyan-Kothrud', location: 'Kothrud Hills' },
              { id: 3, name: 'Peepal-Baner', location: 'Baner Forest Edge' },
              { id: 4, name: 'Mango-Wakad', location: 'Wakad Greenway' }
            ].map(tree => (
              <View key={tree.id} style={styles.treeCard}>
                <Text style={styles.treeEmoji}>🌳</Text>
                <Text style={styles.treeName}>{tree.name}</Text>
                <Text style={styles.treeLocation}>{tree.location}</Text>
                <Text style={styles.treeProtector}>Protected by Rajesh Patil</Text>
                <View style={styles.healthBarContainer}>
                  <View style={[styles.healthBar, { width: '85%' }]} />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity Section */}
        <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
          <Text style={styles.sectionTitle}>📡 Recent Activity in Your Area</Text>
          {[
            { 
              id: 1, 
              icon: '💧', 
              title: 'Rahul Sharma watered Neem Tree', 
              sub: 'Sector 4 Aundh • 10 min ago', 
              reward: 'Task reward: ₹25 • Your cut: ₹0.13',
              color: '#4caf50'
            },
            { 
              id: 2, 
              icon: '🌱', 
              title: 'New tree planted by Priya Patel', 
              sub: 'Kothrud Hills • 1 hour ago', 
              reward: 'Planting reward: ₹100 • Your cut: ₹0.50',
              color: '#4caf50'
            },
            { 
              id: 3, 
              icon: '📹', 
              title: 'Video review completed by Suresh', 
              sub: 'Baner Forest Edge • 2 hours ago', 
              reward: 'Review reward: ₹25 • Your cut: ₹0.13',
              color: '#2196f3'
            },
            { 
              id: 4, 
              icon: '🌿', 
              title: 'Fertilizing task done by Anita Singh', 
              sub: 'Sector 4 Aundh • 3 hours ago', 
              reward: 'Task reward: ₹40 • Your cut: ₹0.20',
              color: '#4caf50'
            }
          ].map(item => (
            <View key={item.id} style={[styles.activityItem, { borderLeftColor: item.color }]}>
              <View style={styles.activityContent}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
                <View style={styles.activityTextContainer}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activitySub}>{item.sub}</Text>
                  <Text style={styles.activityReward}>{item.reward}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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
  badge: {
    backgroundColor: '#1565c0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    padding: 20,
    borderRadius: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileWard: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  profileAffiliation: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  bannerDivider: {
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.3,
    width: '100%',
    marginVertical: 12,
  },
  bannerStatsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerStat: {
    flex: 1,
    alignItems: 'center',
  },
  bannerStatValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerStatLabel: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.7,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#ffffff',
    opacity: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    marginHorizontal: 8,
  },
  statsCard: {
    width: '46%',
    backgroundColor: '#1a1a1a',
    margin: '2%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },
  commissionCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  commissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  commissionLabel: {
    color: '#888888',
    fontSize: 14,
    flex: 1,
  },
  commissionValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 4,
  },
  infoText: {
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 12,
  },
  sectionContainer: {
    margin: 16,
  },
  treeScroll: {
    marginTop: 8,
  },
  treeCard: {
    backgroundColor: '#1a1a1a',
    width: 140,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  treeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  treeName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  treeLocation: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'center',
  },
  treeProtector: {
    color: '#1565c0',
    fontSize: 9,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
  healthBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#333333',
    borderRadius: 2,
    marginTop: 8,
  },
  healthBar: {
    height: '100%',
    backgroundColor: '#1565c0',
    borderRadius: 2,
  },
  activityItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  activityContent: {
    flexDirection: 'row',
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
  },
  activitySub: {
    color: '#888888',
    fontSize: 11,
    marginTop: 2,
  },
  activityReward: {
    color: '#1565c0',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
});
