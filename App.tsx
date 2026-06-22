import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokemon from './src/app/screens/pokemon';
import PokemonDetails from './src/app/screens/pokemonDetails';
import { ScienceGothic_700Bold } from '@expo-google-fonts/science-gothic/700Bold';

export default function App() {
  const Stack = createStackNavigator<any>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#C62828',
          },
          headerTintColor: '#FFFFFF', 
          headerTitleStyle: {
            fontFamily: 'ScienceGothic_700Bold',
          },
        }}>
        <Stack.Screen
          name="Pokemon"
          component={Pokemon}
          options={{
            title: 'POKEDEX',
            headerTitleStyle: {
              fontFamily: "ScienceGothic_700Bold"
            }
          }}
        >
        </Stack.Screen>
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails}
          options={{
            title: 'DETALHES',
            headerTitleStyle: {
              fontFamily: "ScienceGothic_700Bold",
            }
          }}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D32F2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
