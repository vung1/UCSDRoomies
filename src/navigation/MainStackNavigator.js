import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitScreen from "../screens/InitScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import ChatScreen from "../screens/ChatScreen";
import LikesScreen from "../screens/LikesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: "#FFFFFF",
          animationEnabled: false,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Matches" component={MatchesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Likes" component={LikesScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="InitScreen" component={InitScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
