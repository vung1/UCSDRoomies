import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

import HomeScreen from "./src/screens/HomeScreen";
import MatchesScreen from "./src/screens/MatchesScreen";
import InitScreen from "./src/screens/InitScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.pageContainer}>
        <MainStackNavigator />
      </View>
    </TailwindProvider>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default App;
