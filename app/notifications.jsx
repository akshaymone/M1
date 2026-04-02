import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Tasks', 'Reviews'];

  const notifications = [
    {
      id: 1,
      section: 'TODAY',
      type: 'New Tree Planted!',
      body: 'Rahul Sharma planted a Banyan tree at Kothrud Hills',
      time: '5 min ago',
      icon: '🌳',
      iconBg: '#2e7d3222',
      iconColor: '#2e7d32',
      unread: true,
      borderColor: '#2e7d32',
      category: 'Tasks'
    },
    {
      id: 2,
      section: 'TODAY',
      type: 'Review Request',
      body: 'Suresh Kumar needs verification for tree watering task',
      time: '23 min ago',
      icon: '📹',
      iconBg: '#1565c022',
      iconColor: '#1565c0',
      unread: true,
      borderColor: '#1565c0',
      reward: '₹25 reward',
      category: 'Reviews',
      link: '/reviewer-notification'
    },
    {
      id: 3,
      section: 'TODAY',
      type: 'Task Assigned to You',
      body: 'You have been assigned a watering task for Neem Tree - Sector 4. Reward: ₹25',
      time: '1 hour ago',
      icon: '✅',
      iconBg: '#f57c0022',
      iconColor: '#f57c00',
      unread: true,
      borderColor: '#f57c00',
      category: 'Tasks',
      link: '/home'
    },
    {
      id: 4,
      section: 'YESTERDAY',
      type: 'Reward Credited',
      body: '₹40 credited for fertilizing Banyan Tree - Kothrud',
      time: 'Yesterday 6:30 PM',
      icon: '💰',
      iconBg: '#fbc02d22',
      iconColor: '#fbc02d',
      unread: false,
      borderColor: '#fbc02d',
      category: 'Tasks'
    },
    {
      id: 5,
      section: 'YESTERDAY',
      type: 'Review Completed',
      body: 'Your tree planting was verified by Priya Patel. ₹100 credited!',
      time: 'Yesterday 2:15 PM',
      icon: '✅',
      iconBg: '#2e7d3222',
      iconColor: '#2e7d32',
      unread: false,
      borderColor: '#2e7d32',
      category: 'Reviews'
    },
    {
      id: 6,
      section: 'YESTERDAY',
      type: 'Task Assigned to You',
      body: 'You were assigned a health check task for Mango Tree - Baner. Reward: ₹20',
      time: 'Yesterday 9:00 AM',
      icon: '📋',
      iconBg: '#1565c022',
      iconColor: '#1565c0',
      unread: false,
      borderColor: '#1565c0',
      category: 'Tasks',
      link: '/home'
    },
    {
      id: 7,
      section: 'EARLIER',
      type: 'Welcome to M1!',
      body: 'Start planting trees and earn rewards for caring for them',
      time: '18 Mar 2026',
      icon: '🌱',
      iconBg: '#2e7d3222',
      iconColor: '#2e7d32',
      unread: false,
      borderColor: '#2e7d32',
      category: 'All'
    }
  ];

  const filteredNotifications = notifications.filter(notif => 
    activeTab === 'All' || notif.category === activeTab
  );

  const renderSection = (title, items) => {
    if (items.length === 0) return null;
    return (
      <View key={title} style={styles.section}>
        <Text style={styles.sectionLabel}>{title}</Text>
        {items.map((notif) => (
          <TouchableOpacity 
            key={notif.id} 
            style={[styles.notifItem, notif.unread ? styles.notifUnread : styles.notifRead]}
            onPress={() => notif.link ? router.push(notif.link) : null}
          >
            <View style={[styles.notifBorder, { backgroundColor: notif.borderColor }]} />
            <View style={[styles.iconCircle, { backgroundColor: notif.iconBg }]}>
              <Text style={{ fontSize: 16 }}>{notif.icon}</Text>
            </View>
            <View style={styles.notifContent}>
              <View style={styles.notifHeader}>
                <Text style={[styles.notifType, notif.unread && styles.boldText]}>{notif.type}</Text>
                {notif.unread && <View style={[styles.unreadDot, { backgroundColor: notif.borderColor }]} />}
              </View>
              <Text style={styles.notifBody}>{notif.body}</Text>
              <View style={styles.notifFooter}>
                <Text style={styles.notifTime}>{notif.time}</Text>
                {notif.reward && <Text style={styles.rewardText}>{notif.reward}</Text>}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const sections = ['TODAY', 'YESTERDAY', 'EARLIER'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerIcon}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markReadText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {sections.map(section => 
          renderSection(section, filteredNotifications.filter(n => n.section === section))
        )}
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#0a0a0a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  markReadText: {
    color: '#4caf50',
    fontSize: 13,
  },
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: '#2e7d32',
  },
  tabText: {
    color: '#888888',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#888888',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
  notifItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 1,
    position: 'relative',
  },
  notifUnread: {
    backgroundColor: '#1a1a1a',
  },
  notifRead: {
    backgroundColor: '#111111',
  },
  notifBorder: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 3,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifType: {
    color: '#ffffff',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notifBody: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 18,
  },
  notifFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  notifTime: {
    color: '#666666',
    fontSize: 11,
  },
  rewardText: {
    color: '#4caf50',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
