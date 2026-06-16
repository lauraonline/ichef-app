// src/screens/ListRecipesScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const listRecipes = [
  {
    id: 'fs-1',
    titulo: 'Brigadeiro de panela',
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Brigadeiros.jpg',
  },
  {
    id: 'fs-2',
    titulo: 'Bolo de cenoura com cobertura',
    imagem: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
  },
  {
    id: 'fs-3',
    titulo: 'Pudim de leite condensado',
    imagem: 'https://images.unsplash.com/photo-1525643212270-99cc4c7c53d8?w=400',
  },
  {
    id: 'fs-4',
    titulo: 'Brownie caseiro',
    imagem: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400',
  },
  {
    id: 'fs-5',
    titulo: 'Torta de limão',
    imagem: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
  },
];

export default function ListRecipesScreen({ navigation, route }) {
  const title = route?.params?.title ?? 'Receitas';
  const selectedRecipeTitle = route?.params?.selectedRecipeTitle;
  const fromSaveFlow = route?.params?.fromSaveFlow;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (fromSaveFlow) {
          navigation.navigate('MainTabs', { screen: 'Home' });
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [fromSaveFlow, navigation])
  );

  const handleBackPress = () => {
    if (fromSaveFlow) {
      navigation.navigate('MainTabs', { screen: 'Home' });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo={title} showBackButton={true} onBackPress={handleBackPress} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedRecipeTitle ? (
          <View style={styles.savedBanner}>
            <MaterialCommunityIcons name="check-circle" size={22} color={colors.primaria} />
            <Text style={styles.savedBannerText}>{selectedRecipeTitle} salvo nesta lista.</Text>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Receitas da lista</Text>

        {listRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            titulo={recipe.titulo}
            imagem={recipe.imagem}
            layout="horizontal"
            onPress={() => navigation.navigate('RecipeDetail')}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo },
  content: { paddingHorizontal: 20, paddingTop: 16 },
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.secundaria,
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
  },
  savedBannerText: {
    flex: 1,
    fontFamily: fonts.interface,
    fontSize: 15,
    color: colors.texto,
  },
  sectionTitle: {
    fontFamily: fonts.titulo,
    fontSize: 22,
    color: colors.texto,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    color: colors.textoSecundario,
    marginBottom: 16,
  },
});
