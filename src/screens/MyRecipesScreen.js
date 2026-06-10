// src/screens/MyRecipesScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';


export default function MyRecipesScreen() {
  const minhasReceitas = [
    { id: '1', titulo: 'Pato no tucupi', img: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/BrunaBrandao_Pato_no_Tucupi_Belem_PA_%2826185651117%29.jpg' },
    { id: '2', titulo: 'Bolo de Rolo', img: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=400' },
    { id: '3', titulo: 'Moqueca Paraense', img: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho Bege conforme guia */}
      <Header titulo="Minhas receitas" />
      
      <View style={styles.content}>
        {/* Barra de Pesquisa Estilizada (Pill) */}
        <SearchBar placeholder="Pesquisar minhas receitas" />


        {/* Botão Adicionar (Usando cor Primária Terracota) */}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="plus-circle" size={28} color={colors.primaria} />
          <Text style={styles.addButtonText}>Adicionar receita</Text>
        </TouchableOpacity>

        {/* Lista de Receitas sobre o fundo Creme */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
          {minhasReceitas.map(item => (
            <RecipeCard 
              key={item.id} 
              titulo={item.titulo} 
              imagem={item.img} 
              layout="horizontal"
              onDeletar={() => alert('Deseja excluir ' + item.titulo + '?')}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.fundo // Creme (#FDF8F2)
  },
  content: { 
    padding: 20, 
    flex: 1 
  },
  searchBar: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.bordaInput,
    borderRadius: 25, // Pill shape
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchPlaceholder: { 
    fontFamily: fonts.corpo, 
    fontSize: 16, 
    color: colors.bordaInput 
  },
  searchIcons: { 
    flexDirection: 'row', 
    gap: 12 
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  addButtonText: { 
    color: colors.primaria, // Terracota
    fontSize: 18, 
    fontFamily: fonts.interface, // Nunito Medium
    fontWeight: 'bold'
  },
  listContainer: {
    paddingBottom: 20,
  }
});