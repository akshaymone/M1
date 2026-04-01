import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const tasks = [
    {
      id: 1,
      tree: 'Neem Tree - Pune Sector 4',
      plantedBy: 'Rahul',
      type: 'Water',
      typeColor: '#2196F3',
      reward: '25',
      distance: '0.8 km',
      due: '6:00 PM',
      icon: '💧'
    },
    {
      id: 2,
      tree: 'Banyan Tree - Kothrud',
      plantedBy: 'Priya',
      type: 'Fertilize',
      typeColor: '#9C27B0',
      reward: '40',
      distance: '1.2 km',
      due: '4:30 PM',
      icon: '🌿'
    },
    {
      id: 3,
      tree: 'Mango Tree - Baner',
      plantedBy: 'Suresh',
      type: 'Health Check',
      typeColor: '#FF9800',
      reward: '20',
      distance: '2.5 km',
      due: '8:00 PM',
      icon: '🔍'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.userNameText}>Akshay 🌱</Text>
          </View>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=8' }} style={styles.avatar} />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#4caf50' }]}>12</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>₹450</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#2196f3' }]}>8</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.pendingText}>3 pending</Text>
        </View>

        <View style={styles.tasksList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskTopRow}>
                <View style={styles.treeInfo}>
                  <Text style={styles.treeEmoji}>🌳</Text>
                  <View>
                    <Text style={styles.treeName}>{task.tree}</Text>
                    <Text style={styles.plantedBy}>Planted by {task.plantedBy}</Text>
                  </View>
                </View>
                <View style={[styles.typeBadge, { backgroundColor: task.typeColor + '22' }]}>
                  <Text style={[styles.typeBadgeText, { color: task.typeColor }]}>{task.icon} {task.type}</Text>
                </View>
              </View>

              <View style={styles.taskMiddleRow}>
                <Text style={styles.rewardText}>₹{task.reward} reward</Text>
                <TouchableOpacity style={styles.claimButton}>
                  <Text style={styles.claimButtonText}>Claim</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.taskBottomRow}>
                <Text style={styles.distanceText}>📍 {task.distance} away</Text>
                <Text style={styles.dueText}>Due by {task.due}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/plant')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+ Plant a Tree</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  greetingText: {
    color: '#888888',
    fontSize: 16,
  },
  userNameText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#f57c00',
    fontSize: 14,
    fontWeight: '500',
  },
  tasksList: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  taskTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  treeInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  treeEmoji: {
    fontSize: 24,
  },
  treeName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  plantedBy: {
    color: '#888888',
    fontSize: 12,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#222222',
  },
  rewardText: {
    color: '#4caf50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  claimButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  claimButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  taskBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceText: {
    color: '#888888',
    fontSize: 12,
  },
  dueText: {
    color: '#f57c00',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  fabText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
