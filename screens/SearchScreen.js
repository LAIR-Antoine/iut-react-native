import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonSearch from '../components/PokemonSearch';
import PokemonDetail from '../components/PokemonDetail';

const Stack = createStackNavigator();

export default function SearchScreen() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
    }}
>
    <Stack.Screen name="Search" component={PokemonSearch} />
    <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
</Stack.Navigator>
  );
}

