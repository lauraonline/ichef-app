// src/screens/LoginScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors, fonts } from '../theme/theme';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';

export default function LoginScreen({ navigation }) {
    // Função para simular o login e ir para a tela principal (as abas)
    const handleLogin = () => {
        // Usamos 'replace' para que o usuário não consiga "voltar" pra tela de login
        navigation.replace('MainTabs'); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <Header titulo="iChef" showBackButton={false} />

        <View style={styles.container}>
            <View style={styles.formContainer}>
            <Text style={styles.boasVindas}>Seja bem-vindo</Text>
            
            <Input placeholder="Nome de usuário" />
            <Input placeholder="Senha" secureTextEntry={true} />
            
            <Button titulo="Entrar" onPress={handleLogin} />
            
            <View style={styles.linksContainer}>
                <TouchableOpacity onPress={() => alert('Em construção')}>
                <Text style={styles.linkText}>Cadastrar-se</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => alert('Em construção')}>
                <Text style={styles.linkText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.fundo },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    formContainer: { width: '100%', maxWidth: 400 },
    boasVindas: { fontFamily: fonts.titulo, fontSize: 24, color: colors.texto, marginBottom: 24, textAlign: 'left' },
    linksContainer: { marginTop: 8, alignItems: 'flex-start', gap: 16 },
    linkText: { fontFamily: fonts.interface, fontSize: 16, color: colors.textoSecundario, textDecorationLine: 'underline' }
});