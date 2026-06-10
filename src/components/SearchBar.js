// src/components/SearchBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';

export default function SearchBar({ placeholder = "Pesquisar", onFilterPress, onSearchPress }) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8} 
      onPress={onSearchPress}
    >
      <Text style={styles.placeholder}>{placeholder}</Text>
      
      <View style={styles.iconContainer}>
        {/* Botão de Filtro */}
        <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color={colors.texto} />
        </TouchableOpacity>
        
        {/* Ícone de Lupa */}
        <View style={styles.iconButton}>
          <MaterialCommunityIcons name="magnify" size={24} color={colors.texto} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF', // Branco para contraste no fundo creme
    borderWidth: 1,
    borderColor: colors.bordaInput,
    borderRadius: 25, // Formato "pill" do wireframe
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 20,
    // Sombra leve para profundidade
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  placeholder: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    color: colors.bordaInput,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 2,
  }
});