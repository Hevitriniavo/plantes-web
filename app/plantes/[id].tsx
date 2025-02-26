import { RootView } from "@/components/RootView";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { formateId } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import dayjs from "dayjs";
import { useApiQuery } from "@/hooks/useApiQuery";
import useAuthStore from "@/hooks/useAuthStore";
import withRedirectAuth from "@/hocs/withRedirectAuth";

function Plante() {
    const params = useLocalSearchParams();
    const header = useAuthStore.use.getAuthorization()
    const navigation = useNavigation();
    const borderColor = useThemeColor({ light: Colors.dark.background, dark: Colors.light.background }, "background");

    const { data, isLoading, isFetching } = useApiQuery(`/plantes/[id]`, {
        id: params.id
    }, {
        ...header()
    });

    if (isLoading || isFetching) {
        return (
            <RootView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="green" />
            </RootView>
        );
    }

    const handleImagePress = () => {
        navigation.goBack();
    };

    return (
        <RootView style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >
                <Row style={[styles.header, { borderBottomColor: borderColor }]}>
                    <ThemedView style={styles.colLeft}>
                        <TouchableOpacity onPress={handleImagePress}>
                            <Image style={styles.headerImage} source={require("@/assets/images/icone-fleche.png")} />
                        </TouchableOpacity>
                        <ThemedText style={styles.headerName} type="defaultSemiBold" numberOfLines={1} ellipsizeMode="tail">
                            {data?.name}
                        </ThemedText>
                    </ThemedView>
                    <ThemedText style={styles.headerId} type="title">{formateId(data?.id || 0)}</ThemedText>
                </Row>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: data?.imageUrl as string }}
                        style={styles.plantImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <ThemedText style={styles.plantName} type="defaultSemiBold">{data?.name}</ThemedText>

                    <View style={styles.extraInfo}>
                        <ThemedText style={styles.infoText} type="defaultSemiBold">
                            🌱 Quantité : {data?.quantity}
                        </ThemedText>
                        <ThemedText style={styles.infoText} type="defaultSemiBold">
                            📅 Ajouté le : {dayjs(data?.addedDate).format("DD MMMM YYYY")}
                        </ThemedText>
                        <ThemedText style={[styles.infoText, { color: data?.isActive ? "green" : "red" }]}>
                            {data?.isActive ? "🟢 Disponible" : "🔴 Indisponible"}
                        </ThemedText>
                    </View>

                    <ThemedText style={styles.description} type="subtitle">
                        {data?.description || "Aucune description disponible."}
                    </ThemedText>

                </View>
            </ScrollView>
        </RootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.3,
    },
    headerImage: {
        width: 24,
        height: 24,
    },
    colLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },
    headerName: {
        fontSize: 18,
        fontWeight: "bold",
        flexShrink: 1,
    },
    headerId: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'right',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    plantImage: {
        width: "100%",
        height: 250,
        padding: 10,
        borderRadius: 10,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        marginVertical: 20,
        maxWidth: 900,
        alignItems: 'center'
    },
    plantName: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
    },
    extraInfo: {
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    infoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default  withRedirectAuth(Plante)