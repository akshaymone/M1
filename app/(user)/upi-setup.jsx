import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';

export default function UPISetupScreen() {
  const router = useRouter();
  const [upiId, setUpiId] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const supportedApps = [
    { name: 'GPay', icon: 'G', color: '#34a853' },
    { name: 'PhonePe', icon: 'P', color: '#5f259f' },
    { name: 'Paytm', icon: 'Pay', color: '#00baf2' },
    { name: 'BHIM', icon: 'B', color: '#e47911' },
  ];

  const handleVerify = () => {
    if (upiId.includes('@')) {
      setIsVerified(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Link UPI ID</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>💳</Text>
          <Text style={styles.heroTitle}>Get paid directly to your UPI</Text>
          <Text style={styles.heroSubtitle}>
            Your weekly rewards will be sent every Monday morning
          </Text>
        </View>

        {/* Supported Apps */}
        <View style={styles.appsSection}>
          <Text style={styles.sectionLabel}>Supported Apps</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.appsList}>
            {supportedApps.map((app, index) => (
              <View key={index} style={styles.appItem}>
                <View style={[styles.appIconCircle, { backgroundColor: '#1a1a1a' }]}>
                  <Text style={[styles.appIconText, { color: app.color }]}>{app.icon}</Text>
                </View>
                <Text style={styles.appName}>{app.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter your UPI ID</Text>
          <TextInput
            style={styles.input}
            placeholder="yourname@bank"
            placeholderTextColor="#666"
            value={upiId}
            onChangeText={(text) => {
              setUpiId(text);
              setIsVerified(false);
            }}
            autoCapitalize="none"
          />
          <Text style={styles.examples}>
            Examples: name@okicici, name@ybl, name@paytm
          </Text>

          {!isVerified ? (
            <TouchableOpacity 
              style={styles.verifyButton}
              onPress={handleVerify}
            >
              <Text style={styles.verifyButtonText}>Verify UPI ID</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.successCard}>
              <Text style={styles.successTitle}>✅ UPI ID Verified!</Text>
              <Text style={styles.verifiedId}>{upiId}</Text>
              <Text style={styles.verifiedOwner}>Linked to: Akshay Mone • ICICI Bank</Text>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => router.replace('/(user)/wallet')}
              >
                <Text style={styles.saveButtonText}>Save & Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Security Note */}
        <View style={styles.securitySection}>
          <Text style={styles.securityText}>🔒 Your UPI ID is encrypted and secure</Text>
          <Text style={styles.securitySubtext}>M1Corp never stores your full bank details</Text>
        </View>
        
        <View style={{ height: 40 }} />
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
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
  appsSection: {
    marginTop: 32,
  },
  sectionLabel: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  appsList: {
    paddingHorizontal: 16,
  },
  appItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  appIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  appIconText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  appName: {
    color: '#888888',
    fontSize: 10,
  },
  inputSection: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    marginTop: 32,
  },
  inputLabel: {
    color: '#888888',
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
    padding: 14,
    color: '#ffffff',
    fontSize: 16,
  },
  examples: {
    color: '#888888',
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 8,
  },
  verifyButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successCard: {
    backgroundColor: '#1b5e20',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  successTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  verifiedId: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  verifiedOwner: {
    color: '#cccccc',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#2e7d32',
    width: '100%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  securitySection: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  securityText: {
    color: '#888888',
    fontSize: 12,
  },
  securitySubtext: {
    color: '#666666',
    fontSize: 10,
    marginTop: 4,
  },
});