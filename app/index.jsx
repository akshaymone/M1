import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  return (
    <>
      <Redirect href="/login" />
      <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    </>
  );
}
