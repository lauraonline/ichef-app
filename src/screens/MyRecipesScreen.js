// src/screens/MyRecipesScreen.js
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

const receitasIniciais = [
  {
    id: '1',
    titulo: 'Pato no tucupi',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/BrunaBrandao_Pato_no_Tucupi_Belem_PA_%2826185651117%29.jpg',
  },
  {
    id: '2',
    titulo: 'Bolo de Rolo',
    img: 'https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?w=400',
  },
  {
    id: '3',
    titulo: 'Moqueca Paraense',
    img: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400',
  },
];

const filtroOptions = [
  'Zero lactose',
  'Sem glúten',
  'Nova tag...',
];

export default function MyRecipesScreen({ navigation }) {
  const [minhasReceitas, setMinhasReceitas] = useState(receitasIniciais);
  const [searchText, setSearchText] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [tempoFiltro, setTempoFiltro] = useState(1);
  const [dificuldadeFiltro, setDificuldadeFiltro] = useState(1);

  const patoRecipe = useMemo(() => {
    return minhasReceitas.find((item) => item.titulo === 'Pato no tucupi') || null;
  }, [minhasReceitas]);

  const hasSearchResult = searchTriggered || searchText.trim().length > 0 || selectedDifficulty === 'Difícil' || selectedFilters.length > 0;

  const handleDeleteRecipe = (id) => {
    setMinhasReceitas((current) => current.filter((item) => item.id !== id));
  };

  const handleRecipePress = (item) => {
    if (item.titulo === 'Pato no tucupi') {
      navigation.navigate('PatoRecipeDetail');
    }
  };

  const handleSearchPress = () => {
    setSearchTriggered(true);
  };

  const handleOpenFilters = () => {
    setFilterVisible(true);
  };

  const toggleFilter = (label) => {
    setSelectedFilters((prev) => (
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    ));
  };

  const handleApplyFilters = () => {
    setFilterVisible(false);
    setSelectedDifficulty('Difícil');
    setSearchTriggered(true);
  };

  const handleDifficultyPress = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (difficulty === 'Difícil') {
      setDificuldadeFiltro(2);
    }
    if (difficulty === 'Médio') {
      setDificuldadeFiltro(1);
    }
    if (difficulty === 'Fácil') {
      setDificuldadeFiltro(0);
    }
  };

  const resetSearch = () => {
    setSearchTriggered(false);
    setSearchText('');
    setSelectedDifficulty('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Minhas receitas" />

      <View style={styles.content}>
        <SearchBar
          placeholder={hasSearchResult ? 'Pato no tucupi' : 'Pesquisar minhas receitas'}
          value={searchText}
          onChangeText={setSearchText}
          onFilterPress={handleOpenFilters}
          onSearchPress={handleSearchPress}
        />

        {hasSearchResult ? (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
            <Text style={styles.resultTitle}>Resultado encontrado</Text>

            {patoRecipe ? (
              <TouchableOpacity
                style={styles.resultCard}
                activeOpacity={0.85}
                onPress={() => handleRecipePress(patoRecipe)}
              >
                <Image source={{ uri: patoRecipe.img }} style={styles.resultImage} />
                <View style={styles.resultContent}>
                  <Text style={styles.resultName}>{patoRecipe.titulo}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>
            )}

            <TouchableOpacity style={styles.secondaryAction} activeOpacity={0.8} onPress={resetSearch}>
              <Text style={styles.secondaryActionText}>Ver minhas receitas novamente</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <>
            <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
              <MaterialCommunityIcons name="plus-circle" size={28} color={colors.primaria} />
              <Text style={styles.addButtonText}>Adicionar receita</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
              {minhasReceitas.map((item) => (
                <RecipeCard
                  key={item.id}
                  titulo={item.titulo}
                  imagem={item.img}
                  layout="horizontal"
                  onPress={() => handleRecipePress(item)}
                  onDeletar={() => handleDeleteRecipe(item.id)}
                />
              ))}
            </ScrollView>
          </>
        )}
      </View>

      <Modal transparent visible={filterVisible} animationType="slide" onRequestClose={() => setFilterVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.filterSheet}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filtros</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
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
              <TouchableOpacity onPress={() => handleDifficultyPress('Fácil')} activeOpacity={0.7}>
                <Text style={[styles.sliderLabel, selectedDifficulty === 'Fácil' && styles.sliderLabelSelected]}>Fácil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDifficultyPress('Médio')} activeOpacity={0.7}>
                <Text style={[styles.sliderLabel, selectedDifficulty === 'Médio' && styles.sliderLabelSelected]}>Médio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDifficultyPress('Difícil')} activeOpacity={0.7}>
                <Text style={[styles.sliderLabel, selectedDifficulty === 'Difícil' && styles.sliderLabelSelected]}>Difícil</Text>
              </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: colors.fundo,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 10,
  },
  addButtonText: {
    color: colors.primaria,
    fontSize: 18,
    fontFamily: fonts.interface,
    fontWeight: 'bold',
  },
  resultTitle: {
    fontFamily: fonts.titulo,
    fontSize: 22,
    color: colors.texto,
    marginBottom: 14,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  resultImage: {
    width: 110,
    height: 88,
    backgroundColor: colors.secundaria,
  },
  resultContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  resultName: {
    fontFamily: fonts.subtitulo,
    fontSize: 18,
    color: colors.texto,
    marginBottom: 4,
  },
  resultMeta: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    color: colors.textoSecundario,
  },
  emptyText: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    color: colors.textoSecundario,
    marginBottom: 16,
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
    marginBottom: 16,
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
    marginBottom: 10,
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
