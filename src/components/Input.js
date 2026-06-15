import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme/theme';

export default function Input({ placeholder, value, onChangeText, secureTextEntry, error, ...props }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
        <TextInput
            style={[
            styles.input,
            isFocused && styles.inputFocused,
            error && styles.inputError,
            props.multiline && { minHeight: 100, textAlignVertical: 'top' }
            ]}
            placeholder={placeholder}
            placeholderTextColor={colors.bordaInput}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        backgroundColor: colors.fundo,
        borderWidth: 1.5,
        borderColor: colors.bordaInput,
        borderRadius: 12, // Definido no PDF
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: fonts.corpo,
        fontSize: 16,
        color: colors.texto,
    },
    inputFocused: {
        borderColor: colors.primaria,
        borderWidth: 2,
    },
    inputError: {
        borderColor: colors.erro,
        borderWidth: 2,
    },
    errorText: {
        color: colors.erro,
        fontFamily: fonts.corpo,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    }
});