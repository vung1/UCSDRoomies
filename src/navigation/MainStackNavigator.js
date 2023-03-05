import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitScreen from "../screens/InitScreen";
import LoginScreen from "../screens/LoginScreen";
import EmailPasswordScreen from "../screens/EmailPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: "#FFFFFF",
        }}
      >
       <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
       <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="InitScreen" component={InitScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="Matches" component={MatchesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
  
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
