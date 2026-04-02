import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function ImpactReportScreen() {
  const router = useRouter();

  const financialItems = [
    { label: 'Planting Rewards Paid', value: '₹4,700', color: '#4caf50' },
    { label: 'Care Task Rewards Paid', value: '₹11,400', color: '#4caf50' },
    { label: 'Review Rewards Paid', value: '₹2,350', color: '#4caf50' },
    { label: 'Platform Fee (5%)', value: '₹15,000', color: '#ff9800' },
  ];

  const species = [
    { name: 'Neem (Azadirachta indica)', count: '18 trees' },
    { name: 'Banyan (Ficus benghalensis)', count: '12 trees' },
    { name: 'Peepal (Ficus religiosa)', count: '9 trees' },
    { name: 'Mango (Mangifera indica)', count: '8 trees' },
  ];

  const contributors = [
    { rank: 'Gold', name: 'Priya Patel', tasks: 32, earned: '₹1,280', color: '#ffd700' },
    { rank: 'Silver', name: 'Rahul Sharma', tasks: 28, earned: '₹1,120', color: '#c0c0c0' },
    { rank: 'Bronze', name: 'Akshay Mone', tasks: 19, earned: '₹760', color: '#cd7f32' },
  ];

  const environmental = [
    { label: '🌳 Trees planted', value: '47', color: '#4caf50' },
    { label: '💧 Water used for care', value: '2,350 liters', color: '#2196f3' },
    { label: '☁️ CO2 offset (estimated)', value: '~470 kg', color: '#4caf50' },
    { label: '🌡️ Area climate impact', value: 'Minimal cooling', color: '#4caf50' },
    { label: '👥 People employed', value: '23 users', color: '#2196f3' },
  ];

  const verification = [
    { label: 'GPS verified tasks', value: '98%', color: '#4caf50' },
    { label: 'Video reviewed tasks', value: '94%', color: '#4caf50' },
    { label: 'Admin approved trees', value: '44/47', color: '#4caf50' },
    { label: 'Average review time', value: '4.2 minutes', color: '#ffffff' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Impact Report</Text>
        <TouchableOpacity style={styles.downloadHeaderButton}>
          <Text style={styles.downloadHeaderText}>Download PDF</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Mission Summary Card */}
        <LinearGradient
          colors={['#1b5e20', '#2e7d32']}
          style={styles.summaryCard}
        >
          <Text style={styles.summaryTitle}>Mission: Pune Drought Relief</Text>
          <Text style={styles.summarySponsor}>Funded by Tata Foundation</Text>
          <Text style={styles.summaryDate}>March 2026 Report</Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>45 days</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Area covered</Text>
            <Text style={styles.summaryValue}>Pune North Zone</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <Text style={[styles.summaryValue, { color: '#ffffff' }]}>Active ✅</Text>
          </View>
        </LinearGradient>

        {/* Financial Breakdown */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>💰 Financial Summary</Text>
          <View style={styles.financialRow}>
            <Text style={styles.financialLabel}>Total Fund Allocated</Text>
            <Text style={styles.financialValueMain}>₹3,00,000</Text>
          </View>
          
          <View style={styles.itemDivider} />
          
          {financialItems.map((item, index) => (
            <View key={index} style={styles.financialRow}>
              <Text style={styles.financialLabel}>{item.label}</Text>
              <Text style={[styles.financialValue, { color: item.color }]}>{item.value}</Text>
            </View>
          ))}
          
          <View style={styles.itemDivider} />
          
          <View style={styles.financialRow}>
            <Text style={styles.totalLabel}>Total Utilized</Text>
            <Text style={[styles.totalValue, { color: '#4caf50' }]}>₹33,450</Text>
          </View>
          <View style={styles.financialRow}>
            <Text style={styles.totalLabel}>Remaining Balance</Text>
            <Text style={[styles.totalValue, { color: '#fbc02d' }]}>₹2,66,550</Text>
          </View>

          {/* Bar Chart Placeholder */}
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              <View style={[styles.bar, { height: '30%', backgroundColor: '#4caf50' }]} />
              <View style={[styles.bar, { height: '70%', backgroundColor: '#2196f3' }]} />
              <View style={[styles.bar, { height: '15%', backgroundColor: '#9c27b0' }]} />
              <View style={[styles.bar, { height: '10%', backgroundColor: '#ff9800' }]} />
            </View>
            <View style={styles.chartLabels}>
              <Text style={styles.chartLabel}>Planting</Text>
              <Text style={styles.chartLabel}>Care</Text>
              <Text style={styles.chartLabel}>Review</Text>
              <Text style={styles.chartLabel}>Fee</Text>
            </View>
            <Text style={styles.chartTitle}>Fund Utilization Breakdown</Text>
          </View>
        </View>

        {/* Trees Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌳 Trees Report</Text>
          <View style={styles.treeStatsRow}>
            <View style={styles.treeStat}>
              <Text style={[styles.treeStatValue, { color: '#4caf50' }]}>47</Text>
              <Text style={styles.treeStatLabel}>Planted</Text>
            </View>
            <View style={styles.treeStat}>
              <Text style={[styles.treeStatValue, { color: '#2196f3' }]}>44</Text>
              <Text style={styles.treeStatLabel}>Verified</Text>
            </View>
            <View style={styles.treeStat}>
              <Text style={[styles.treeStatValue, { color: '#ff9800' }]}>3</Text>
              <Text style={styles.treeStatLabel}>Pending</Text>
            </View>
          </View>
          
          <View style={styles.speciesList}>
            {species.map((item, index) => (
              <View key={index}>
                <View style={styles.listRow}>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Text style={styles.listValue}>{item.count}</Text>
                </View>
                {index < species.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Top Contributors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Top Contributors</Text>
          {contributors.map((user, index) => (
            <View key={index} style={styles.contributorCard}>
              <View style={[styles.rankBadge, { backgroundColor: user.color }]}>
                <Text style={styles.rankText}>{user.rank[0]}</Text>
              </View>
              <View style={styles.contributorInfo}>
                <Text style={styles.contributorName}>{user.name}</Text>
                <Text style={styles.contributorStats}>{user.tasks} tasks completed</Text>
              </View>
              <Text style={styles.earnedAmount}>{user.earned} earned</Text>
            </View>
          ))}
        </View>

        {/* Environmental Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Environmental Impact</Text>
          <View style={styles.impactBox}>
            {environmental.map((item, index) => (
              <View key={index}>
                <View style={styles.listRow}>
                  <Text style={styles.listText}>{item.label}</Text>
                  <Text style={[styles.listValue, { color: item.color }]}>{item.value}</Text>
                </View>
                {index < environmental.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Verification Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📹 Verification Summary</Text>
          <View style={styles.impactBox}>
            {verification.map((item, index) => (
              <View key={index}>
                <View style={styles.listRow}>
                  <Text style={styles.listText}>{item.label}</Text>
                  <Text style={[styles.listValue, { color: item.color }]}>{item.value}</Text>
                </View>
                {index < verification.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineButtonText}>📄 Download PDF Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filledButton}>
            <Text style={styles.filledButtonText}>📤 Share Report</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Donor Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/donor-dashboard')}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/fund-mission')}>
          <Text style={styles.tabIcon}>🌍</Text>
          <Text style={styles.tabLabel}>Fund Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabIcon, { color: '#2e7d32' }]}>📊</Text>
          <Text style={[styles.tabLabel, { color: '#2e7d32' }]}>Impact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/profile')}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  downloadHeaderButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  downloadHeaderText: {
    color: '#4caf50',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryCard: {
    margin: 16,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summarySponsor: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  summaryDate: {
    color: '#dddddd',
    fontSize: 12,
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#ffffff',
    opacity: 0.3,
    width: '100%',
    marginVertical: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#eeeeee',
    fontSize: 13,
  },
  summaryValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionCard: {
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
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  financialLabel: {
    color: '#aaaaaa',
    fontSize: 14,
  },
  financialValueMain: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  financialValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 8,
  },
  totalLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  bar: {
    width: 40,
    borderRadius: 4,
  },
  chartLabels: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  chartLabel: {
    color: '#888888',
    fontSize: 10,
    width: 50,
    textAlign: 'center',
  },
  chartTitle: {
    color: '#888888',
    fontSize: 11,
    marginTop: 16,
    fontStyle: 'italic',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  treeStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  treeStat: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  treeStatValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  treeStatLabel: {
    color: '#888888',
    fontSize: 11,
    marginTop: 4,
  },
  speciesList: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  listText: {
    color: '#aaaaaa',
    fontSize: 13,
  },
  listValue: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  contributorCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#000',
    fontWeight: 'bold',
  },
  contributorInfo: {
    flex: 1,
  },
  contributorName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contributorStats: {
    color: '#888888',
    fontSize: 11,
  },
  earnedAmount: {
    color: '#4caf50',
    fontSize: 13,
    fontWeight: 'bold',
  },
  impactBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
  },
  footerActions: {
    margin: 16,
    marginTop: 32,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#2e7d32',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  outlineButtonText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filledButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  filledButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    borderTopColor: '#222222',
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: '#666666',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666666',
    marginTop: 4,
  },
});