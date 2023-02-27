import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../firebase";

import LoginLogo from "../components/LoginLogo";
import SigninButton from "../components/SigninButton";
import BackArrow from "../components/BackArrow";

function SigninScreen({ navigation }) {
  
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [state, setState] =  React.useState({
    email: '',
    password: '',
  });

  const [emailErrorMsg, setEmailMsg] =  React.useState('')
  const [passwordErrorMsg, setPasswordMsg] =  React.useState('')

  const showMessages = (emailMsg, passwordMsg) => {
    setEmailMsg(emailMsg);
    setPasswordMsg(passwordMsg);
  };

  // navigate to home screen only if the auth state changed
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("HomeScreen");
  //     }
  //   });
  //   return unsubscribe; // when leave this screen, will unsubscribe current listener
  // }, []);

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
          placeholder="UCSD Email"
          keyboardType="default"
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {setState({ 
            email: text, 
            password: state.password, 
          })}}
        />
      </View>
      <Text style={styles.errorMsg}>{emailErrorMsg}</Text>

      {/* Login field for email */}
      <View style={styles.loginFieldContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          keyboardType="default"
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => {setState({ 
            email: state.email, 
            password: text, 
          })}}
        />
      </View>
      <Text style={styles.errorMsg}>{passwordErrorMsg}</Text>

      {/* Signin button */}
      <View style={styles.loginButtonContainer}>
        {/* <Text style={styles.errorMsg}>{message}</Text> */}
        <SigninButton 
          navigation={navigation}
          screenCurr="SigninScreen"
          state={state}
          showMessages={showMessages}
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
    marginTop: "3%",
    width: "75%",
    height: 42,
    borderRadius: 21,
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "red",
  },
  textInput: {
    height: "100%",
    width: "86%",
  },
  errorMsg: {
    fontSize: 12,
    marginTop: "1.5%",
    color: 'red',
    marginLeft: 0,
    left:0, 
    width: "70%",
  },
  loginButtonContainer: {
    marginTop: "10%",
    width: "75%",
  },
});

export default SigninScreen;
