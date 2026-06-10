// src/components/RecipeCard.js
import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';

export default function RecipeCard({ titulo, imagem, onPress, onDeletar, layout = 'vertical' }) {
  if (layout === 'vertical') {
    return (
      <TouchableOpacity style={styles.cardVertical} onPress={onPress} activeOpacity={0.9}>
        <Image source={{ uri: imagem }} style={styles.imageVertical} />
      </TouchableOpacity>
    );
  }

  // Layout Horizontal (para a tela de Minhas Receitas)
  return (
    <View style={styles.cardHorizontal}>
      <TouchableOpacity style={styles.contentHorizontal} onPress={onPress}>
        <Image source={{ uri: imagem }} style={styles.imageHorizontal} />
        <Text style={styles.tituloHorizontal} numberOfLines={1}>{titulo}</Text>
      </TouchableOpacity>
      
      {onDeletar && (
        <TouchableOpacity onPress={onDeletar} style={styles.deleteButton}>
          <MaterialCommunityIcons name="delete-outline" size={24} color={colors.textoSecundario} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos Vertical (Home)
  cardVertical: {
    width: 110, // Mais estreito e alto conforme o wireframe
    height: 150,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  imageVertical: {
    width: '100%',
    height: '100%',
  },

  // Estilos Horizontal (Minhas Receitas)
  cardHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Cards brancos para destacar sobre o fundo creme
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    // Sombra leve
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  contentHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  imageHorizontal: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.secundaria,
  },
  tituloHorizontal: {
    flex: 1,
    marginLeft: 12,
    fontFamily: fonts.subtitulo, // Lora 600
    fontSize: 16,
    color: colors.texto, // Carvão
  },
  deleteButton: {
    padding: 8,
  }
});