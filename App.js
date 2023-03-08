import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

import HomeScreen from "./src/screens/HomeScreen";
import MatchesScreen from "./src/screens/MatchesScreen";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import { AuthProvider } from "./src/hooks/useAuth";

function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.pageContainer}>
        <AuthProvider>
          <MainStackNavigator />
        </AuthProvider>
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default App;
