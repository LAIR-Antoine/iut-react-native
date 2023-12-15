import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function PokemonDetail() {

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>Pokemon Detail { id }</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Home')}>
        <Text>Retour</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  }
});
