import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import withRedirectAuth from '@/hocs/withRedirectAuth';
import useAuthStore from '@/hooks/useAuthStore';
import { useApiQuery } from '@/hooks/useApiQuery';
import { RootView } from '@/components/RootView';

function Settings() {

    const textColor = useThemeColor(
        { light: Colors.light.text, dark: Colors.dark.text },
        'text'
    );

    const textLogout = useThemeColor(
        { light: Colors.dark.text, dark: Colors.light.text },
        'text'
    );

    const bgColor = useThemeColor(
        { light: Colors.light.text, dark: Colors.dark.text },
        'background'
    );
    const header = useAuthStore.use.getAuthorization();
    const logout = useAuthStore.use.logout();

    const { data: user, isLoading, isFetching } = useApiQuery(`/auth/profile`, {}, {
        ...header()
    });

    const router = useRouter();

    if (isLoading || isFetching) {
        return (
            <RootView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
            </RootView>
        );
    }

    if (!user) {
        return
    }


    const handleLogout = () => {
        logout();
        router.push('/sign-in');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={require('@/assets/images/piccolo.png')} resizeMode='cover' style={styles.profileImage} />
                <Text style={[styles.displayName, { color: textColor }]}>
                    {user.displayName}
                </Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.infoText, { color: textColor }]}>
                    <Text style={styles.bold}>Nom : </Text>{user.displayName}
                </Text>

                <Text style={[styles.infoText, { color: textColor }]}>
                    <Text style={styles.bold}>Rôle : </Text>
                    {user.roles.join(', ').toLowerCase()}
                </Text>
                <Text style={[styles.infoText, { color: textColor }]}>
                    <Text style={styles.bold}>Expiration du Token : </Text>
                    {new Date(user.exp * 1000).toLocaleString()}
                </Text>
            </View>

            <TouchableOpacity onPress={handleLogout} style={[styles.logoutButton, {
                backgroundColor: bgColor
            }]}>
                <Text style={[styles.logoutButtonText, { color: textLogout }]}>Se Déconnecter</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }, loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        backgroundPosition: ""
    },
    displayName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default withRedirectAuth(Settings);
