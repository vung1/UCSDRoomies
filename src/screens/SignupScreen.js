import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";
import SignupButton from "../components/SignupButton";
import BackArrow from "../components/BackArrow";

function SignupScreen({navigation}) {

  const [state, setState] =  React.useState({
    email: '',
    password: '',
    repassword: '',
  });

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

      {/* Sign up field for email */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="UCSD Email"
          keyboardType="default"
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {setState({ 
            email: text,
            password: state.password, 
            repassword: state.repassword,
          })}}
        />
      </View>

      {/* Sign up field for password */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          keyboardType="default"
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {setState({ 
            email: state.email, 
            password: text, 
            repassword: state.repassword,
          })}}
        />
      </View>

      {/* Sign up field for confirm password */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          keyboardType="default"
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {setState({ 
            email: state.email, 
            password: state.password, 
            repassword: text,
          })}}
        />
      </View>

      {/* Signin button */}
      <View style={styles.loginButtonContainer}>
        <SignupButton 
          navigation={navigation}
          screenCurr="SignupScreen"
          state={state}
        />
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
    marginTop: "10%",
    width: "75%",
  },
});

export default SignupScreen;
