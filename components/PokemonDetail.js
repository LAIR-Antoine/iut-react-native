import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function PokemonDetail() {

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInTeam, setIsInTeam] = useState(false);
  const [fullTeam, setFullTeam] = useState(false);

  const pokemonTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy', 'unknown', 'shadow'];
  const pokemonColors = ['#A8A878', '#C03028', '#A890F0', '#A040A0', '#E0C068', '#B8A038', '#A8B820', '#705898', '#B8B8D0', '#F08030', '#6890F0', '#78C850', '#F8D030', '#F85888', '#98D8D8', '#7038F8', '#705848', '#EE99AC', '#68A090', '#705898'];

  function getTypeColor(type) {
    const index = pokemonTypes.indexOf(type);
    return index !== -1 ? pokemonColors[index] : 'transparent';
  }

  function checkIfPokemonInTeam() {
    AsyncStorage.getItem('pokemonTeam').then((team) => {
      if (team !== null) {
        const teamArray = JSON.parse(team);
        const found = teamArray.some(p => p.id === id);
        setIsInTeam(found);
      } else {
        setIsInTeam(false);
      }
    }).catch(error => {
      console.error('Error checking team:', error);
    });
  }

  useEffect(() => {
    checkIfPokemonInTeam();

    const url = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
        //console.log(pokemon.id);
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

  function addToTeam() {

    AsyncStorage.getItem('pokemonTeam').then((team) => {
      if (team !== null) {
        const newTeam = JSON.parse(team);

        if (newTeam.length >= 6) {
          console.log('Team is already full !');
          setIsInTeam(false);
          setFullTeam(true);
          return;
        }

        if (newTeam.some((item) => item.id === pokemon.id)) {
          console.log('Pokemon already in team');
          return;
        } else {
          newTeam.push(pokemon);
          AsyncStorage.setItem('pokemonTeam', JSON.stringify(newTeam));
          console.log('Pokemon added to team');
        }

        console.log('Pokemon added to team 2');
      } else {
        const newTeam = [pokemon];
        AsyncStorage.setItem('pokemonTeam', JSON.stringify(newTeam));

        console.log('Pokemon added to team');
      }
    });
    setIsInTeam(true);
  }

  function removeFromTeam() {
    AsyncStorage.getItem('pokemonTeam').then((team) => {
      if (team !== null) {
        const newTeam = JSON.parse(team);
        
        const index = newTeam.findIndex(p => p.id === pokemon.id);
        
        if (index > -1) {
          newTeam.splice(index, 1);
          AsyncStorage.setItem('pokemonTeam', JSON.stringify(newTeam));
          console.log('Pokemon removed from team');
        } else {
          console.log('Pokemon not found in team');
        }
      } else {
        console.log('No pokemon in team');
      }
    }).catch(error => {
      console.error('Error removing Pokemon from team:', error);
    });
    setIsInTeam(false);
  }

  return (
    <View style={styles.container}>
      {isInTeam ? (
        <Button 
          title="Remove from team"
          onPress={removeFromTeam}
          color={'rgba(238,21,21,1)'}
        />
      ) : (
        <Button 
          title="Add to team" 
          onPress={addToTeam}
          color={'rgba(238,21,21,1)'}
        />
      )}

      {fullTeam ? (
              <Text style={styles.error}>
              Team is already full !
            </Text>
            ) : ('')}
      

      <Image
            style={styles.pokemonImage}
            source={{
                uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png',
            }}
            />
      <Text style={styles.pokemonName}>{ capitalize(pokemon.name) }</Text>

      <View style={styles.typesContainer}>
        {pokemon.types.map((type, index) => (
          <Text key={index} style={{ ...styles.typeText, backgroundColor: getTypeColor(type.type.name) }}>{ capitalize(type.type.name) }</Text>
        ))}
      </View>



      <Text>Height : { pokemon.height / 10 }m</Text>
      <Text>Weight : { pokemon.weight / 10 }kg</Text>

      

      <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
        <Text>Go back</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    alignItems: 'center',
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  typeText: {
    color: 'white',
    padding: 6,
    margin: 2,
    borderRadius: 5,
    overflow: 'hidden',
    fontWeight: 'bold',
    
  },
  typesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 10,
  },
  goBack: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
