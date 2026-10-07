import { useFavorites } from "@/context/FavoritesContext";
import Pokemon from "@/interface/Pokemon";
import { Image } from "expo-image";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface ShowPokemonProps {
    pokemon: Pokemon;
}

export const typeIcons: Record<string, any> = {
    normal: require("@/assets/icons/normal.svg"),
    fire: require("@/assets/icons/fire.svg"),
    water: require("@/assets/icons/water.svg"),
    electric: require("@/assets/icons/electric.svg"),
    grass: require("@/assets/icons/grass.svg"),
    ice: require("@/assets/icons/ice.svg"),
    fighting: require("@/assets/icons/fighting.svg"),
    poison: require("@/assets/icons/poison.svg"),
    ground: require("@/assets/icons/ground.svg"),
    flying: require("@/assets/icons/flying.svg"),
    psychic: require("@/assets/icons/psychic.svg"),
    bug: require("@/assets/icons/bug.svg"),
    rock: require("@/assets/icons/rock.svg"),
    ghost: require("@/assets/icons/ghost.svg"),
    dragon: require("@/assets/icons/dragon.svg"),
    dark: require("@/assets/icons/dark.svg"),
    steel: require("@/assets/icons/steel.svg"),
    fairy: require("@/assets/icons/fairy.svg"),
};

export default function ShowPokemon({
    pokemon,
}: ShowPokemonProps) {
    const {
        isFavorite,
        toggleFavorite,
    } = useFavorites();

    const favorite =
        pokemon.pokemon_id
            ? isFavorite(pokemon.pokemon_id)
            : false;

    const Type1Icon = pokemon.types
        ? typeIcons[pokemon.types.type1]?.default ||
          typeIcons[pokemon.types.type1]
        : null;

    const Type2Icon = pokemon.types?.type2
        ? typeIcons[pokemon.types.type2]?.default ||
          typeIcons[pokemon.types.type2]
        : null;

    const getStat = (name: string) => {
        return pokemon.stats?.find(
            (stat) => stat.stat.name === name
        )?.base_stat;
    };

    const handleFavorite = async () => {
        await toggleFavorite(pokemon);
    };

    return (
        <ScrollView
            contentContainerStyle={
                styles.container
            }
        >
            <Text style={styles.name}>
                {pokemon.pokemon_name
                    .split("-")
                    .map(
                        (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1)
                    )
                    .join(" ")}
            </Text>

            <Text style={styles.id}>
                Pokédex #{pokemon.pokemon_id}
            </Text>

            <Image
                source={{
                    uri: pokemon.pokemon_image,
                }}
                style={styles.image}
                contentFit="contain"
            />

            <Pressable
                style={[
                    styles.favoriteButton,
                    favorite &&
                        styles.favoriteButtonActive,
                ]}
                onPress={handleFavorite}
            >
                <Text
                    style={[
                        styles.favoriteButtonText,
                        favorite &&
                            styles.favoriteButtonTextActive,
                    ]}
                >
                    {favorite
                        ? "★ Remover dos Favoritos"
                        : "☆ Adicionar aos Favoritos"}
                </Text>
            </Pressable>

            <View style={styles.types}>
                {Type1Icon && (
                    <Type1Icon
                        width={50}
                        height={50}
                    />
                )}

                {Type2Icon && (
                    <Type2Icon
                        width={50}
                        height={50}
                    />
                )}
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>
                    Informações
                </Text>

                <Text style={styles.infoText}>
                    Altura: {pokemon.height! / 10} m
                </Text>

                <Text style={styles.infoText}>
                    Peso: {pokemon.weight! / 10} kg
                </Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>
                    Status
                </Text>

                <Text style={styles.infoText}>
                    HP: {getStat("hp")}
                </Text>

                <Text style={styles.infoText}>
                    Ataque: {getStat("attack")}
                </Text>

                <Text style={styles.infoText}>
                    Defesa: {getStat("defense")}
                </Text>

                <Text style={styles.infoText}>
                    Ataque Especial:{" "}
                    {getStat("special-attack")}
                </Text>

                <Text style={styles.infoText}>
                    Defesa Especial:{" "}
                    {getStat("special-defense")}
                </Text>

                <Text style={styles.infoText}>
                    Velocidade: {getStat("speed")}
                </Text>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>
                    Habilidades
                </Text>

                {pokemon.abilities?.map(
                    (ability, index) => (
                        <Text
                            key={index}
                            style={styles.infoText}
                        >
                            • {ability.ability.name}
                        </Text>
                    )
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#F7FAFC",
    },

    name: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },

    id: {
        fontSize: 16,
        color: "#718096",
        marginBottom: 10,
        textAlign: "center",
    },

    image: {
        width: 250,
        height: 250,
    },

    favoriteButton: {
        width: "100%",
        backgroundColor: "#FFF5F5",
        borderWidth: 2,
        borderColor: "#FF3E3E",
        borderRadius: 12,
        paddingVertical: 13,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 20,
    },

    favoriteButtonActive: {
        backgroundColor: "#FF3E3E",
    },

    favoriteButtonText: {
        color: "#FF3E3E",
        fontSize: 16,
        fontWeight: "700",
    },

    favoriteButtonTextActive: {
        color: "#FFFFFF",
    },

    types: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },

    infoCard: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 12,
        marginBottom: 15,
        alignItems: "center",
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },

    infoText: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: "center",
    },
});