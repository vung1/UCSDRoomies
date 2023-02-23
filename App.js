import "react-native-gesture-handler";
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import MatchesScreen from "./src/screens/MatchesScreen";
import InitScreen from "./src/screens/InitScreen";
import ChatScreen from "./src/screens/ChatScreen";
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
    <SafeAreaView style={styles.pageContainer}>
      <MainStackNavigator />
    </SafeAreaView>
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
