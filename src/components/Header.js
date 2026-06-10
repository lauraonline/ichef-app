import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícones definidos na página 34
import { colors, fonts } from '../theme/theme';

export default function Header({ titulo, showBackButton, onBackPress }) {
  return (
    <View style={styles.container}>
      {/* Botão de voltar (só renderiza se showBackButton for true) */}
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={colors.texto} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} /> 
      )}
      
      {/* Título com tratamento para overflow */}
      <Text 
        style={styles.titulo} 
        numberOfLines={1}         // Limita a 1 linha
        ellipsizeMode="tail"      // Coloca "..." no final se vazar
      >
        {titulo}
      </Text>

      {/* View vazia para equilibrar o layout e manter o título no centro exato */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: colors.fundo, 
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5', // Borda sutil para separar do conteúdo
  },
  backButton: {
    padding: 4,
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.titulo,
    fontSize: 20,
    color: colors.texto,
  },
  placeholder: {
    width: 36, // Largura equivalente ao botão de voltar para centralizar perfeitamente o título
  }
});