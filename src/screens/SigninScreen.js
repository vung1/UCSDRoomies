import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../firebase";

import LoginLogo from "../components/LoginLogo";
import SigninButton from "../components/SigninButton";
import BackArrow from "../components/BackArrow";

function SigninScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigate to home screen only if the auth state changed
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeScreen");
      }
    });
    return unsubscribe; // when leave this screen, will unsubscribe current listener
  }, []);

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
          onChangeText={(text) => setEmail(text)}
          placeholder="UCSD Email"
          keyboardType="default"
        />
      </View>

      {/* Login field for email */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
        />
      </View>

      {/* Signin button */}
      <View style={styles.loginButtonContainer}>
        <SigninButton navigation={navigation} email={email} password={password}/>
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
