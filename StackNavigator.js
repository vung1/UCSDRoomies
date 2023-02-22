import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen';
import InitScreen from './src/screens/InitScreen';
import MatchesScreen from './src/screens/MatchesScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
      >
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Init" component={InitScreen} />
          <Stack.Screen name="Matches" component={MatchesScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;