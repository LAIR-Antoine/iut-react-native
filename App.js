import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

const PokemonCard = ({ pokemon }) => (
  <View style={styles.card}>
    <Image
      style={styles.cardImage}
      source={{
        uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.entry_number + '.png',
      }}
    />
    <Text style={styles.cardText}>{pokemon.pokemon_species.name.charAt(0).toUpperCase() + pokemon.pokemon_species.name.slice(1)}</Text>
  </View>
);

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokedex/1/';
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setPokemonList(data.pokemon_entries);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={(item) => item.entry_number.toString()}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardText: {
    marginTop: 10,
  },
});
