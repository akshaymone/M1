import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleSignIn = () => {
    // Navigate directly to home
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Text style={styles.logo}>M1</Text>
        <Text style={styles.tagline}>Connect with people around you</Text>
      </View>

      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={handleSignIn}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} 
          style={styles.googleIcon} 
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 80,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#888888',
    marginTop: 10,
    textAlign: 'center',
  },
  googleButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 18,
    fontWeight: '600',
  },
});
