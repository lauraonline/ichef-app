// src/screens/PatoRecipeDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import Button from '../components/Button';

export default function PatoRecipeDetailScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Pato no tucupi" showBackButton={true} onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/BrunaBrandao_Pato_no_Tucupi_Belem_PA_%2826185651117%29.jpg' }}
          style={styles.heroImage}
        />

        <View style={styles.content}>
          <Text style={styles.titulo}>Pato no tucupi</Text>
          <View style={styles.infoRow}>
            <View style={styles.rating}>
              <MaterialCommunityIcons name="star" size={20} color={colors.primaria} />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
            <View style={styles.time}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={colors.textoSecundario} />
              <Text style={styles.timeText}>1h 20 min</Text>
            </View>
          </View>

          <View style={styles.tagContainer}>
            <View style={styles.tag}><Text style={styles.tagText}>Difícil</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Tradicional</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Salgado</Text></View>
            <View style={styles.tag}><Text style={styles.tagText}>Especial</Text></View>
          </View>

          <Text style={styles.description}>
            Um prato marcante da culinária paraense, com sabores intensos e preparo cuidadoso.
          </Text>

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
              onPress={() => navigation.navigate('PatoRecipeSteps')}
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
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  tag: { backgroundColor: colors.secundaria, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontFamily: fonts.corpo, fontSize: 14, color: colors.texto },
  description: { fontFamily: fonts.corpo, fontSize: 16, color: colors.texto, lineHeight: 24, marginBottom: 24 },
  actionRow: { flexDirection: 'row', width: '100%' },
});
