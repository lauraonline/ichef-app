import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../theme/theme';

export default function Button({ titulo, onPress, variant = 'primary', style }) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity 
        style={[
            styles.button, 
            isPrimary ? styles.primaryButton : styles.secondaryButton,
            style
        ]} 
        onPress={onPress}
        activeOpacity={0.8}
        >
        <Text style={[
            styles.text, 
            isPrimary ? styles.primaryText : styles.secondaryText
        ]}>
            {titulo}
        </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 24, // Estilo "Pill" definido no PDF
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 12,
    },
    primaryButton: {
        backgroundColor: colors.primaria,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primaria,
    },
    text: {
        fontFamily: fonts.interface,
        fontSize: 16,
    },
    primaryText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    secondaryText: {
        color: colors.primaria,
        fontWeight: 'bold',
    }
});
