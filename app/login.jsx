import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>M1</Text>
        <Text style={styles.tagline}>Connect with people around you</Text>
        
        <View style={styles.spacer} />

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/(user)/home')}
          activeOpacity={0.8}
        >
          <View style={styles.googleLogoContainer}>
            <Text style={styles.googleG}>G</Text>
          </View>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity 
          style={styles.donorButton} 
          onPress={() => router.replace('/(donor)/donor-dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.donorButtonText}>Login as Donor</Text>
        </TouchableOpacity>
        
        <Text style={styles.donorSubtext}>For corporate donors and funding partners</Text>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity 
          style={styles.corporatorButton} 
          onPress={() => router.replace('/(corporator)/corporator-dashboard')}
          activeOpacity={0.8}
        >
          <Text style={styles.corporatorButtonText}>Login as Corporator</Text>
        </TouchableOpacity>
        
        <Text style={styles.corporatorSubtext}>For elected corporators and ward representatives</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 72,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  tagline: {
    color: '#888888',
    fontSize: 16,
    marginTop: 8,
  },
  spacer: {
    height: 60,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleLogoContainer: {
    marginRight: 16,
  },
  googleG: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dividerText: {
    color: '#888888',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  donorButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2e7d32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donorButtonText: {
    color: '#2e7d32',
    fontSize: 16,
    fontWeight: '600',
  },
  donorSubtext: {
    color: '#888888',
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
  },
  corporatorButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1565c0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corporatorButtonText: {
    color: '#1565c0',
    fontSize: 16,
    fontWeight: '600',
  },
  corporatorSubtext: {
    color: '#888888',
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
  },
});