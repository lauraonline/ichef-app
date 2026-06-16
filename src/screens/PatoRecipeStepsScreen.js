// src/screens/PatoRecipeStepsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import Button from '../components/Button';

const ingredientes = [
  '1 pato inteiro em pedaços',
  '2 maços de tucupi',
  '1 maço de jambu',
  'Alho, sal e cheiro-verde a gosto',
];

const passos = [
  { id: 0, texto: 'Tempere o pato com alho, sal e os temperos de sua preferência.' },
  { id: 1, texto: 'Asse ou cozinhe o pato até que fique dourado e macio.' },
  { id: 2, texto: 'Ferva o tucupi separadamente e ajuste o sal com cuidado.' },
  { id: 3, texto: 'Cozinhe o jambu rapidamente em água quente para preservar a textura.' },
  { id: 4, texto: 'Monte o prato com o pato, o tucupi quente e finalize com o jambu.' },
];

export default function PatoRecipeStepsScreen({ navigation }) {
  const [checkedSteps, setCheckedSteps] = useState({});

  const toggleStep = (id) => {
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Pato no tucupi" showBackButton={true} onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <View style={styles.listContainer}>
          {ingredientes.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Modo de preparo</Text>
        <View style={styles.listContainer}>
          {passos.map((passo) => {
            const isChecked = checkedSteps[passo.id];

            return (
              <TouchableOpacity
                key={passo.id}
                style={styles.stepTouch}
                onPress={() => toggleStep(passo.id)}
                activeOpacity={0.75}
              >
                <MaterialCommunityIcons
                  name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={28}
                  color={isChecked ? colors.primaria : colors.bordaInput}
                />
                <Text style={[styles.stepText, isChecked && styles.stepTextChecked]}>
                  {passo.texto}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          <View style={styles.starsRow}>
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star-half-full" size={24} color={colors.primaria} />
            <Text style={styles.reviewScore}> 4.9 <Text style={styles.reviewCount}>(31 avaliações)</Text></Text>
          </View>
          <Button
            titulo="Avaliar e Comentar"
            variant="secondary"
            onPress={() => navigation.navigate('Ratings')}
            style={{ marginTop: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo },
  content: { padding: 20 },
  sectionTitle: {
    fontFamily: fonts.titulo,
    fontSize: 22,
    color: colors.texto,
    marginTop: 20,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 8,
  },
  listContainer: { marginBottom: 10 },
  bulletItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primaria, marginRight: 10 },
  bulletText: { fontFamily: fonts.corpo, fontSize: 16, color: colors.texto, lineHeight: 24, flex: 1 },
  stepTouch: { flexDirection: 'row', alignItems: 'flex-start', paddingRight: 20, marginBottom: 18 },
  stepText: { fontFamily: fonts.corpo, fontSize: 16, color: colors.texto, marginLeft: 12, lineHeight: 24, flex: 1 },
  stepTextChecked: { color: colors.textoSecundario, textDecorationLine: 'line-through' },
  reviewSection: { marginTop: 10, marginBottom: 40 },
  starsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  reviewScore: { fontFamily: fonts.interface, fontSize: 16, color: colors.texto, fontWeight: 'bold', marginLeft: 8 },
  reviewCount: { fontWeight: 'normal', color: colors.textoSecundario },
});
