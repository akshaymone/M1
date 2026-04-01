import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function PlantTreeScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(1);
  const [species, setSpecies] = useState('Neem (Azadirachta indica)');
  const [age, setAge] = useState('Sapling (0-1 year)');

  const locations = [
    { id: 1, name: 'Pune - Sector 4, Aundh', distance: '2.3 km away', spots: '5 spots available' },
    { id: 2, name: 'Pune - Kothrud Hills', distance: '4.1 km away', spots: '3 spots available' },
    { id: 3, name: 'Pune - Baner Forest Edge', distance: '6.8 km away', spots: '8 spots available' },
    { id: 4, name: 'Pune - Wakad Greenway', distance: '9.2 km away', spots: '2 spots available' },
  ];

  const renderProgress = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressRow}>
        <View style={[styles.progressCircle, step >= 1 && styles.activeCircle]}>
          {step > 1 ? <Text style={styles.checkText}>✓</Text> : <Text style={styles.stepNum}>1</Text>}
        </View>
        <View style={[styles.progressLine, step >= 2 && styles.activeLine]} />
        <View style={[styles.progressCircle, step >= 2 && styles.activeCircle]}>
          {step > 2 ? <Text style={styles.checkText}>✓</Text> : <Text style={styles.stepNum}>2</Text>}
        </View>
        <View style={[styles.progressLine, step >= 3 && styles.activeLine]} />
        <View style={[styles.progressCircle, step >= 3 && styles.activeCircle]}>
          <Text style={styles.stepNum}>3</Text>
        </View>
      </View>
      <View style={styles.progressLabels}>
        <Text style={[styles.stepLabel, step >= 1 && styles.activeLabel]}>Location</Text>
        <Text style={[styles.stepLabel, step >= 2 && styles.activeLabel]}>Details</Text>
        <Text style={[styles.stepLabel, step >= 3 && styles.activeLabel]}>Confirm</Text>
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepWrapper}>
      <Text style={styles.stepTitle}>Choose a Planting Location</Text>
      <Text style={styles.stepSubtitle}>Select from admin approved locations</Text>
      
      {locations.map((loc) => (
        <TouchableOpacity 
          key={loc.id} 
          style={[styles.locationCard, selectedLocation === loc.id && styles.selectedCard]}
          onPress={() => setSelectedLocation(loc.id)}
        >
          <View style={styles.locationIconContainer}>
            <Text style={styles.locationIcon}>📍</Text>
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>{loc.name}</Text>
            <Text style={styles.locationDistance}>{loc.distance}</Text>
            <Text style={styles.locationSpots}>{loc.spots}</Text>
          </View>
          <View style={[styles.radioButton, selectedLocation === loc.id && styles.radioActive]}>
            {selectedLocation === loc.id && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.nextButton} onPress={() => setStep(2)}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepWrapper}>
      <Text style={styles.stepTitle}>Tell us about your tree</Text>
      <Text style={styles.stepSubtitle}>Fill in the details of the tree you are planting</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tree Species</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{species}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tree Age</Text>
        <View style={styles.selectorRow}>
          <TouchableOpacity style={styles.selectorBtn} onPress={() => {}}>
            <Text style={styles.selectorBtnText}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.selectorValue}>{age}</Text>
          <TouchableOpacity style={styles.selectorBtn} onPress={() => {}}>
            <Text style={styles.selectorBtnText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput 
          style={[styles.inputContainer, styles.textArea]} 
          multiline 
          placeholder="This tree was planted near the water source..."
          placeholderTextColor="#444"
          value="This tree was planted near the water source to ensure it stays hydrated during the summer months."
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tree Photo</Text>
        <TouchableOpacity style={styles.photoPlaceholder}>
          <Text style={styles.cameraIcon}>📸</Text>
          <Text style={styles.photoText}>Add Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(1)}>
          <Text style={styles.backBtnText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.nextButton, { flex: 1, marginTop: 0 }]} onPress={() => setStep(3)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => {
    const locName = locations.find(l => l.id === selectedLocation)?.name;
    return (
      <View style={styles.stepWrapper}>
        <Text style={[styles.stepTitle, { textAlign: 'center' }]}>Ready to Plant! 🌱</Text>
        <Text style={[styles.stepSubtitle, { textAlign: 'center' }]}>Review your tree details before planting</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>🌳</Text>
          <Text style={styles.summaryTreeName}>Neem Tree</Text>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>📍 Location</Text>
            <Text style={styles.summaryValue}>{locName}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>🌿 Species</Text>
            <Text style={styles.summaryValue}>Azadirachta indica</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>📅 Age</Text>
            <Text style={styles.summaryValue}>{age}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>👤 Planted by</Text>
            <Text style={styles.summaryValue}>Akshay Mone</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>🗓️ Date</Text>
            <Text style={styles.summaryValue}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.rewardInfoCard}>
          <Text style={styles.rewardInfoText}>🎉 You will earn ₹100 for planting this tree!</Text>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => setStep(2)}>
          <Text style={styles.backBtnText}>Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.nextButton, styles.plantBtn]} onPress={() => router.replace('/review-request')}>
          <Text style={styles.buttonText}>Plant This Tree 🌱</Text>
        </TouchableOpacity>

        <View style={styles.videoReviewInfo}>
          <Text style={styles.videoReviewText}>
            📹 After planting, a live video review will be initiated to verify and release your ₹100 reward
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step === 1 ? router.back() : setStep(step - 1)}>
          <Text style={styles.headerBack}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant a Tree</Text>
        <View style={{ width: 24 }} />
      </View>

      {renderProgress()}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerBack: {
    color: '#ffffff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#0a0a0a',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
  },
  activeCircle: {
    borderColor: '#2e7d32',
    backgroundColor: '#2e7d32',
  },
  stepNum: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#333',
    marginHorizontal: 8,
  },
  activeLine: {
    backgroundColor: '#2e7d32',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 0,
  },
  stepLabel: {
    color: '#888',
    fontSize: 12,
    width: 60,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
  },
  stepWrapper: {
    flex: 1,
  },
  stepTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepSubtitle: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 24,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: '#2e7d32',
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  locationIcon: {
    fontSize: 20,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationDistance: {
    color: '#888',
    fontSize: 12,
  },
  locationSpots: {
    color: '#2e7d32',
    fontSize: 12,
    marginTop: 2,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: '#2e7d32',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2e7d32',
  },
  nextButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownArrow: {
    color: '#888',
    fontSize: 12,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectorBtn: {
    padding: 10,
  },
  selectorBtnText: {
    color: '#2e7d32',
    fontSize: 18,
  },
  selectorValue: {
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  photoPlaceholder: {
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoText: {
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  backBtn: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    color: '#888',
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  summaryEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  summaryTreeName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#222',
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  rewardInfoCard: {
    backgroundColor: '#1b5e20',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  rewardInfoText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  plantBtn: {
    marginTop: 0,
    paddingVertical: 20,
    elevation: 4,
  },
  videoReviewInfo: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  videoReviewText: {
    color: '#888888',
    fontSize: 12,
    textAlign: 'center',
  },
});
