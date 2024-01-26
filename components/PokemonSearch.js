import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';
import PokemonCard from './PokemonCard';

function onPressSearch() {
  console.log('searching pokemon');

  

}

export default function PokemonSearch() {

  return (
    <View style={styles.container}>
      <Text>Search a pokemon</Text>
      <TextInput style={styles.input} placeholder="Pikachu" />

      <Button
        onPress={onPressSearch}
        title="Search"
        color="rgba(238,21,21,1)"
        accessibilityLabel="Search a pokemon"
      />

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

});
