import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Main Video Area (Remote) */}
      <View style={styles.remoteVideo}>
        <View style={styles.remotePlaceholder}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=8' }} 
            style={styles.remoteAvatar} 
          />
          <Text style={styles.remoteName}>Akshay Mone</Text>
        </View>

        {/* Live Badge and Timer */}
        <View style={styles.topBar}>
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>Live</Text>
          </View>
          <Text style={styles.timer}>02:34</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* Small Self View (PiP) */}
      <View style={styles.selfView}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
          style={styles.selfAvatar} 
        />
        <Text style={styles.selfLabel}>You</Text>
      </View>

      {/* Header Overlay */}
      <SafeAreaView style={styles.headerOverlay}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Tree Verification Call</Text>
            <Text style={styles.headerSubtitle}>Neem Tree - Pune Sector 4</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>

      {/* Bottom Interface */}
      <View style={styles.bottomInterface}>
        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.approveButton}
            onPress={() => router.push('/review-success')}
          >
            <Text style={styles.buttonText}>✅ Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.rejectButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>❌ Reject</Text>
          </TouchableOpacity>
        </View>

        {/* Control Bar */}
        <View style={styles.controlBar}>
          <View style={styles.controlItem}>
            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlIcon}>🎤</Text>
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Mute</Text>
          </View>

          <View style={styles.controlItem}>
            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlIcon}>📷</Text>
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Camera</Text>
          </View>

          <View style={styles.controlItem}>
            <TouchableOpacity style={styles.controlButton}>
              <Text style={styles.controlIcon}>💬</Text>
            </TouchableOpacity>
            <Text style={styles.controlLabel}>Chat</Text>
          </View>

          <View style={styles.controlItem}>
            <TouchableOpacity 
              style={[styles.controlButton, styles.endCallButton]}
              onPress={() => router.back()}
            >
              <Text style={styles.controlIcon}>📞</Text>
            </TouchableOpacity>
            <Text style={styles.controlLabel}>End</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remotePlaceholder: {
    alignItems: 'center',
  },
  remoteAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#333',
  },
  remoteName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topBar: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  liveBadge: {
    backgroundColor: '#e53935',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  timer: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  selfView: {
    position: 'absolute',
    bottom: 240,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: '#222222',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    elevation: 5,
  },
  selfAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  selfLabel: {
    color: '#ffffff',
    fontSize: 12,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#888888',
    fontSize: 12,
  },
  bottomInterface: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#c62828',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlItem: {
    alignItems: 'center',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  endCallButton: {
    backgroundColor: '#e53935',
  },
  controlIcon: {
    fontSize: 22,
  },
  controlLabel: {
    color: '#ffffff',
    fontSize: 11,
  },
});
