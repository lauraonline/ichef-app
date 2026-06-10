// src/screens/RecipeStepsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';

const TEMPO_INICIAL = 420;

const ingredientes = [
  "1 caixa (395g) de leite condensado",
  "3 colheres (sopa) de nescau",
  "1 colher (sopa) de manteiga"
];

const passos = [
  { id: 0, texto: "Em uma panela média, misture todos os ingredientes." },
  { id: 1, texto: "Leve ao fogo médio-baixo, sempre mexendo com uma espátula ou colher, por 7-10 minutos ou até desgrudar do fundo da panela.", hasTimer: true, timerDuration: 420 }, // 420s = 7 minutos
];

export default function RecipeStepsScreen({ navigation }) {
  // Estado para controlar quais passos estão marcados (checkbox)
  const [checkedSteps, setCheckedSteps] = useState({});
  
  // Estados para o temporizador
  const [timeLeft, setTimeLeft] = useState(TEMPO_INICIAL); // 7 minutos em segundos
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Função de alternar o checkbox
  const toggleStep = (id) => {
    setCheckedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Lógica do temporizador (Executa a cada 1 segundo se estiver rodando)
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      alert('O tempo da sua receita acabou!');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

const resetTimer = () => {
    setIsTimerRunning(false); // Para o tempo
    setTimeLeft(TEMPO_INICIAL); // Volta para o valor original
};

  // Função para formatar segundos em MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Brigadeiro de panela" showBackButton={true} onBackPress={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Seção de Ingredientes */}
        <Text style={styles.sectionTitle}>Ingredientes</Text>
        <View style={styles.listContainer}>
          {ingredientes.map((item, index) => (
            <View key={index} style={styles.bulletItem}>
              <View style={styles.bullet} />
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Seção de Modo de Preparo */}
        <Text style={styles.sectionTitle}>Modo de preparo</Text>
        <View style={styles.listContainer}>
          {passos.map((passo) => {
            const isChecked = checkedSteps[passo.id];
            return (
              <View key={passo.id} style={styles.stepContainer}>
                {/* Checkbox interativo */}
                <TouchableOpacity style={styles.stepTouch} onPress={() => toggleStep(passo.id)} activeOpacity={0.7}>
                  <MaterialCommunityIcons 
                    name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"} 
                    size={28} 
                    color={isChecked ? colors.primaria : colors.bordaInput} 
                  />
                  <Text style={[styles.stepText, isChecked && styles.stepTextChecked]}>
                    {passo.texto}
                  </Text>
                </TouchableOpacity>

                {/* Temporizador Integrado (Só aparece se o passo tiver a prop hasTimer) */}
                {passo.hasTimer && (
                  <View style={styles.timerRow}>
                    {/* Botão Play/Pause */}
                    <TouchableOpacity style={styles.timerButton} onPress={toggleTimer}>
                      <MaterialCommunityIcons 
                        name={isTimerRunning ? "pause" : "play"} 
                        size={24} 
                        color={colors.texto} 
                      />
                      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                    </TouchableOpacity>

                    {/* NOVO: Botão de Reiniciar (Reset) */}
                    <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
                      <MaterialCommunityIcons name="refresh" size={24} color={colors.textoSecundario} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Seção de Avaliações */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          <View style={styles.starsRow}>
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star" size={24} color={colors.primaria} />
            <MaterialCommunityIcons name="star-half-full" size={24} color={colors.primaria} />
            <Text style={styles.reviewScore}> 4.7 <Text style={styles.reviewCount}>(49 avaliações)</Text></Text>
          </View>
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
  bulletText: { fontFamily: fonts.corpo, fontSize: 16, color: colors.texto, lineHeight: 24 },
  
  stepContainer: { marginBottom: 20 },
  stepTouch: { flexDirection: 'row', alignItems: 'flex-start', paddingRight: 20 },
  stepText: { fontFamily: fonts.corpo, fontSize: 16, color: colors.texto, marginLeft: 12, lineHeight: 24, flex: 1 },
  stepTextChecked: { color: colors.textoSecundario, textDecorationLine: 'line-through' },
  
  timerContainer: { marginLeft: 40, marginTop: 12 },
  timerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 40, 
    marginTop: 12,
    gap: 12 // Espaço entre o timer e o botão reset
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  resetButton: {
    backgroundColor: '#F0F0F0',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: { fontFamily: fonts.interface, fontSize: 16, color: colors.texto, fontWeight: 'bold' },

  reviewSection: { marginTop: 10, marginBottom: 40 },
  starsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  reviewScore: { fontFamily: fonts.interface, fontSize: 16, color: colors.texto, fontWeight: 'bold', marginLeft: 8 },
  reviewCount: { fontWeight: 'normal', color: colors.textoSecundario }
});