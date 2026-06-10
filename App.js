import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Importando os hooks e as fontes exigidas no PDF
import { 
  useFonts, 
  Lora_600SemiBold, 
  Lora_700Bold 
} from '@expo-google-fonts/lora';
import { 
  Nunito_400Regular, 
  Nunito_500Medium, 
  Nunito_700Bold 
} from '@expo-google-fonts/nunito';

export default function App() {
  // Carregando as fontes
  let [fontsLoaded] = useFonts({
    Lora_600SemiBold,
    Lora_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  // Enquanto as fontes não carregam, mostramos um ícone de carregamento
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C15B2A" />
      </View>
    );
  }

  // Se carregou, mostramos a tela de sucesso
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>iChef</Text>
      <Text style={styles.texto}>Fase 1: Configuração Inicial concluída!</Text>
      <Text style={styles.texto}>As fontes Lora e Nunito estão funcionando.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F2', // Cor Neutro claro (fundo) do PDF
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontFamily: 'Lora_700Bold', // Testando a fonte de título
    fontSize: 32,
    color: '#C15B2A', // Cor primária (Terracota)
    marginBottom: 10,
  },
  texto: {
    fontFamily: 'Nunito_400Regular', // Testando a fonte de corpo
    fontSize: 16,
    color: '#2C2C2A', // Cor neutro escuro (Carvão)
    textAlign: 'center',
    marginBottom: 5,
  },
});