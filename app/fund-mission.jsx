import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function FundMissionScreen() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState('₹50K');
  const [selectedMission, setSelectedMission] = useState(1);

  const amounts = ['₹10K', '₹25K', '₹50K', '₹1L', '₹5L'];

  const impactData = {
    '₹10K': { trees: 3, users: 8, tasks: 65, duration: '1 month' },
    '₹25K': { trees: 8, users: 20, tasks: 160, duration: '2 months' },
    '₹50K': { trees: 16, users: 40, tasks: 320, duration: '3 months' },
    '₹1L': { trees: 35, users: 90, tasks: 700, duration: '6 months' },
    '₹5L': { trees: 180, users: 450, tasks: 3600, duration: '1 year' },
  };

  const currentImpact = impactData[selectedAmount];

  const missions = [
    {
      id: 1,
      icon: '🌵',
      title: 'Pune Drought Relief',
      tag: 'Most urgent • High impact',
      tagColor: '#ff9800',
      location: 'Pune, Maharashtra',
      need: 'Funding needed: ₹2,00,000 more',
      progress: '₹3,00,000 / ₹5,00,000',
      percent: 60,
      bullets: ['53 more trees needed', 'Severe drought area', '15 users ready to work'],
      borderColor: '#4caf50'
    },
    {
      id: 2,
      icon: '🌲',
      title: 'Nagpur Reforestation Drive',
      tag: 'Ongoing • Good progress',
      tagColor: '#4caf50',
      location: 'Nagpur, Maharashtra',
      need: 'Funding needed: ₹50,000 more',
      progress: '₹1,70,000 / ₹2,20,000',
      percent: 77,
      bullets: ['20 more trees needed', 'Moderate climate', '8 users active'],
      borderColor: '#4caf50'
    },
    {
      id: 3,
      icon: '🏜️',
      title: 'Vidarbha Green Initiative',
      tag: 'New mission • Be first donor',
      tagColor: '#2196f3',
      location: 'Amravati, Maharashtra',
      need: 'Funding needed: ₹5,00,000',
      progress: '₹0 / ₹5,00,000',
      percent: 0,
      bullets: ['100 trees planned', 'Critical drought zone', '25 users registered'],
      borderColor: '#4caf50'
    }
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
          <Text style={styles.headerTitle}>Fund a Mission</Text>
          <Text style={styles.headerSubtitle}>Choose where your money makes impact</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Impact Calculator */}
        <View style={styles.calculatorCard}>
          <Text style={styles.cardTitle}>💡 Your Impact Calculator</Text>
          
          <View style={styles.amountSelector}>
            {amounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountButton,
                  selectedAmount === amount && styles.selectedAmountButton
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[
                  styles.amountButtonText,
                  selectedAmount === amount && styles.selectedAmountButtonText
                ]}>
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.impactDetails}>
            <Text style={styles.impactHeading}>With {selectedAmount} you can fund:</Text>
            
            <View style={styles.impactRow}>
              <Text style={styles.impactIcon}>🌳</Text>
              <Text style={styles.impactText}>~{currentImpact.trees} trees planted</Text>
              <Text style={[styles.impactValue, { color: '#4caf50' }]}>Direct Impact</Text>
            </View>
            
            <View style={styles.impactRow}>
              <Text style={styles.impactIcon}>👥</Text>
              <Text style={styles.impactText}>~{currentImpact.users} users employed</Text>
              <Text style={[styles.impactValue, { color: '#2196f3' }]}>Livelihood</Text>
            </View>
            
            <View style={styles.impactRow}>
              <Text style={styles.impactIcon}>💧</Text>
              <Text style={styles.impactText}>~{currentImpact.tasks} watering tasks</Text>
              <Text style={[styles.impactValue, { color: '#00bcd4' }]}>Maintenance</Text>
            </View>
            
            <View style={styles.impactRow}>
              <Text style={styles.impactIcon}>📅</Text>
              <Text style={styles.impactText}>~{currentImpact.duration} of care</Text>
              <Text style={[styles.impactValue, { color: '#ff9800' }]}>Sustainability</Text>
            </View>
          </View>
        </View>

        {/* Missions Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Choose a Mission</Text>
          
          {missions.map((mission) => (
            <TouchableOpacity 
              key={mission.id}
              style={[
                styles.missionCard,
                selectedMission === mission.id && styles.selectedMissionCard
              ]}
              onPress={() => setSelectedMission(mission.id)}
              activeOpacity={0.9}
            >
              {selectedMission === mission.id && (
                <View style={styles.checkmarkContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
              
              <View style={styles.missionHeader}>
                <Text style={styles.missionTitle}>{mission.icon} {mission.title}</Text>
                <Text style={[styles.missionTag, { color: mission.tagColor }]}>{mission.tag}</Text>
              </View>
              
              <Text style={styles.missionLocation}>📍 {mission.location}</Text>
              <Text style={[styles.missionNeed, { color: mission.id === 1 ? '#ef5350' : '#ff9800' }]}>
                {mission.need}
              </Text>
              
              <View style={styles.missionProgress}>
                <Text style={styles.progressText}>{mission.progress}</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[
                    styles.progressBar, 
                    { 
                      width: `${mission.percent}%`, 
                      backgroundColor: mission.id === 1 ? '#ff9800' : '#4caf50' 
                    }
                  ]} />
                </View>
              </View>
              
              <View style={styles.bulletSection}>
                {mission.bullets.map((bullet, idx) => (
                  <Text key={idx} style={styles.bulletText}>• {bullet}</Text>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Custom Amount */}
        <View style={styles.customAmountCard}>
          <Text style={styles.customLabel}>Enter Custom Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencyPrefix}>₹</Text>
            <TextInput
              style={styles.customInput}
              placeholder="0.00"
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.minAmount}>Minimum ₹5,000</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.proceedButton}
          onPress={() => router.replace('/donor-dashboard')}
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment →</Text>
        </TouchableOpacity>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Donor Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/donor-dashboard')}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabIcon, { color: '#2e7d32' }]}>🌍</Text>
          <Text style={[styles.tabLabel, { color: '#2e7d32' }]}>Fund Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/impact-report')}>
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={styles.tabLabel}>Impact</Text>
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
    color: '#888888',
    fontSize: 12,
    marginTop: 2,
  },
  calculatorCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  amountSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  amountButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectedAmountButton: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  amountButtonText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '600',
  },
  selectedAmountButtonText: {
    color: '#ffffff',
  },
  impactDetails: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 20,
  },
  impactHeading: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.9,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  impactIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  impactText: {
    color: '#aaaaaa',
    fontSize: 13,
    flex: 1,
  },
  impactValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  missionCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedMissionCard: {
    borderColor: '#2e7d32',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#2e7d32',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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
  missionTag: {
    fontSize: 10,
    fontWeight: '600',
  },
  missionLocation: {
    color: '#888888',
    fontSize: 12,
    marginTop: 4,
  },
  missionNeed: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  missionProgress: {
    marginTop: 12,
  },
  progressText: {
    color: '#888888',
    fontSize: 11,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#333333',
    borderRadius: 3,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  bulletSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  bulletText: {
    color: '#888888',
    fontSize: 11,
    marginBottom: 4,
  },
  customAmountCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  customLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  currencyPrefix: {
    color: '#888888',
    fontSize: 18,
    marginRight: 4,
  },
  customInput: {
    flex: 1,
    height: 48,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  minAmount: {
    color: '#888888',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 6,
  },
  proceedButton: {
    backgroundColor: '#2e7d32',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  proceedButtonText: {
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