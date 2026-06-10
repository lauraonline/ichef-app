import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
export default function SearchScreen() {
    return (
        <View style={{flex: 1, backgroundColor: '#FDF8F2'}}>
        <Header titulo="Buscar" showBackButton={false} />
        <Text style={{padding: 20}}>Conteúdo de Busca</Text>
        </View>
    );
}