import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
export default function HomeScreen() {
    return (
        <View style={{flex: 1, backgroundColor: '#FDF8F2'}}>
        <Header titulo="Tela Inicial" showBackButton={false} />
        <Text style={{padding: 20}}>Conteúdo da Home</Text>
        </View>
    );
}