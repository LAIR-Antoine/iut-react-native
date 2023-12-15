import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import TeamScreen from './screens/TeamScreen';
import SettingScreen from './screens/SettingScreen';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: 'rgba(238,21,21,1)',
            shadowColor: 'rgba(238,21,21,1)',
          },
          headerTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: 'rgba(238,21,21,1)',
            shadowColor: 'rgba(238,21,21,1)',
            position: 'absolute',
            borderTopWidth: 0,

        },
        tabBarActiveTintColor: '#000',
        tabBarLabelStyle: {
          color: '#fff',
        },
        
})}
      >
        <Tab.Screen name="Pokedex" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Team" component={TeamScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
