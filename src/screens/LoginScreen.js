import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";
import LoginButton from "../components/LoginButton";

function LoginScreen({navigation}) {
  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      <View style={styles.logoContainer}>
        <LoginLogo />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.agreementText}>
          By clicking Log In, you agree with our Terms. {"\n"}
          Learn how we process your data in our Privacy {"\n"}
          Policy and Cookies Policy.
        </Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <LoginButton navigation={navigation}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  textContainer: {
    marginTop: "20%",
  },
  logoContainer: {
    marginTop: "42%",
  },
  loginButtonContainer: {
    marginTop: "6%",
  },
  agreementText: {
    fontSize: 13,
    fontFamily: "Arial",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    lineHeight: 16,
  },
});

export default LoginScreen;
