import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";
import SigninButton from "../components/SigninButton";
import SignupButton from "../components/SignupButton";

function LoginScreen({navigation}) {
  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      
      <View style={styles.logoContainer}>
        <LoginLogo />
      </View>
      
      <View style={styles.loginButtonContainer}>
        <SigninButton 
          navigation={navigation}
          screenCurr="LoginScreen"
          state={{}}
        />
        <SignupButton 
          navigation={navigation}
          screenCurr="LoginScreen"
          state={{}}
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.agreementText}>
          By clicking Log In, you agree with our Terms. {"\n"}
          Learn how we process your data in our Privacy {"\n"}
          Policy and Cookies Policy.
        </Text>
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
  logoContainer: {
    marginTop: "42%",
  },
  loginButtonContainer: {
    marginTop: "10%",
    width: "80%",
  },
  textContainer: {
    marginTop: "10%",
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
