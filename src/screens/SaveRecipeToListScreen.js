// src/screens/SaveRecipeToListScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';

const listasUsuario = [
  { id: '1', nome: 'Receitas zero lactose', quantidade: 5 },
  { id: '2', nome: 'Favoritos da semana', quantidade: 12 },
  { id: '3', nome: 'Jantar romântico', quantidade: 3 },
  { id: '4', nome: 'Receitas de Natal', quantidade: 8 },
  { id: '5', nome: 'Smoothies saudáveis', quantidade: 6 },
];

export default function SaveRecipeToListScreen({ navigation, route }) {
  const recipeTitle = route?.params?.recipeTitle ?? 'Brigadeiro de panela';

  const handleListPress = (lista) => {
    navigation.navigate('ListRecipes', {
      title: lista.nome,
      selectedRecipeTitle: recipeTitle,
      fromSaveFlow: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Salvar receita" showBackButton={true} onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Escolha uma lista</Text>
        <Text style={styles.subtitle}>Selecione onde deseja salvar {recipeTitle}.</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
          {listasUsuario.map((lista) => (
            <TouchableOpacity
              key={lista.id}
              style={styles.listItem}
              activeOpacity={0.8}
              onPress={() => handleListPress(lista)}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="bookmark" size={24} color={colors.primaria} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.listName}>{lista.nome}</Text>
                <Text style={styles.listInfo}>{lista.quantidade} receitas</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={colors.bordaInput} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo },
  content: { padding: 20, flex: 1 },
  title: {
    fontFamily: fonts.titulo,
    fontSize: 24,
    color: colors.texto,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    color: colors.textoSecundario,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: colors.secundaria,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  listName: {
    fontFamily: fonts.subtitulo,
    fontSize: 17,
    color: colors.texto,
  },
  listInfo: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    color: colors.textoSecundario,
    marginTop: 2,
  },
});
