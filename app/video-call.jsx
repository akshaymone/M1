import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen() {
  const router = useRouter();
  const [gpsVerified, setGpsVerified] = useState(true); // Toggle this to test states
  const [panelExpanded, setPanelExpanded] = useState(true);

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

        {/* GPS Verification Panel */}
        <View style={styles.gpsPanel}>
          <TouchableOpacity 
            style={styles.panelHeader} 
            onPress={() => setPanelExpanded(!panelExpanded)}
            activeOpacity={0.7}
          >
            <Text style={styles.panelTitle}>📍 Doer Location Verification</Text>
            <Text style={styles.chevron}>{panelExpanded ? '▼' : '▶'}</Text>
          </TouchableOpacity>

          {panelExpanded && (
            <View style={styles.panelContent}>
              <View style={styles.badgeRow}>
                <View style={[styles.statusBadge, { backgroundColor: gpsVerified ? '#2e7d32' : '#c62828' }]}>
                  <Text style={styles.badgeText}>
                    {gpsVerified ? '✅ GPS Verified' : '❌ Location Not Verified'}
                  </Text>
                </View>
                <View style={styles.liveRedBadge}>
                  <Text style={styles.liveRedBadgeText}>Live</Text>
                </View>
              </View>

              {gpsVerified ? (
                <>
                  <Text style={styles.panelInfo}>Pune - Sector 4 Aundh</Text>
                  <Text style={[styles.panelInfo, { color: '#4caf50' }]}>12 meters from tree location</Text>
                  <Text style={[styles.panelInfo, { color: '#4caf50' }]}>High accuracy ±5m</Text>
                  <Text style={styles.panelTimestamp}>Verified at 14:32:05</Text>

                  {/* Mini Map Placeholder */}
                  <View style={styles.miniMap}>
                    <View style={styles.miniMapGridV} />
                    <View style={styles.miniMapGridH} />
                    <View style={styles.treePoint}>
                      <Text style={{ fontSize: 12 }}>📍</Text>
                      <Text style={styles.pointLabel}>Tree</Text>
                    </View>
                    <View style={styles.userPoint}>
                      <View style={styles.userDot} />
                      <Text style={[styles.pointLabel, { color: '#4caf50' }]}>Doer</Text>
                    </View>
                    <Text style={styles.liveLocationText}>Live location</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.warningText}>
                  Doer is not at tree location. Do not approve until location is confirmed.
                </Text>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* Bottom Interface */}
      <View style={styles.bottomInterface}>
        {/* Action Buttons */}
        <View style={styles.actionRowContainer}>
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.approveButton, !gpsVerified && styles.disabledButton]}
              onPress={() => gpsVerified ? router.push('/review-success') : null}
              disabled={!gpsVerified}
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
          {!gpsVerified && (
            <Text style={styles.tooltipText}>GPS verification required before approving</Text>
          )}
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
    bottom: 260,
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
    zIndex: 10,
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
  gpsPanel: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  panelTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  chevron: {
    color: '#ffffff',
    fontSize: 12,
  },
  panelContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  liveRedBadge: {
    backgroundColor: '#e53935',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveRedBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  panelInfo: {
    color: '#ffffff',
    fontSize: 11,
    marginBottom: 2,
  },
  panelTimestamp: {
    color: '#888888',
    fontSize: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  miniMap: {
    height: 80,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  miniMapGridV: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#222',
  },
  miniMapGridH: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#222',
  },
  treePoint: {
    position: 'absolute',
    top: '30%',
    left: '45%',
    alignItems: 'center',
  },
  userPoint: {
    position: 'absolute',
    top: '55%',
    left: '55%',
    alignItems: 'center',
  },
  userDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
  },
  pointLabel: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  liveLocationText: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    color: '#4caf50',
    fontSize: 8,
    fontWeight: 'bold',
  },
  warningText: {
    color: '#f44336',
    fontSize: 11,
    fontStyle: 'italic',
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
  actionRowContainer: {
    marginBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  approveButton: {
    flex: 1,
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#444',
    opacity: 0.7,
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
  tooltipText: {
    color: '#888888',
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
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
