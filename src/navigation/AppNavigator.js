// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../theme/theme';

// Importando as Telas
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ListsScreen from '../screens/ListsScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente das Abas Inferiores
function TabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false, // Esconde o cabeçalho padrão (vamos usar o nosso)
            tabBarActiveTintColor: colors.primaria, // Cor do ícone ativo (Terracota)
            tabBarInactiveTintColor: colors.textoSecundario, // Cor inativo (Grafite)
            tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
            height: 60,
            paddingBottom: 8, // Ajuste para ficar bonito
            },
            tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Search') iconName = 'magnify';
            else if (route.name === 'Lists') iconName = 'bookmark-outline';
            else if (route.name === 'MyRecipes') iconName = 'heart-outline';
            
            return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
            },
        })}
        >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Buscar' }} />
        <Tab.Screen name="Lists" component={ListsScreen} options={{ tabBarLabel: 'Listas' }} />
        <Tab.Screen name="MyRecipes" component={MyRecipesScreen} options={{ tabBarLabel: 'Minhas Receitas' }} />
        </Tab.Navigator>
    );
}

// Navegação Principal (Pilha)
export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 1. O app começa no Login */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* 2. Após logar, vai para as abas (MainTabs) */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        </Stack.Navigator>
    );
}