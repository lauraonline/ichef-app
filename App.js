// App.js
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useFonts, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';

import { colors, fonts } from './src/theme/theme';
import Button from './src/components/Button';
import Input from './src/components/Input';
import Header from './src/components/Header'; // Importando nosso novo Header

export default function App() {
  let [fontsLoaded] = useFonts({
    Lora_600SemiBold, Lora_700Bold,
    Nunito_400Regular, Nunito_500Medium, Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#C15B2A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Aqui está o nosso novo cabeçalho! */}
<Header 
  titulo="iChef" 
  showBackButton={false} 
  onBackPress={() => alert('Voltou!')}
/>

      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.boasVindas}>Seja bem-vindo</Text>
          
          <Input placeholder="Nome de usuário" />
          <Input placeholder="Senha" secureTextEntry={true} />
          
          <Button 
            titulo="Entrar" 
            onPress={() => alert('Logando...')} 
          />
          
          {/* Links textuais alinhados à esquerda como no wireframe */}
          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => alert('Ir para cadastro')}>
              <Text style={styles.linkText}>Cadastrar-se</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => alert('Esqueci a senha')}>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  loaderContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.fundo,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Centraliza o formulário na tela verticalmente
    padding: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Limite para ficar bonito na web
  },
  boasVindas: {
    fontFamily: fonts.titulo,
    fontSize: 24,
    color: colors.texto,
    marginBottom: 24,
    textAlign: 'left', // Alinhado à esquerda como no wireframe
  },
  linksContainer: {
    marginTop: 8,
    alignItems: 'flex-start', // Alinha os links à esquerda
    gap: 16, // Dá um pequeno espaço entre os links
  },
  linkText: {
    fontFamily: fonts.interface,
    fontSize: 16,
    color: colors.textoSecundario,
    textDecorationLine: 'underline', // Sublinhado conforme o wireframe
  }
});