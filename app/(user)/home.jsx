import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const tasks = [
    {
      id: 4,
      tree: 'New Tree - Pune Sector 4',
      plantedBy: 'Suresh Kumar',
      type: 'Review',
      typeColor: '#1565c0',
      reward: '25 reviewer reward',
      distance: '1.2 km',
      due: 'Now',
      icon: '📹',
      isReview: true
    },
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

        {/* Reviewer Opt-in Toggle */}
        <View style={styles.optInCard}>
          <View style={styles.optInRow}>
            <View style={styles.optInLeft}>
              <Text style={styles.optInIcon}>📹</Text>
              <Text style={styles.optInText}>Available as Reviewer</Text>
            </View>
            <View style={styles.toggleTrack}>
              <View style={styles.toggleThumb} />
            </View>
          </View>
          <Text style={styles.optInSubtext}>You will be notified when reviews are needed</Text>
        </View>

        {/* Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <Text style={styles.pendingText}>{tasks.length} pending</Text>
        </View>
        <Text style={styles.autoAssignInfo}>Tasks are auto-assigned based on each tree's care schedule</Text>

        <View style={styles.tasksList}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <View style={styles.taskTopRow}>
                  <TouchableOpacity 
                    style={styles.treeInfo} 
                    onPress={() => router.push('/(user)/tree-detail')}
                  >
                    <Text style={styles.treeEmoji}>🌳</Text>
                    <View>
                      <Text style={styles.treeName}>{task.tree}</Text>
                      <Text style={styles.plantedBy}>
                        {task.isReview ? `${task.plantedBy} wants verification` : `Planted by ${task.plantedBy}`}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={[styles.typeBadge, { backgroundColor: task.typeColor + '22' }]}>
                    <Text style={[styles.typeBadgeText, { color: task.typeColor }]}>{task.icon} {task.type}</Text>
                  </View>
                </View>

                <View style={styles.taskMiddleRow}>
                  <Text style={[styles.rewardText, task.isReview && { color: '#4caf50' }]}>
                    {task.isReview ? task.reward : `₹${task.reward} reward`}
                  </Text>
                  <TouchableOpacity 
                    style={[styles.claimButton, task.isReview && { backgroundColor: '#1565c0' }]}
                    onPress={() => {
                      if (task.isReview) {
                        router.push('/(user)/reviewer-notification');
                      } else {
                        setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
                      }
                    }}
                  >
                    <Text style={styles.claimButtonText}>
                      {task.isReview ? 'Accept Review' : (expandedTaskId === task.id ? 'Close' : 'Claim')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {expandedTaskId === task.id && !task.isReview && (
                  <View style={styles.gpsRequirementCard}>
                    <Text style={styles.gpsRequirementTitle}>📍 GPS Check Required</Text>
                    <Text style={styles.gpsRequirementSubtext}>
                      You must be within 50m of the tree to claim this task
                    </Text>
                    <TouchableOpacity 
                      style={styles.checkLocationButton}
                      onPress={() => router.push('/(user)/gps-check')}
                    >
                      <Text style={styles.checkLocationButtonText}>Check My Location</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.taskBottomRow}>
                  <View style={styles.bottomLeft}>
                    <Text style={styles.distanceText}>📍 {task.distance} away</Text>
                    {!task.isReview && (
                      <View style={styles.gpsStatusIndicator}>
                        <View style={styles.orangeDot} />
                        <Text style={styles.gpsStatusLabel}>GPS pending</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.dueText, task.isReview && { color: '#2196f3' }]}>
                    {task.isReview ? 'Review Request' : `Due by ${task.due}`}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📋</Text>
              <Text style={styles.emptyTitle}>No tasks assigned for today</Text>
              <Text style={styles.emptySubtext}>Check back later, tasks are generated automatically</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/(user)/plant')}
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
    marginBottom: 24,
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
  optInCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
  },
  optInRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  optInLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optInIcon: {
    fontSize: 18,
  },
  optInText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleTrack: {
    width: 40,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2e7d32',
    justifyContent: 'center',
    paddingHorizontal: 2,
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#ffffff',
  },
  optInSubtext: {
    color: '#888888',
    fontSize: 10,
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
  autoAssignInfo: {
    color: '#888888',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  pendingText: {
    color: '#f57c00',
    fontSize: 14,
    fontWeight: '500',
  },
  tasksList: {
    gap: 12,
  },
  emptyState: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#666666',
    fontSize: 13,
    textAlign: 'center',
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
    fontSize: 14,
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
    alignItems: 'center',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gpsStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f57c0011',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f57c00',
  },
  gpsStatusLabel: {
    color: '#f57c00',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gpsRequirementCard: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#f57c0044',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    marginTop: 8,
  },
  gpsRequirementTitle: {
    color: '#f57c00',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gpsRequirementSubtext: {
    color: '#888888',
    fontSize: 11,
    marginBottom: 12,
  },
  checkLocationButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkLocationButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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

