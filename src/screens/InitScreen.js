import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";

function InitScreen({navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("LoginScreen",
      "LoginScreen"
     )}
      activeOpacity={1}
      style={styles.background}
    >
      <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
        <View style={styles.logoContainer}>
          <LoginLogo />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: "42%",
  },
});

export default InitScreen;
