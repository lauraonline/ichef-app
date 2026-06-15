// src/screens/SearchScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
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

const filtroOptions = [
  'Zero lactose',
  'Sem glúten',
  'Nova tag...',
];

const brigadeiroResult = {
  id: 'brigadeiro-panela',
  titulo: 'Brigadeiro de panela',
  imagem: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400',
};

export default function SearchScreen({ navigation }) {
  const [showResult, setShowResult] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [tempoFiltro, setTempoFiltro] = useState(1);
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState(1);

  const hasActiveFilter = selectedFilters.length > 0;

  const activeResult = useMemo(() => {
    if (showResult || hasActiveFilter || searchText.trim().length > 0) {
      return brigadeiroResult;
    }

    return null;
  }, [showResult, hasActiveFilter, searchText]);

  const toggleFilter = (label) => {
    setSelectedFilters((prev) => (
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    ));
  };

  const handleSearchPress = () => {
    setShowResult(true);
  };

  const handleCategoryPress = (categoriaNome) => {
    if (categoriaNome === 'Doces') {
      setShowResult(true);
    }
  };

  const selectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (difficulty === 'Fácil') {
      setDificuldadeFiltro(0);
    }
  };

  const handleApplyFilters = () => {
    setFiltersVisible(false);
    setShowResult(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Buscar" />
      
      <View style={styles.content}>
        {/* Barra de Busca com Filtro e Lupa */}
        <SearchBar 
          placeholder={showResult || hasActiveFilter || searchText ? 'Brigadeiro' : 'Pesquisar'}
          value={searchText}
          onChangeText={setSearchText}
            onFilterPress={() => setFiltersVisible(true)} 
            onSearchPress={handleSearchPress} 
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeResult ? (
            <>
              <Text style={styles.resultadoTitulo}>Resultado encontrado</Text>

              <TouchableOpacity
                style={styles.resultCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('RecipeDetail')}
              >
                <View style={styles.resultImageWrap}>
                  <Image source={{ uri: activeResult.imagem }} style={styles.resultImage} />
                </View>
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle}>{activeResult.titulo}</Text>
                  <Text style={styles.resultSubtitle}>{activeResult.subtitulo}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={() => setShowResult(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryActionText}>Ver categorias novamente</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.secaoTitulo}>Categorias</Text>

              {categorias.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoriaItem}
                  activeOpacity={0.8}
                  onPress={() => handleCategoryPress(item.nome)}
                >
                  <View style={[styles.marcador, { backgroundColor: item.cor }]} />
                  <Text style={styles.categoriaNome}>{item.nome}</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={colors.bordaInput} />
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>

      <Modal transparent visible={filtersVisible} animationType="slide" onRequestClose={() => setFiltersVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setFiltersVisible(false)}>
                <MaterialCommunityIcons name="close" size={28} color={colors.texto} />
              </TouchableOpacity>
            </View>

            <Text style={styles.filterSectionLabel}>Tempo de preparo</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderThumb, { left: `${tempoFiltro * 45}%` }]} />
            </View>
            <View style={styles.sliderLabelsRow}>
              <Text style={styles.sliderLabel}>15 min</Text>
              <Text style={styles.sliderLabel}>45-60 min</Text>
              <Text style={styles.sliderLabel}>2h+</Text>
            </View>

            <Text style={[styles.filterSectionLabel, { marginTop: 12 }]}>Dificuldade</Text>
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderThumb, { left: `${dificuldadeFiltro * 45}%` }]} />
            </View>
            <View style={styles.sliderLabelsRow}>
              <TouchableOpacity onPress={() => selectDifficulty('Fácil')} activeOpacity={0.7}>
                <Text style={[styles.sliderLabel, selectedDifficulty === 'Fácil' && styles.sliderLabelSelected]}>Fácil</Text>
              </TouchableOpacity>
              <Text style={styles.sliderLabel}>Médio</Text>
              <Text style={styles.sliderLabel}>Difícil</Text>
            </View>

            <View style={styles.tagsPanel}>
              <Text style={styles.tagsPanelLabel}>Tags (categorias)</Text>
            <View style={styles.filterTagsRow}>
              {filtroOptions.map((label) => {
                const selected = selectedFilters.includes(label);

                return (
                  <TouchableOpacity
                    key={label}
                    onPress={() => toggleFilter(label)}
                    style={[styles.filterChip, selected && styles.filterChipSelected]}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.filterChipText, selected && styles.filterChipTextSelected]}>{label}</Text>
                    <MaterialCommunityIcons
                      name={selected ? 'check' : 'plus'}
                      size={18}
                      color={selected ? colors.fundo : colors.texto}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            </View>

            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters} activeOpacity={0.85}>
              <Text style={styles.applyButtonText}>Aplicar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.fundo },
  content: { padding: 20, flex: 1 },
  secaoTitulo: {
    fontFamily: fonts.titulo,
    fontSize: 22,
    color: colors.texto,
    marginBottom: 20,
  },
  resultadoTitulo: {
    fontFamily: fonts.subtitulo,
    fontSize: 20,
    color: colors.texto,
    marginBottom: 14,
    marginTop: 4,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  resultImageWrap: {
    width: 120,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
  },
  resultImage: {
    flex: 1,
  },
  resultContent: {
    flex: 1,
    justifyContent: 'center',
  },
  resultTitle: {
    fontFamily: fonts.subtitulo,
    fontSize: 18,
    color: colors.texto,
    marginBottom: 4,
  },
  resultSubtitle: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    color: colors.textoSecundario,
    lineHeight: 20,
  },
  secondaryAction: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primaria,
  },
  secondaryActionText: {
    fontFamily: fonts.interface,
    fontSize: 14,
    color: colors.primaria,
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
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(44, 44, 42, 0.35)',
  },
  filterSheet: {
    backgroundColor: colors.fundo,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterTitle: {
    fontFamily: fonts.titulo,
    fontSize: 22,
    color: colors.texto,
  },
  filterSectionLabel: {
    fontFamily: fonts.subtitulo,
    fontSize: 20,
    color: colors.texto,
    marginBottom: 12,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#000',
    marginBottom: 8,
    position: 'relative',
    justifyContent: 'center',
  },
  sliderThumb: {
    position: 'absolute',
    top: -7,
    width: 14,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#3C3C3A',
  },
  sliderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sliderLabel: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    color: colors.texto,
  },
  sliderLabelSelected: {
    color: colors.primaria,
    fontFamily: fonts.interface,
    fontWeight: 'bold',
  },
  tagsPanel: {
    backgroundColor: '#D9D7D5',
    borderRadius: 18,
    padding: 12,
    marginTop: 12,
    marginBottom: 14,
  },
  tagsPanelLabel: {
    fontFamily: fonts.subtitulo,
    fontSize: 16,
    color: colors.textoSecundario,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  filterTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  filterChipSelected: {
    backgroundColor: colors.primaria,
  },
  filterChipText: {
    fontFamily: fonts.interface,
    color: colors.texto,
    fontSize: 14,
  },
  filterChipTextSelected: {
    color: colors.fundo,
  },
  applyButton: {
    backgroundColor: colors.primaria,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: fonts.interface,
    fontSize: 16,
    color: colors.fundo,
    fontWeight: 'bold',
  },
});