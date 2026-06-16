// src/screens/RecipeDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import Button from '../components/Button';

export default function RecipeDetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Receita" showBackButton={true} onBackPress={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem de Destaque */}
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Brigadeiros.jpg' }} 
          style={styles.heroImage} 
        />

        <View style={styles.content}>
          {/* Título e Avaliação */}
          <Text style={styles.titulo}>Brigadeiro de panela</Text>
          <View style={styles.infoRow}>
            <View style={styles.rating}>
              <MaterialCommunityIcons name="star" size={20} color={colors.primaria} />
              <Text style={styles.ratingText}>4.7</Text>
            </View>
            <View style={styles.time}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={colors.textoSecundario} />
              <Text style={styles.timeText}>7-10 min</Text>
            </View>
          </View>

          {/* Tags (Pílulas) */}
          <View style={styles.tagContainer}>
            <View style={styles.tag}><Text style={styles.tagText}>Fácil</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Doce</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Baixo custo</Text></View>
          </View>

          <Text style={styles.description}>
            O brigadeiro de panela é uma versão prática e acolhedora do doce clássico, feita com poucos ingredientes e ideal para preparar em casa quando bate a vontade de algo doce.
          </Text>

          {/* Botões de Ação */}
          <View style={styles.actionRow}>
            <Button 
              titulo="Salvar" 
              variant="secondary" 
              style={{ flex: 1, marginRight: 8 }} 
              onPress={() => alert('Salvo nas listas!')} 
            />
            <Button 
              titulo="Fazer receita" 
              style={{ flex: 1.5 }} 
              onPress={() => navigation.navigate('RecipeSteps')} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo },
  heroImage: { width: '100%', height: 250 },
  content: { padding: 20 },
  titulo: { fontFamily: fonts.titulo, fontSize: 28, color: colors.texto, marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 16 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontFamily: fonts.corpo, fontSize: 16, color: colors.texto, fontWeight: 'bold' },
  time: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontFamily: fonts.corpo, fontSize: 16, color: colors.textoSecundario },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 30 },
  tag: { backgroundColor: colors.secundaria, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontFamily: fonts.corpo, fontSize: 14, color: colors.texto },
  description: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    color: colors.texto,
    lineHeight: 24,
    marginBottom: 24,
  },
  actionRow: { flexDirection: 'row', width: '100%' }
});