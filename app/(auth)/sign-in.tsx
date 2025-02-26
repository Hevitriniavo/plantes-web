import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemeShadows } from '@/hooks/useThemeShadows';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useApiMutation } from '@/hooks/useApiMutation';
import useAuthStore from '@/hooks/useAuthStore';
import withRedirectAlreadyAuth from '@/hocs/withRedirectAlreadyAuth';

function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const login = useAuthStore.use.login()

    const {mutateAsync } = useApiMutation('/auth/login', 'POST');

    const backgroundColor = useThemeColor(
        { light: Colors.light.background, dark: Colors.dark.background },
        'background'
    );

    const textColor = useThemeColor(
        { light: Colors.light.text, dark: Colors.dark.text },
        'text'
    );

    const buttonColor = useThemeColor(
        { light: Colors.dark.background, dark: Colors.light.background },
        'background'
    );

    const iconColor = useThemeColor(
        { light: Colors.light.icon, dark: Colors.dark.icon },
        'icon'
    );

    const shadowStyle = useThemeShadows({
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4
    });



    const handleSignIn = async () => {
        setLoading(false)
        try {
            const response = await mutateAsync({ username: email, password });
            await login(response.accessToken)
            router.push('/');
        } catch (error) {
            console.error('Erreur de connexion:', error);
        } finally {
            setLoading(false)
        }
    };
    
    return (
        <ScrollView style={[styles.container, { backgroundColor }, shadowStyle]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: textColor }]}>
                    Connexion
                </Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={[styles.input, {
                        borderColor: textColor,
                        color: textColor,
                    }]}
                    placeholderTextColor={iconColor}
                    placeholder="Adresse email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={[styles.input, {
                        borderColor: textColor,
                        color: textColor,
                    }]}
                    placeholderTextColor={iconColor}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />


                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: buttonColor },
                        loading && styles.buttonDisabled
                    ]}
                    onPress={handleSignIn}
                    disabled={loading}
                >
                    <Text style={[styles.buttonText, { borderColor: textColor, color: backgroundColor }]}>
                        {loading ? 'Chargement...' : 'Se connecter'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.toggleMode}
                onPress={() => router.push("/sign-up")}
            >
                <Text style={[styles.toggleText, { color: textColor }]}>
                    Pas encore de compte ? S'inscrire
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderRadius: 16,
        margin: 16,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
            },
            android: {
                elevation: 4,
            },
        }),
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        height: 48,
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    toggleMode: {
        marginTop: 16,
        paddingVertical: 8,
    },
    toggleText: {
        textAlign: 'center',
        fontSize: 14,
    },
});


export default withRedirectAlreadyAuth(SignIn)