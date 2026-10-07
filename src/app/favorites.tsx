import { useFavorites } from "@/context/FavoritesContext";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
    const {
        favorites,
        removeFavorite,
    } = useFavorites();

    const formatName = (name: string) => {
        return name
            .split("-")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
            )
            .join(" ");
    };

    const formatId = (id?: number) => {
        if (!id) return "";

        return `#${String(id).padStart(3, "0")}`;
    };

    if (favorites.length === 0) {
        return (
            <SafeAreaView
                style={styles.emptyContainer}
                edges={["top"]}
            >
                <Text style={styles.title}>
                    Favoritos
                </Text>

                <Text style={styles.emptyText}>
                    Você ainda não tem Pokémon
                    favoritos.
                </Text>

                <Text style={styles.emptySubText}>
                    Acesse a Pokédex e adicione seus
                    Pokémon favoritos!
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={styles.container}
            edges={["top"]}
        >
            <View style={styles.header}>
                <Text style={styles.title}>
                    Favoritos
                </Text>

                <Text style={styles.subtitle}>
                    {favorites.length} Pokémon
                    {favorites.length !== 1
                        ? "s"
                        : ""} favorito
                    {favorites.length !== 1
                        ? "s"
                        : ""}
                </Text>
            </View>

            <FlatList
                data={favorites}
                keyExtractor={(item) =>
                    String(item.pokemon_id)
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={
                    styles.listContent
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Pressable
                            style={styles.cardContent}
                            onPress={() =>
                                item.pokemon_id &&
                                router.push(
                                    `/pokemon/${item.pokemon_id}` as any
                                )
                            }
                        >
                            <View
                                style={styles.idBadge}
                            >
                                <Text
                                    style={styles.idText}
                                >
                                    {formatId(
                                        item.pokemon_id
                                    )}
                                </Text>
                            </View>

                            <Image
                                source={{
                                    uri: item.pokemon_image,
                                }}
                                style={
                                    styles.pokemonImage
                                }
                                contentFit="contain"
                            />

                            <Text
                                style={
                                    styles.pokemonName
                                }
                            >
                                {formatName(
                                    item.pokemon_name
                                )}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.removeButton}
                            onPress={() =>
                                item.pokemon_id &&
                                removeFavorite(
                                    item.pokemon_id
                                )
                            }
                        >
                            <Text
                                style={
                                    styles.removeButtonText
                                }
                            >
                                ★ Remover
                            </Text>
                        </Pressable>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7FAFC",
    },

    emptyContainer: {
        flex: 1,
        backgroundColor: "#F7FAFC",
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
    },

    header: {
        backgroundColor: "#FFFFFF",
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#EDF2F7",
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2D3748",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 15,
        color: "#718096",
    },

    emptyText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2D3748",
        textAlign: "center",
        marginBottom: 10,
    },

    emptySubText: {
        fontSize: 15,
        color: "#718096",
        textAlign: "center",
    },

    listContent: {
        padding: 12,
        paddingBottom: 40,
    },

    row: {
        justifyContent: "space-between",
    },

    card: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        margin: 6,
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EDF2F7",
        shadowColor: "#1A202C",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.04,
        shadowRadius: 12,
        elevation: 3,
    },

    cardContent: {
        width: "100%",
        alignItems: "center",
    },

    idBadge: {
        alignSelf: "flex-end",
        backgroundColor: "#EDF2F7",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },

    idText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#718096",
    },

    pokemonImage: {
        width: 100,
        height: 100,
        marginVertical: 8,
    },

    pokemonName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#2D3748",
        textAlign: "center",
        marginBottom: 10,
    },

    removeButton: {
        width: "100%",
        backgroundColor: "#FFF5F5",
        borderWidth: 1,
        borderColor: "#FED7D7",
        borderRadius: 10,
        paddingVertical: 8,
        alignItems: "center",
    },

    removeButtonText: {
        color: "#E53E3E",
        fontSize: 13,
        fontWeight: "700",
    },
});