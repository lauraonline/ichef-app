import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
export default function ListsScreen() {
    return (
        <View style={{flex: 1, backgroundColor: '#FDF8F2'}}>
        <Header titulo="Listas Salvas" showBackButton={false} />
        <Text style={{padding: 20}}>Conteúdo das Listas</Text>
        </View>
    );
}