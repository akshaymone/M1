import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CorporatorEarnings() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Commission Earnings</Text>
        <Text style={styles.headerSub}>Weekly payout: Every Monday</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <LinearGradient
          colors={['#0d47a1', '#1565c0']}
          style={styles.balanceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.balanceLabel}>Total Commission Earned</Text>
          <Text style={styles.balanceAmount}>₹2,840</Text>
          
          <View style={styles.bannerDivider} />
          
          <View style={styles.bannerStatsRow}>
            <View style={styles.bannerStat}>
              <Text style={styles.bannerStatValue}>₹2,840</Text>
              <Text style={styles.bannerStatLabel}>Total Earned</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.bannerStat}>
              <Text style={styles.bannerStatValue}>₹284</Text>
              <Text style={styles.bannerStatLabel}>This Week</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.bannerStat}>
              <Text style={styles.bannerStatValue}>₹0</Text>
              <Text style={styles.bannerStatLabel}>Pending</Text>
            </View>
          </View>
          
          <Text style={styles.nextPayout}>Next payout: Monday 24 Mar</Text>
        </LinearGradient>

        {/* How Commission Works Card */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>ℹ️ How Your Commission Works</Text>
          <Text style={styles.infoText}>
            You earn 0.5% of every task reward completed by users in your governing area.
          </Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.exampleContainer}>
            <Text style={styles.exampleHeader}>Example: User earns ₹25 for watering a tree</Text>
            <View style={styles.row}>
              <Text style={styles.label}>User receives</Text>
              <Text style={[styles.value, { color: '#4caf50' }]}>₹24.875 (99.5%)</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Your commission</Text>
              <Text style={[styles.value, { color: '#1565c0' }]}>₹0.125 (0.5%)</Text>
            </View>
          </View>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.projectionContainer}>
            <Text style={styles.exampleHeader}>With 1,000 tasks/month at avg ₹28:</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Total rewards paid</Text>
              <Text style={styles.value}>₹28,000</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Your monthly commission</Text>
              <Text style={[styles.value, { color: '#1565c0', fontWeight: 'bold' }]}>₹140</Text>
            </View>
          </View>
          
          <Text style={styles.greenItalic}>
            More trees and active users = higher earnings
          </Text>
        </View>

        {/* Weekly Breakdown Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Weekly Commission Breakdown</Text>
          
          {/* Week 4 - Current */}
          <View style={[styles.weekCard, { borderLeftColor: '#ff9800' }]}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekDate}>Week of 24 Mar 2026</Text>
              <Text style={[styles.weekAmount, { color: '#ffeb3b' }]}>₹284 (est.)</Text>
            </View>
            <Text style={styles.weekStats}>Current week • Updating in real time</Text>
            <Text style={[styles.statusBadge, { color: '#ff9800' }]}>⏳ Pending payout</Text>
          </View>

          {/* Week 1 */}
          <View style={[styles.weekCard, { borderLeftColor: '#1565c0' }]}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekDate}>Week of 17 Mar 2026</Text>
              <Text style={styles.weekAmount}>₹284</Text>
            </View>
            <Text style={styles.weekStats}>1,240 tasks • Total value: ₹56,800 • Your 0.5%: ₹284</Text>
            <Text style={[styles.statusBadge, { color: '#4caf50' }]}>✅ Paid to UPI</Text>
          </View>

          {/* Week 2 */}
          <View style={[styles.weekCard, { borderLeftColor: '#1565c0' }]}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekDate}>Week of 10 Mar 2026</Text>
              <Text style={styles.weekAmount}>₹261</Text>
            </View>
            <Text style={styles.weekStats}>1,138 tasks • Total value: ₹52,200 • Your cut: ₹261</Text>
            <Text style={[styles.statusBadge, { color: '#4caf50' }]}>✅ Paid to UPI</Text>
          </View>

          {/* Week 3 */}
          <View style={[styles.weekCard, { borderLeftColor: '#1565c0' }]}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekDate}>Week of 3 Mar 2026</Text>
              <Text style={styles.weekAmount}>₹198</Text>
            </View>
            <Text style={styles.weekStats}>864 tasks • Total value: ₹39,600 • Your cut: ₹198</Text>
            <Text style={[styles.statusBadge, { color: '#4caf50' }]}>✅ Paid to UPI</Text>
          </View>
        </View>

        {/* Linked UPI Card */}
        <View style={styles.upiCard}>
          <View style={styles.upiIconContainer}>
            <Text style={styles.upiIcon}>💳</Text>
          </View>
          <View style={styles.upiInfo}>
            <Text style={styles.upiId}>rajesh.patil@okhdfc</Text>
            <Text style={styles.upiVerified}>Verified ✅</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSub: {
    color: '#1565c0',
    fontSize: 12,
    marginTop: 2,
  },
  container: {
    flex: 1,
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
    marginVertical: 8,
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
    fontSize: 16,
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
  nextPayout: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 12,
  },
  infoCard: {
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
  infoText: {
    color: '#888888',
    fontSize: 13,
    marginBottom: 12,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 12,
  },
  exampleContainer: {
    gap: 8,
  },
  exampleHeader: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#888888',
    fontSize: 13,
  },
  value: {
    color: '#ffffff',
    fontSize: 13,
  },
  projectionContainer: {
    gap: 8,
  },
  greenItalic: {
    color: '#4caf50',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  sectionContainer: {
    marginHorizontal: 16,
  },
  weekCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekDate: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekAmount: {
    color: '#1565c0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  weekStats: {
    color: '#1565c0',
    fontSize: 11,
    marginTop: 4,
  },
  statusBadge: {
    fontSize: 11,
    marginTop: 8,
    textAlign: 'right',
  },
  upiCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upiIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1565c0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  upiIcon: {
    fontSize: 18,
  },
  upiInfo: {
    flex: 1,
  },
  upiId: {
    color: '#ffffff',
    fontSize: 14,
  },
  upiVerified: {
    color: '#4caf50',
    fontSize: 11,
    marginTop: 2,
  },
  changeText: {
    color: '#888888',
    fontSize: 12,
  },
});
