import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function SettingScreen() {

  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    async function checkOrientation() {
      const orientation = await AsyncStorage.getItem('screenOrientation');
      setIsLocked(orientation === 'locked');
    }

    checkOrientation();
  }, []);

  async function screenOrientation() {
    if (isLocked) {
      await AsyncStorage.setItem('screenOrientation', 'unlocked');
      await ScreenOrientation.unlockAsync();
    } else {
      await AsyncStorage.setItem('screenOrientation', 'locked');
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
    setIsLocked(!isLocked);
  }

  return (
    <View style={styles.container}>
      <View style={styles.screenOrientation}>
        <Text>Screen</Text>
        <Button
          title={isLocked ? "Unlock Screen Rotation" : "Lock Screen Rotation"}
          onPress={screenOrientation}
          color={'rgba(238,21,21,1)'}
        />
      </View>
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
  screenOrientation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});