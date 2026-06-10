// App.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { NavigationContainer } from '@react-navigation/native'; // Manda na navegação

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  let [fontsLoaded] = useFonts({
    Lora_600SemiBold, Lora_700Bold,
    Nunito_400Regular, Nunito_500Medium, Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF8F2' }}>
        <ActivityIndicator size="large" color="#C15B2A" />
      </View>
    );
  }

  return (
    // Engloba todo o app e ativa as rotas
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}