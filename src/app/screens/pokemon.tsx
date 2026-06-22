import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from '@expo-google-fonts/science-gothic/useFonts';
import { ScienceGothic_100Thin } from '@expo-google-fonts/science-gothic/100Thin';
import { ScienceGothic_200ExtraLight } from '@expo-google-fonts/science-gothic/200ExtraLight';
import { ScienceGothic_300Light } from '@expo-google-fonts/science-gothic/300Light';
import { ScienceGothic_400Regular } from '@expo-google-fonts/science-gothic/400Regular';
import { ScienceGothic_500Medium } from '@expo-google-fonts/science-gothic/500Medium';
import { ScienceGothic_600SemiBold } from '@expo-google-fonts/science-gothic/600SemiBold';
import { ScienceGothic_700Bold } from '@expo-google-fonts/science-gothic/700Bold';
import { ScienceGothic_800ExtraBold } from '@expo-google-fonts/science-gothic/800ExtraBold';
import { ScienceGothic_900Black } from '@expo-google-fonts/science-gothic/900Black';
const URL = "https://pokeapi.co/api/v2/pokemon?limit=20"
const IMAGE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
const URLPokemon = "https://pokeapi.co/api/v2/pokemon/"

type PokemonProps = {
    name: string;
    url: string;
}

type PokemonDetalhado = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
}

export default function Pokemon({ navigation }: any) {

    const [pokemons, setPokemons] = useState<PokemonProps[] | null>([]);
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [previousUrl, setPreviousUrl] = useState<string | null>(null);
    const [busca, setBusca] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [pokemonEncontrado, setPokemonEncontrado] = useState<PokemonDetalhado | null>(null);
    const [fontsLoaded] = useFonts({
        ScienceGothic_100Thin,
        ScienceGothic_200ExtraLight,
        ScienceGothic_300Light,
        ScienceGothic_400Regular,
        ScienceGothic_500Medium,
        ScienceGothic_600SemiBold,
        ScienceGothic_700Bold,
        ScienceGothic_800ExtraBold,
        ScienceGothic_900Black
    });

    console.log("Busca:", busca);

    async function listarPokemons(url: string) {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json()
            console.log('data', data)
            setPokemons(data.results);
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
        } catch (error) {
            setError('Lista de Pokemons não carregada!');
            setPokemons(null);
            setNextUrl(null);
            setPreviousUrl(null);
        }
        finally {
            setLoading(false);
        }
    };

    function getPokemonImage(url: string) {
        const pokemonId = url.split('/').filter(Boolean).pop();
        return `${IMAGE}${pokemonId}.png`
    };

    async function buscarPokemon(name: string) {
        if (loading) return;

        const nomeBuscado = name.trim().toLowerCase();

        if (!nomeBuscado) {
            setError('Digite o nome de um Pokémon para buscar.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch(URLPokemon + nomeBuscado);

            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }

            const data = await response.json()

            setPokemonEncontrado(data)
        } catch (error) {
            setPokemonEncontrado(null);
            setError('Pokémon não encontrado. Verifique o nome digitado.');
        }
        finally {
            setLoading(false);
        }
    };

    function limparBusca() {
        setBusca('');
        setPokemonEncontrado(null);
        setError(null);
    }

    useEffect(() => {
        listarPokemons(URL);
    }, []);

    function maiuscula(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    if (loading && (!pokemons || pokemons.length === 0) || !fontsLoaded) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator animating={loading} size={'small'} color={"#d30d0d"} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <Pressable
                style={{ flex: 1, width: '100%' }}
                onPress={Keyboard.dismiss}>

                <Text style={[styles.texto, styles.titulo]}>Lista de Pokemons</Text>

                <TextInput style={styles.inputBusca}
                    placeholder="Buscar Pokémon"
                    value={busca}
                    onChangeText={setBusca}
                />
                <TouchableOpacity onPress={() => { buscarPokemon(busca) }}><Text style={styles.texto}>Buscar</Text></TouchableOpacity>
                {(pokemonEncontrado || error) && (
                    <TouchableOpacity onPress={limparBusca}>
                        <Text style={styles.texto}>Limpar</Text>
                    </TouchableOpacity>
                )}

                {error && (
                    <Text style={[styles.texto, styles.errorTexto]}>{error}</Text>
                )}

                {pokemonEncontrado ?
                    (<View style={styles.card}>
                        <Text style={styles.texto}>{maiuscula(pokemonEncontrado.name)}</Text>
                        {pokemonEncontrado.sprites?.front_default && (
                            <Image style={styles.imagem} source={{ uri: pokemonEncontrado.sprites.front_default }} />
                        )}

                        <TouchableOpacity
                            onPress={() => navigation.navigate("PokemonDetails", {
                                name: pokemonEncontrado.name,
                                url: `${URLPokemon}${pokemonEncontrado.id}/`
                            })}
                        >
                            <Text style={styles.texto}>Detalhes</Text>
                        </TouchableOpacity>
                    </View>) :

                    (!error && (
                        <>
                            <FlatList
                                style={styles.lista}
                                data={pokemons ?? []}
                                numColumns={4}
                                keyboardShouldPersistTaps="handled"
                                renderItem={({ item }) => (
                                    <View style={styles.card}>
                                        <Text style={styles.texto}>{maiuscula(item.name)}</Text>
                                        <Image style={styles.imagem} source={{ uri: getPokemonImage(item.url) }} />
                                        <TouchableOpacity onPress={() => navigation.navigate("PokemonDetails", item)}>
                                            <Text style={styles.texto}>Detalhes</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item) => item.url}
                            />

                            <View style={styles.pagina}>
                                <TouchableOpacity
                                    disabled={!previousUrl || loading}
                                    onPress={() => previousUrl && listarPokemons(previousUrl)}
                                >
                                    <Text style={styles.texto}>Anterior</Text>
                                </TouchableOpacity>

                                {loading && <ActivityIndicator size="small" color="#d30d0d" />}

                                <TouchableOpacity
                                    disabled={!nextUrl || loading}
                                    onPress={() => nextUrl && listarPokemons(nextUrl)}
                                >
                                    <Text style={styles.texto}>Próximo</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ))}
            </Pressable>
        </  SafeAreaView >
    )
};