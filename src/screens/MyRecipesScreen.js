import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
export default function MyRecipesScreen() {
    return (
        <View style={{flex: 1, backgroundColor: '#FDF8F2'}}>
        <Header titulo="Minhas Receitas" showBackButton={false} />
        <Text style={{padding: 20}}>Minhas Receitas Personalizadas</Text>
        </View>
    );
}