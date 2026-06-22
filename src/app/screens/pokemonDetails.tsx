import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NAVY = '#1a1a2e';
const SURFACE = '#2d2d4a';
const CARD_BG = '#252540';
const WHITE = '#F5F5F5';
const GRAY = '#aaaacc';
const YELLOW = '#FFD700';

export default function PokemonDetails({ route }: any) {
    const [pokemon, setPokemon] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [showBack, setShowBack] = useState(false);
    const [generFemale, setGenerFemale] = useState(Boolean);
    const url = route.params.url;

    async function getDetailsPokemon() {
        setLoading(true);
        try {
            const resp = await fetch(url);
            const data = await resp.json();
            setPokemon(data);
        } catch (error) {
        } finally {
            setTimeout(() => { setLoading(false) }, 2000);
        }
    }

    useEffect(() => {
        getDetailsPokemon();
    }, []);

    function maiuscula(nome: string) {
        return nome.charAt(0).toUpperCase() + nome.slice(1);
    }

    function getTypeStyle(type?: string) {
        switch (type) {
            case "fire":      return styles.fire;
            case "water":     return styles.water;
            case "grass":     return styles.grass;
            case "electric":  return styles.electric;
            case "ice":       return styles.ice;
            case "fighting":  return styles.fighting;
            case "poison":    return styles.poison;
            case "ground":    return styles.ground;
            case "flying":    return styles.flying;
            case "psychic":   return styles.psychic;
            case "bug":       return styles.bug;
            case "rock":      return styles.rock;
            case "ghost":     return styles.ghost;
            case "dragon":    return styles.dragon;
            case "dark":      return styles.dark;
            case "steel":     return styles.steel;
            case "fairy":     return styles.fairy;
            default:          return styles.normal;
        }
    }

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#CC0000" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    const primaryType = pokemon?.types?.[0]?.type?.name;
    const typeStyle = getTypeStyle(primaryType);
    const hasFemale = pokemon?.sprites?.front_female !== null;

    return (
        <View style={styles.container}>

            <View style={[styles.card, typeStyle]}>
                <Text style={styles.pokemonId}>
                    #{String(pokemon?.id ?? '').padStart(3, '0')}
                </Text>

                <Image
                    style={styles.image}
                    source={{
                        uri: generFemale
                            ? (showBack ? pokemon?.sprites.back_female : pokemon?.sprites.front_female)
                            : (showBack ? pokemon?.sprites.back_default : pokemon?.sprites.front_default),
                    }}
                />

                <View style={styles.typesRow}>
                    {pokemon?.types?.map((t: any) => (
                        <View key={t.type.name} style={[styles.typeBadge, getTypeStyle(t.type.name)]}>
                            <Text style={styles.typeBadgeText}>{maiuscula(t.type.name)}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.pokemonName}>{maiuscula(pokemon?.name || '')}</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{pokemon?.height / 10}m</Text>
                        <Text style={styles.statLabel}>Altura</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{pokemon?.weight / 10}kg</Text>
                        <Text style={styles.statLabel}>Peso</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{pokemon?.base_experience ?? '—'}</Text>
                        <Text style={styles.statLabel}>Exp. Base</Text>
                    </View>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity
                        style={styles.controlBtn}
                        onPress={() => setShowBack(!showBack)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.controlBtnText}>
                            {showBack ? '⬆ Frontal' : '⬇ Costas'}
                        </Text>
                    </TouchableOpacity>

                    {hasFemale && (
                        <TouchableOpacity
                            style={[styles.controlBtn, generFemale && styles.controlBtnActive]}
                            onPress={() => setGenerFemale(!generFemale)}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.controlBtnText, generFemale && styles.controlBtnTextActive]}>
                                ♀ Feminino
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    )
};