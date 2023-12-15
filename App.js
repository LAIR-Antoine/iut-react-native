import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import TeamScreen from './screens/TeamScreen';
import SettingScreen from './screens/SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Pokedex') {
              iconName = iconName = focused ? 'ios-list' : 'ios-list-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            } else if (route.name === 'Team') {
              iconName = focused ? 'ios-people' : 'ios-people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
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
            height: 60,
            paddingBottom: 10,

        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',

        
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
