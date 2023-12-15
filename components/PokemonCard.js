import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const PokemonCard = ({ pokemon }) => (
  <View style={styles.card}>
    <Image
      style={styles.cardImage}
      source={{
        uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.entry_number + '.png',
      }}
    />
    <Text style={styles.cardText}>{ capitalize(pokemon.pokemon_species.name) }</Text>
  </View>
);



const styles = StyleSheet.create({
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

export default PokemonCard;