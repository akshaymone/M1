import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function DonorDashboardScreen() {
  const router = useRouter();

  const impactStats = [
    { label: 'Trees Planted', value: '127', color: '#4caf50' },
    { label: 'Active Users', value: '89', color: '#2196f3' },
    { label: 'Tasks Completed', value: '1,240', color: '#ff9800' },
    { label: 'Locations Funded', value: '3', color: '#fbc02d' },
  ];

  const activities = [
    { 
      id: 1, 
      icon: '🌱', 
      iconBg: '#2e7d32', 
      borderColor: '#2e7d32',
      text: 'Rahul Sharma watered a Neem tree', 
      subtext: 'Pune Sector 4 • 5 min ago', 
      reward: '₹25 paid from your fund' 
    },
    { 
      id: 2, 
      icon: '🌳', 
      iconBg: '#2e7d32', 
      borderColor: '#2e7d32',
      text: 'New tree planted by Priya Patel', 
      subtext: 'Kothrud Hills • 23 min ago', 
      reward: '₹100 paid from your fund' 
    },
    { 
      id: 3, 
      icon: '📹', 
      iconBg: '#1565c0', 
      borderColor: '#1565c0',
      text: 'Video review completed', 
      subtext: 'Banyan tree verified • 1 hour ago', 
      reward: '₹25 reviewer reward paid' 
    },
    { 
      id: 4, 
      icon: '🔍', 
      iconBg: '#2e7d32', 
      borderColor: '#2e7d32',
      text: 'Health check completed', 
      subtext: 'Mango tree - Baner • 2 hours ago', 
      reward: '₹20 paid from your fund' 
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>M1Corp Donor Portal</Text>
          <Text style={styles.headerSubtitle}>Welcome, Tata Foundation 🌱</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified Donor ✅</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.replace('/login')} style={styles.logoutButton}>
          <Text style={styles.logoutIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Utilization Card */}
        <LinearGradient
          colors={['#1a237e', '#283593']}
          style={styles.overviewCard}
        >
          <Text style={styles.overviewLabel}>Total Donated</Text>
          <Text style={styles.overviewAmount}>₹5,00,000</Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹3,20,000</Text>
              <Text style={styles.statLabel}>Utilized</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹1,80,000</Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>64%</Text>
              <Text style={styles.statLabel}>Efficiency</Text>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: '64%' }]} />
          </View>
        </LinearGradient>

        {/* Impact Stats Grid */}
        <View style={styles.gridContainer}>
          {impactStats.map((stat, index) => (
            <View key={index} style={styles.gridCard}>
              <Text style={[styles.gridValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.gridLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Funded Missions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Your Funded Missions</Text>
          
          {/* Mission Card 1 */}
          <View style={styles.missionCard}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>Mission: Pune Drought Relief</Text>
              <Text style={styles.activeStatus}>Active 🟢</Text>
            </View>
            <Text style={styles.missionLocation}>📍 Pune - Sector 4 Aundh, Kothrud Hills</Text>
            <Text style={styles.sponsorBadge}>Funded by Tata Foundation</Text>
            
            <View style={styles.missionProgress}>
              <Text style={styles.progressText}>Trees planted: 47/100</Text>
              <View style={styles.missionProgressBarContainer}>
                <View style={[styles.missionProgressBar, { width: '47%' }]} />
              </View>
              <Text style={styles.utilizationText}>Fund utilized: ₹1,50,000 of ₹3,00,000</Text>
            </View>
            
            <View style={styles.missionFooter}>
              <Text style={styles.missionFooterStats}>23 active users • 456 tasks done</Text>
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => router.push('/impact-report')}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mission Card 2 */}
          <View style={styles.missionCard}>
            <View style={styles.missionHeader}>
              <Text style={styles.missionTitle}>Mission: Nagpur Reforestation</Text>
              <Text style={styles.activeStatus}>Active 🟢</Text>
            </View>
            <Text style={styles.missionLocation}>📍 Nagpur - Central Zone</Text>
            <Text style={styles.sponsorBadge}>Funded by Reliance Foundation</Text>
            
            <View style={styles.missionProgress}>
              <Text style={styles.progressText}>Trees planted: 80/80</Text>
              <View style={styles.missionProgressBarContainer}>
                <View style={[styles.missionProgressBar, { width: '100%' }]} />
              </View>
              <Text style={styles.utilizationText}>Fund utilized: ₹1,70,000 of ₹1,70,000</Text>
            </View>
            
            <View style={styles.missionFooter}>
              <Text style={styles.missionFooterStats}>18 active users • 784 tasks done</Text>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Live Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📡 Live Activity</Text>
          <Text style={styles.sectionSubtitle}>Real time updates from the ground</Text>

          {activities.map((activity) => (
            <View key={activity.id} style={[styles.activityCard, { borderLeftColor: activity.borderColor }]}>
              <View style={styles.activityContent}>
                <View style={[styles.iconCircle, { backgroundColor: activity.iconBg }]}>
                  <Text style={styles.activityIconText}>{activity.icon}</Text>
                </View>
                <View style={styles.activityTextContainer}>
                  <View style={styles.activityRow}>
                    <Text style={styles.activityText}>{activity.text}</Text>
                    <Text style={styles.activityReward}>{activity.reward}</Text>
                  </View>
                  <Text style={styles.activitySubtext}>{activity.subtext}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Fund More Button */}
        <TouchableOpacity 
          style={styles.fundButton}
          onPress={() => router.push('/fund-mission')}
        >
          <Text style={styles.fundButtonText}>💰 Add More Funds</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    marginTop: 4,
    borderRadius: 4,
  },
  verifiedText: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
  },
  logoutIcon: {
    fontSize: 20,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  overviewCard: {
    margin: 16,
    padding: 24,
    borderRadius: 20,
  },
  overviewLabel: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  overviewAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.3,
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#ffffff',
    opacity: 0.3,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  gridCard: {
    width: '46%',
    backgroundColor: '#1a1a1a',
    marginHorizontal: '2%',
    marginVertical: 6,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridLabel: {
    color: '#888888',
    fontSize: 12,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 16,
  },
  missionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeStatus: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: '500',
  },
  missionLocation: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  sponsorBadge: {
    color: '#2196f3',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },
  missionProgress: {
    marginTop: 16,
  },
  progressText: {
    color: '#888888',
    fontSize: 12,
  },
  missionProgressBarContainer: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  missionProgressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  utilizationText: {
    color: '#888888',
    fontSize: 12,
  },
  missionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  missionFooterStats: {
    color: '#888888',
    fontSize: 11,
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: '#2e7d32',
    fontSize: 12,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    overflow: 'hidden',
  },
  activityContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityTextContainer: {
    flex: 1,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  activityText: {
    color: '#ffffff',
    fontSize: 13,
    flex: 1,
  },
  activitySubtext: {
    color: '#888888',
    fontSize: 10,
    marginTop: 2,
  },
  activityReward: {
    color: '#4caf50',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 8,
  },
  fundButton: {
    backgroundColor: '#2e7d32',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  fundButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});