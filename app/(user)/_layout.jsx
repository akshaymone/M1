import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Tabs } from 'expo-router';

export default function UserLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ color, fontSize: 20 }}>🔔</Text>
              <View style={styles.badge} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>💰</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
      <Tabs.Screen
        name="admin"
        options={{
          title: 'Admin',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚙️</Text>,
        }}
      />
      {/* Hide other user screens from tabs */}
      <Tabs.Screen name="tree-detail" options={{ href: null }} />
      <Tabs.Screen name="plant" options={{ href: null }} />
      <Tabs.Screen name="success" options={{ href: null }} />
      <Tabs.Screen name="review-request" options={{ href: null }} />
      <Tabs.Screen name="gps-check" options={{ href: null }} />
      <Tabs.Screen name="video-call" options={{ href: null }} />
      <Tabs.Screen name="review-success" options={{ href: null }} />
      <Tabs.Screen name="reviewer-notification" options={{ href: null }} />
      <Tabs.Screen name="upi-setup" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#111111',
    borderTopColor: '#222222',
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -2,
    backgroundColor: '#c62828',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#111111',
  }
});
