import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { colors } from './theme';
import { AuthContextProvider } from './AuthContext';
import { FirebaseContextProvider } from './FirebaseData';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <FirebaseContextProvider>
          <StatusBar style='auto' />
          <StackNavigator />
        </FirebaseContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
