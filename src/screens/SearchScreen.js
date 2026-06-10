// src/screens/SearchScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const categorias = [
  { id: '1', nome: 'Doces', cor: '#C15B2A' }, // Terracota
  { id: '2', nome: 'Salgados', cor: '#E8935E' }, 
  { id: '3', nome: 'Vegano', cor: '#639922' }, // Verde
  { id: '4', nome: 'Proteico', cor: '#185FA5' }, // Azul
  { id: '5', nome: 'Saudável', cor: '#BA7517' }, // Âmbar
];

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Buscar" />
      
      <View style={styles.content}>
        {/* Barra de Busca com Filtro e Lupa */}
        <SearchBar 
            onFilterPress={() => alert('Abrir filtros')} 
            onSearchPress={() => alert('Ativar teclado')} 
        />

        <Text style={styles.secaoTitulo}>Categorias</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {categorias.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoriaItem}>
              <View style={[styles.marcador, { backgroundColor: item.cor }]} />
              <Text style={styles.categoriaNome}>{item.nome}</Text>
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
  searchBar: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: colors.bordaInput,
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchPlaceholder: { fontFamily: fonts.corpo, fontSize: 16, color: colors.bordaInput },
  searchIcons: { flexDirection: 'row', gap: 12 },
  secaoTitulo: {
    fontFamily: fonts.titulo,
    fontSize: 22,
    color: colors.texto,
    marginBottom: 20,
  },
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  marcador: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 15,
  },
  categoriaNome: {
    flex: 1,
    fontFamily: fonts.interface,
    fontSize: 18,
    color: colors.texto,
  },
});