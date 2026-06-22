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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: NAVY,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    loading: {
        flex: 1,
        backgroundColor: NAVY,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    loadingText: {
        color: WHITE,
        fontFamily: 'ScienceGothic_400Regular',
        letterSpacing: 2,
        fontSize: 13,
        textTransform: 'uppercase',
    },

    card: {
        width: '80%',
        borderRadius: 20,
        padding: 20,
        marginTop: 24,
        alignItems: 'center',
        gap: 12,
    },
    pokemonId: {
        alignSelf: 'flex-end',
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'ScienceGothic_300Light',
        fontSize: 13,
        letterSpacing: 2,
    },
    image: {
        width: 180,
        height: 180,
    },
    typesRow: {
        flexDirection: 'row',
        gap: 8,
    },
    typeBadge: {
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    typeBadgeText: {
        color: WHITE,
        fontFamily: 'ScienceGothic_700Bold',
        fontSize: 12,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },

    infoBox: {
        width: '80%',
        backgroundColor: CARD_BG,
        borderRadius: 20,
        padding: 20,
        marginTop: 16,
        alignItems: 'center',
        gap: 16,
    },
    pokemonName: {
        fontFamily: 'ScienceGothic_800ExtraBold',
        fontSize: 28,
        color: WHITE,
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
        gap: 4,
    },
    statValue: {
        fontFamily: 'ScienceGothic_700Bold',
        fontSize: 18,
        color: YELLOW,
        letterSpacing: 1,
    },
    statLabel: {
        fontFamily: 'ScienceGothic_300Light',
        fontSize: 11,
        color: GRAY,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    statDivider: {
        width: 1,
        height: 32,
        backgroundColor: SURFACE,
    },

    buttonsRow: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    controlBtn: {
        flex: 1,
        backgroundColor: SURFACE,
        borderRadius: 10,
        paddingVertical: 11,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3a3a5e',
    },
    controlBtnActive: {
        backgroundColor: '#5a2d6e',
        borderColor: '#D685AD',
    },
    controlBtnText: {
        fontFamily: 'ScienceGothic_600SemiBold',
        color: GRAY,
        fontSize: 12,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    controlBtnTextActive: {
        color: '#D685AD',
    },

    normal:   { backgroundColor: "#A8A77A" },
    fire:     { backgroundColor: "#EE8130" },
    water:    { backgroundColor: "#6390F0" },
    electric: { backgroundColor: "#F7D02C" },
    grass:    { backgroundColor: "#7AC74C" },
    ice:      { backgroundColor: "#96D9D6" },
    fighting: { backgroundColor: "#C22E28" },
    poison:   { backgroundColor: "#A33EA1" },
    ground:   { backgroundColor: "#E2BF65" },
    flying:   { backgroundColor: "#A98FF3" },
    psychic:  { backgroundColor: "#F95587" },
    bug:      { backgroundColor: "#A6B91A" },
    rock:     { backgroundColor: "#B6A136" },
    ghost:    { backgroundColor: "#735797" },
    dragon:   { backgroundColor: "#6F35FC" },
    dark:     { backgroundColor: "#705746" },
    steel:    { backgroundColor: "#B7B7CE" },
    fairy:    { backgroundColor: "#D685AD" },
});