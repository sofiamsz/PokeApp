import Pokemon from "@/interface/Pokemon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface FavoritesContextData {
    favorites: Pokemon[];
    isFavorite: (pokemonId: number) => boolean;
    addFavorite: (pokemon: Pokemon) => Promise<void>;
    removeFavorite: (pokemonId: number) => Promise<void>;
    toggleFavorite: (pokemon: Pokemon) => Promise<void>;
}

const FavoritesContext =
    createContext<FavoritesContextData | undefined>(
        undefined
    );

const FAVORITES_KEY = "@PokeApp:favorites";

interface FavoritesProviderProps {
    children: ReactNode;
}

export function FavoritesProvider({
    children,
}: FavoritesProviderProps) {
    const [favorites, setFavorites] = useState<Pokemon[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const savedFavorites =
                await AsyncStorage.getItem(FAVORITES_KEY);

            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error(
                "Erro ao carregar favoritos:",
                error
            );
        }
    };

    const saveFavorites = async (
        newFavorites: Pokemon[]
    ) => {
        try {
            await AsyncStorage.setItem(
                FAVORITES_KEY,
                JSON.stringify(newFavorites)
            );
        } catch (error) {
            console.error(
                "Erro ao salvar favoritos:",
                error
            );
        }
    };

    const isFavorite = (pokemonId: number) => {
        return favorites.some(
            (pokemon) =>
                pokemon.pokemon_id === pokemonId
        );
    };

    const addFavorite = async (
        pokemon: Pokemon
    ) => {
        if (!pokemon.pokemon_id) {
            return;
        }

        if (isFavorite(pokemon.pokemon_id)) {
            return;
        }

        const newFavorites = [
            ...favorites,
            pokemon,
        ];

        setFavorites(newFavorites);

        await saveFavorites(newFavorites);
    };

    const removeFavorite = async (
        pokemonId: number
    ) => {
        const newFavorites =
            favorites.filter(
                (pokemon) =>
                    pokemon.pokemon_id !== pokemonId
            );

        setFavorites(newFavorites);

        await saveFavorites(newFavorites);
    };

    const toggleFavorite = async (
        pokemon: Pokemon
    ) => {
        if (!pokemon.pokemon_id) {
            return;
        }

        if (isFavorite(pokemon.pokemon_id)) {
            await removeFavorite(
                pokemon.pokemon_id
            );
        } else {
            await addFavorite(pokemon);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                isFavorite,
                addFavorite,
                removeFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context =
        useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites deve ser usado dentro de FavoritesProvider"
        );
    }

    return context;
}