import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";
import SigninButton from "../components/SigninButton";
import BackArrow from "../components/BackArrow";

function SigninScreen({navigation}) {

  const [number, onChangeText] = React.useState("");

  return (

    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>

      {/* Back arrow to login screen */}
      <View style={styles.backArrow}>
        <BackArrow
          navigation={navigation}
          screen="LoginScreen"
          screenName="LoginScreen"
        />  
      </View>
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <LoginLogo />
      </View>

      {/* Signin field */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder="UCSD Email"
          keyboardType="default"
        />
      </View>

      {/* Login field for email */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder="Password"
          keyboardType="default"
        />
      </View>

      {/* Signin button */}
      <View style={styles.loginButtonContainer}>
        <SigninButton navigation={navigation}/>
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
  backArrow: {
    position: "absolute",
    top: "8%",
    left: "6%",
  },
  logoContainer: {
    marginTop: "30%",
    marginBottom: "10%",
  },
  loginFieldContainer: {
    marginTop: "5%",
    width: "75%",
    height: 42,
    borderRadius: 21,
    backgroundColor: "white",
    alignItems: "center",
  },
  textInput: {
    height: "100%",
    width: "86%",
  },
  loginButtonContainer: {
    marginTop: "15%",
    width: "75%",
  },
});

export default SigninScreen;
