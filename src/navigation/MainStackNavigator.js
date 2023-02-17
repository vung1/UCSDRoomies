import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import InitScreen from '../screens/InitScreen';
import ChatScreen from '../screens/ChatScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        backgroundColor: '#FFFFFF'
      }}>
        <Stack.Screen name='Matches' component={MatchesScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator