import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';

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

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  }, []);

  const handleOpenCamera = () => {
    if (hasPermission === null) {
      Alert.alert("Requesting permission");
    } else if (hasPermission === false) {
      Alert.alert("No access to camera");
    } else {
      setCameraOpen(true);
    }
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  if (cameraOpen && isFocused) {
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
          <View style={styles.cameraContainer}>
            <Button 
              title="Close Camera" 
              onPress={handleCloseCamera}
              color={'rgba(238,21,21,1)'}
            />
          </View>
        </Camera>
      </View>
    );
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

      <View style={styles.camera}>
        <Text>Camera</Text>
        <Button 
          title="Open Camera" 
          onPress={handleOpenCamera}
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
  camera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});