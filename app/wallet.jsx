import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WalletScreen() {
  const router = useRouter();

  const payouts = [
    { id: 1, title: 'Weekly Payout', date: '24 Mar 2026 • Monday', amount: '₹1,250 (estimated)', status: 'Upcoming', statusColor: '#ff9800', borderColor: '#ff9800' },
    { id: 2, title: 'Weekly Payout', date: '17 Mar 2026 • Monday', amount: '₹450 → akshay@okicici', status: 'Credited', statusColor: '#4caf50', borderColor: '#4caf50' },
    { id: 3, title: 'Weekly Payout', date: '10 Mar 2026 • Monday', amount: '₹380 → akshay@okicici', status: 'Credited', statusColor: '#4caf50', borderColor: '#4caf50' },
    { id: 4, title: 'Weekly Payout', date: '3 Mar 2026 • Monday', amount: '₹420 → akshay@okicici', status: 'Credited', statusColor: '#4caf50', borderColor: '#4caf50' },
  ];

  const earnings = [
    { id: 1, icon: '💧', title: 'Watered Neem Tree - Sector 4', amount: '₹25' },
    { id: 2, icon: '📹', title: 'Reviewed Banyan Tree planting', amount: '₹25' },
    { id: 3, icon: '🌱', title: 'Planted Mango Tree - Baner', amount: '₹100' },
    { id: 4, icon: '🌿', title: 'Fertilized Peepal Tree', amount: '₹40' },
    { id: 5, icon: '🔍', title: 'Health Check - Gulmohar', amount: '₹20' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Wallet</Text>
          <Text style={styles.headerSubtitle}>Weekly payout: Every Monday</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#1b5e20', '#2e7d32']}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹1,250</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹900</Text>
              <Text style={styles.statLabel}>Task Rewards</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹350</Text>
              <Text style={styles.statLabel}>Review Rewards</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>₹2,400</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
          </View>
          
          <Text style={styles.nextPayout}>Next payout: Monday 24 Mar</Text>
        </LinearGradient>

        {/* UPI Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>💳 Linked UPI ID</Text>
          <View style={styles.upiRow}>
            <View style={styles.upiIconContainer}>
              <Text style={styles.upiIcon}>📱</Text>
            </View>
            <View style={styles.upiDetails}>
              <Text style={styles.upiId}>akshay@okicici</Text>
              <Text style={styles.upiStatus}>Verified ✅</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/upi-setup')}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payout History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Payout History</Text>
          {payouts.map((payout) => (
            <View 
              key={payout.id} 
              style={[styles.payoutCard, { borderLeftColor: payout.borderColor, borderLeftWidth: 4 }]}
            >
              <View style={styles.payoutIconContainer}>
                <Text>💰</Text>
              </View>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutTitle}>{payout.title}</Text>
                <Text style={styles.payoutDate}>{payout.date}</Text>
                <Text style={styles.payoutDetails}>{payout.amount}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: payout.statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: payout.statusColor }]}>
                  {payout.status === 'Credited' ? '✅ ' : '⏳ '}{payout.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Earnings Breakdown */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>This Week's Earnings</Text>
          {earnings.map((item, index) => (
            <View key={item.id}>
              <View style={styles.earningRow}>
                <Text style={styles.earningItemText}>{item.icon} {item.title}</Text>
                <Text style={styles.earningAmount}>{item.amount}</Text>
              </View>
              {index < earnings.length - 1 && <View style={styles.itemDivider} />}
            </View>
          ))}
          <View style={styles.itemDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total This Week</Text>
            <Text style={styles.totalValue}>₹210</Text>
          </View>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <View style={styles.infoTitleRow}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoTitle}>How payouts work</Text>
          </View>
          <Text style={styles.infoText}>
            Your earnings are automatically transferred to your linked UPI ID every Monday morning. Minimum payout is ₹100. Earnings below ₹100 are carried over to next week.
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0a0a0a',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#2e7d32',
    fontSize: 12,
    marginTop: 2,
  },
  balanceCard: {
    margin: 16,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.2,
    width: '100%',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 10,
    opacity: 0.7,
    marginTop: 4,
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#ffffff',
    opacity: 0.3,
    height: '100%',
  },
  nextPayout: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 16,
  },
  sectionContainer: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  upiRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  upiIcon: {
    fontSize: 20,
  },
  upiDetails: {
    flex: 1,
  },
  upiId: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  upiStatus: {
    color: '#4caf50',
    fontSize: 12,
    marginTop: 2,
  },
  changeText: {
    color: '#888888',
    fontSize: 12,
  },
  historySection: {
    margin: 16,
  },
  payoutCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  payoutIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2e7d3220',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  payoutInfo: {
    flex: 1,
  },
  payoutTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  payoutDate: {
    color: '#888888',
    fontSize: 11,
    marginTop: 2,
  },
  payoutDetails: {
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  earningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  earningItemText: {
    color: '#aaaaaa',
    fontSize: 13,
    flex: 1,
  },
  earningAmount: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '600',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#333333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 18,
  },
});