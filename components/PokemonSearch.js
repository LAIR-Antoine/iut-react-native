import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PokemonSearch() {
  const [message, setMessage] = useState('');

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function onPressSearch() {
    //console.log('message: ' + message.toLocaleLowerCase());
    setPokemon([]);
  
    const url = 'https://pokeapi.co/api/v2/pokemon/' + message.toLocaleLowerCase() + '/';
    
    if (message === '') {
      setError('Please enter a pokemon name');
      return;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setError(null);
        setMessage('');
        //console.log(data.id);
        setLoading(false);
        navigation.navigate('PokemonDetail', { id: data.id });
      })
      .catch((error) => {
        //console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }

  function handleChange(event) {
    setMessage(event.nativeEvent.text);
  }

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Search a pokemon</Text>
      <TextInput 
        style={styles.input} 
        onChange={handleChange} 
        placeholder="Pokemon name"
        value={message}
        
      />

      <Button
        onPress={onPressSearch}
        title="Search"
        color="rgba(238,21,21,1)"
        accessibilityLabel="Search a pokemon"
      />

      <Text style={styles.error}>
        {error ? 'We can\'t find this pokemon' : ''}
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '50%',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },

});
