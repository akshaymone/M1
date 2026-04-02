import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';

export default function CorporatorProfile() {
  const router = useRouter();
  const [isReviewer, setIsReviewer] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=33' }} 
            style={styles.avatar} 
          />
          <Text style={styles.profileName}>Rajesh Patil</Text>
          <Text style={styles.profileRole}>Ward 15 Representative, Pune</Text>
          
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏛️ Elected Corporator</Text>
          </View>
          
          <Text style={styles.profileAffiliation}>BJP • Serving since 2022</Text>
        </View>

        {/* Governing Area Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🗺️ Governing Area</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Ward</Text>
            <Text style={styles.value}>Ward 15 - Aundh</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>Pune, Maharashtra</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Party</Text>
            <Text style={styles.value}>BJP</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Term</Text>
            <Text style={styles.value}>2022 - 2027</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Areas managed</Text>
            <Text style={[styles.value, { color: '#1565c0' }]}>3 locations</Text>
          </View>
        </View>

        {/* Impact Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌳 My Environmental Impact</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Trees protected</Text>
            <Text style={[styles.value, { color: '#4caf50', fontWeight: 'bold' }]}>127</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Tasks facilitated</Text>
            <Text style={[styles.value, { color: '#1565c0' }]}>1,240</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Users in my area</Text>
            <Text style={[styles.value, { color: '#ff9800' }]}>23</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Total commission earned</Text>
            <Text style={[styles.value, { color: '#ffeb3b', fontWeight: 'bold' }]}>₹2,840</Text>
          </View>
        </View>

        {/* Reviewer Toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleIcon}>📹</Text>
            <View style={styles.toggleTextContainer}>
              <Text style={styles.toggleTitle}>Available as Tree Reviewer</Text>
              <Text style={styles.toggleSub}>Earn additional ₹25 per review you complete</Text>
            </View>
            <Switch
              value={isReviewer}
              onValueChange={setIsReviewer}
              trackColor={{ false: '#333', true: '#1565c0' }}
              thumbColor={isReviewer ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  profileName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileRole: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#1565c0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileAffiliation: {
    color: '#888888',
    fontSize: 12,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    color: '#888888',
    fontSize: 14,
  },
  value: {
    color: '#ffffff',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 10,
  },
  toggleCard: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  toggleTextContainer: {
    flex: 1,
  },
  toggleTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toggleSub: {
    color: '#888888',
    fontSize: 11,
    marginTop: 2,
  },
  logoutBtn: {
    backgroundColor: '#c62828',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
