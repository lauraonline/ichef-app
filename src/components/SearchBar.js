// src/components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';

export default function SearchBar({ placeholder = 'Pesquisar', value, onChangeText, onFilterPress, onSearchPress }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.bordaInput}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onSearchPress}
      />
      
      <View style={styles.iconContainer}>
        {/* Botão de Filtro */}
        <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color={colors.texto} />
        </TouchableOpacity>
        
        {/* Ícone de Lupa */}
        <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
          <MaterialCommunityIcons name="magnify" size={24} color={colors.texto} />
        </TouchableOpacity>
      </View>
    </View>
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
  input: {
    flex: 1,
    fontFamily: fonts.corpo,
    fontSize: 16,
    color: colors.texto,
    paddingVertical: 0,
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