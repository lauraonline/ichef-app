# Contexto do Projeto: iChef

## 1. Visão Geral

O **iChef** é um aplicativo mobile de receitas culinárias. Seu objetivo é democratizar o conhecimento gastronômico, atendendo desde leigos até cozinheiros experientes. A interface foca em ser acolhedora, prática, objetiva e com alta acessibilidade para pessoas com pouca familiaridade tecnológica (ex: fontes legíveis, ícones com rótulos, contraste adequado).
**Atenção:** O projeto é um **protótipo front-end**. Não há backend real. Todos os dados devem ser mockados (fictícios).

## 2. Stack Tecnológica

- **Framework:** React Native com Expo (Template Blank).
- **Navegação:** React Navigation (`native-stack` e `bottom-tabs`).
- **Ícones:** `@expo/vector-icons` (Família exclusiva: `MaterialCommunityIcons`).
- **Tipografia:** `@expo-google-fonts` (Lora e Nunito).

## 3. Design System (Guia de Cores e Fontes)

O aplicativo possui um guia estrito de cores para manter o tom acolhedor:

- **Cor Primária:** Terracota (`#C15B2A`) -> Usado em destaques, botões principais e links ativos.
- **Primária Clara:** (`#E8935E`)
- **Cor Secundária:** Bege Quente (`#F5E6C8`) -> Usado em fundos de cabeçalhos (Headers) e pílulas (tags).
- **Fundo Padrão:** Creme (`#FDF8F2`) -> Fundo principal de todas as telas (SafeAreaView).
- **Texto Principal:** Carvão (`#2C2C2A`) -> Textos comuns.
- **Texto Secundário:** Grafite (`#5F5E5A`) -> Textos de apoio.
- **Borda de Input:** Cinza claro (`#B4B2A9`).
- **Fontes:**
  - Títulos/Destaques: `Lora_700Bold` ou `Lora_600SemiBold`.
  - Corpo de texto/Interface: `Nunito_400Regular`, `Nunito_500Medium`, `Nunito_700Bold`.

## 4. Estrutura de Navegação (`src/navigation/AppNavigator.js`)

O App utiliza duas rotas principais:

1. **Stack de Autenticação/Global:** Começa no `LoginScreen`. O login redireciona (replace) para `MainTabs`.
2. **Bottom Tabs (`MainTabs`):**
   - `Home` (Início)
   - `Search` (Buscar)
   - `Lists` (Listas Salvas)
   - `MyRecipes` (Minhas Receitas)
3. **Telas Sobrepostas (Stack interna):**
   - `RecipeDetail` (Preview da receita)
   - `RecipeSteps` (Modo de preparo)

## 5. Componentes Reutilizáveis Atuais (`src/components/`)

- `Button.js`: Estilo 'pill' (borderRadius 24). Pode ter `variant="primary"` (preenchido Terracota) ou `variant="secondary"` (contornado Terracota).
- `Input.js`: Campo com borderRadius 12, que muda a borda para Terracota no estado de foco (`isFocused`).
- `Header.js`: Cabeçalho bege, sombra leve, título com tratamento de _overflow_ e suporte a botão condicional de voltar.
- `RecipeCard.js`: Possui prop `layout`. Se `layout="vertical"`, exibe card de carrossel (apenas foto). Se `layout="horizontal"`, exibe lista de receitas (usado nas "Minhas Receitas").
- `SearchBar.js`: Barra de pesquisa em formato "pill" com ícones de lupa e filtro.

## 6. Funcionalidades de UX Específicas

Ao desenvolver novas telas ou interações para este projeto, mantenha estas regras:

- **Temporizador Interativo:** Na tela `RecipeSteps`, passos de tempo possuem um timer integrado (Play/Pause/Reset). A contagem é controlada via estado do React e `setInterval`.
- **Checkboxes (Modo de Preparo):** Clicar em um passo da receita altera o ícone para checked e adiciona um `textDecorationLine: 'line-through'` ao texto.
