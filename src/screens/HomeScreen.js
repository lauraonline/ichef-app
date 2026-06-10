// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

// Dados falsos para o protótipo
const receitasCafe = [
    { id: '1', titulo: 'Pão de Queijo Mineiro', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400' },
    { id: '2', titulo: 'Panqueca Americana', img: 'https://images.unsplash.com/photo-1528207777348-27db2ee765e3?w=400' },
];

const receitasDoces = [
    { id: '3', titulo: 'Brigadeiro Gourmet', img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400' },
    { id: '4', titulo: 'Pudim de Leite', img: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=400' },
];

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Tela inicial" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.saudacao}>Bom dia, Fulano</Text>

          <Text style={styles.secaoTitulo}>Café da manhã</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {receitasCafe.map(item => (
              <RecipeCard key={item.id} imagem={item.img} layout="vertical" />
            ))}
          </ScrollView>

          <Text style={styles.secaoTitulo}>Doces e quitutes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {receitasDoces.map(item => (
  <RecipeCard 
    key={item.id} 
    imagem={item.img} 
    layout="vertical" 
    onPress={() => navigation.navigate('RecipeDetail')} // Adicione esta linha
  />
))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.fundo },
    content: { padding: 20 },
    saudacao: {
        fontFamily: fonts.titulo,
        fontSize: 24,
        color: colors.texto,
        marginBottom: 24,
    },
    secaoTitulo: {
        fontFamily: fonts.subtitulo,
        fontSize: 18,
        color: colors.texto,
        marginBottom: 12,
        marginTop: 8,
    },
    carrossel: {
        marginBottom: 24,
        paddingBottom: 8, // Espaço para a sombra não ser cortada
    }
});