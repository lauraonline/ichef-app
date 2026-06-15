import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';

const mockComments = [
  {
    id: 1,
    name: 'Alane Silva',
    rating: 4,
    timeAgo: 'há 3 dias',
    comment: 'Uma colher de manteiga é demais, eu botei meia colher e ficou melhor.',
  },
  {
    id: 2,
    name: 'Roberto Carlos',
    rating: 5,
    timeAgo: 'há 6 dias',
    comment: 'FIZ PRA MINHA MULHER E FILHA E ELAS GOSTARAM BASTANTE E COMERAM TUDO',
  },
];

export default function RatingsScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    // Ação fictícia para enviar avaliação
    alert('Avaliação enviada com sucesso!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Avaliar Receita" showBackButton={true} onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Como ficou a sua receita?</Text>
        <Text style={styles.subtitle}>Sua opinião ajuda outros cozinheiros do iChef.</Text>
        
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity 
              key={star} 
              onPress={() => setRating(star)} 
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons 
                name={rating >= star ? "star" : "star-outline"} 
                size={48} 
                color={rating >= star ? colors.primaria : colors.bordaInput} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Deixe um comentário (Opcional)</Text>
        <Input 
          placeholder="Conte-nos o que achou da receita..."
          value={comment}
          onChangeText={setComment}
          multiline={true}
          numberOfLines={4}
        />

        <Button 
          titulo="Enviar Avaliação" 
          onPress={handleSubmit} 
          style={styles.submitButton}
        />

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentários de outros usuários</Text>

          {mockComments.map((item) => (
            <View key={item.id} style={styles.commentCard}>
              <Text style={styles.commentName}>{item.name}</Text>

              <View style={styles.commentMetaRow}>
                <View style={styles.commentStarsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialCommunityIcons
                      key={star}
                      name={star <= item.rating ? 'star' : 'star-outline'}
                      size={14}
                      color={colors.primaria}
                    />
                  ))}
                </View>
                <Text style={styles.commentTime}>• {item.timeAgo}</Text>
              </View>

              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.titulo,
    fontSize: 24,
    color: colors.texto,
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    color: colors.textoSecundario,
    marginBottom: 32,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  label: {
    fontFamily: fonts.subtitulo,
    fontSize: 16,
    color: colors.texto,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 24,
  },
  commentsSection: {
    width: '100%',
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E0D6',
  },
  commentsTitle: {
    fontFamily: fonts.subtitulo,
    fontSize: 18,
    color: colors.texto,
    marginBottom: 16,
  },
  commentCard: {
    width: '100%',
    backgroundColor: colors.secundaria,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  commentName: {
    fontFamily: fonts.interface,
    fontSize: 16,
    color: colors.texto,
    marginBottom: 4,
  },
  commentMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  commentStarsRow: {
    flexDirection: 'row',
    marginRight: 6,
  },
  commentTime: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    color: colors.textoSecundario,
  },
  commentText: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    color: colors.texto,
    lineHeight: 22,
  },
});
