// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/theme';

export default function Header({ titulo, showBackButton, onBackPress }) {
    return (
        <View style={styles.container}>
        {/* Botão de voltar (só existe se showBackButton for true) */}
        {showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={colors.texto} />
            </TouchableOpacity>
        )}
        
        {/* 
            O texto tem flex: 1. 
            Se o botão acima não existir, o texto ocupa a linha toda.
            Se o botão existir, o texto ocupa o que sobrar à direita dele.
        */}
        <Text 
            style={styles.titulo} 
            numberOfLines={1} 
            ellipsizeMode="tail"
        >
            {titulo}
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinha elementos na horizontal
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 64,
        backgroundColor: colors.secundaria, // Bege Quente do PDF
        ...Platform.select({
        ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
        android: { elevation: 4 },
        web: { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }
        }),
        zIndex: 10,
    },
    backButton: {
        marginRight: 8, // Pequeno espaçamento entre a seta e o início do texto
        width: 32,      // Largura fixa para garantir que o flex do texto calcule corretamente
    },
    titulo: {
        flex: 1,             // Ocupa todo o espaço restante
        textAlign: 'center', // Centraliza o texto dentro desse espaço restante
        fontFamily: fonts.titulo,
        fontSize: 20,
        color: colors.texto,
        fontWeight: 'bold',
    }
});