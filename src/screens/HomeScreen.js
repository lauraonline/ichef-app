// src/screens/HomeScreen.js
// ... manter os imports e as listas de receitas do passo anterior ...

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header titulo="Tela inicial" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.saudacao}>Bom dia, Fulano</Text>

          <Text style={styles.secaoTitulo}>Café da manhã</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {receitasCafe.map(item => (
              <RecipeCard key={item.id} imagem={item.img} layout="vertical" />
            ))}
          </ScrollView>

          <Text style={styles.secaoTitulo}>Doces e quitutes</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {receitasDoces.map(item => (
              <RecipeCard key={item.id} imagem={item.img} layout="vertical" />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#777' }, // Cor cinza do wireframe
  content: { padding: 20 },
  saudacao: { fontFamily: fonts.titulo, fontSize: 32, color: '#FFF', marginBottom: 20, fontWeight: 'bold' },
  secaoTitulo: { fontFamily: fonts.corpo, fontSize: 18, color: '#FFF', marginBottom: 10, marginTop: 10 },
});