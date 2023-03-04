import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";
import SigninButton from "../components/SigninButton";
import BackArrow from "../components/BackArrow";

function SigninScreen({ navigation }) {
  
  const [state, setState] =  React.useState({
    email: '',
    password: '',
  });

  const [emialInputBorder, setEmailInputBorder] =  React.useState(0)
  const [passwordInputBorder, setPasswordInputBorder] =  React.useState(0)

  const [emailErrorMsg, setEmailMsg] =  React.useState('')
  const [passwordErrorMsg, setPasswordMsg] =  React.useState('')

  const showMessages = (emailMsg, passwordMsg) => {
    setEmailMsg(emailMsg);
    setPasswordMsg(passwordMsg);
    emailMsg == '' ? setEmailInputBorder(0) : setEmailInputBorder(2);
    passwordMsg == '' ? setPasswordInputBorder(0) : setPasswordInputBorder(2);
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
          testID="Signin.Back"
          navigation={navigation}
          screen="LoginScreen"
          screenName="LoginScreen"
        />
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <LoginLogo />
      </View>

      {/* Signin field for email */}
      <View style={[styles.inputFieldContainer, {borderWidth: emialInputBorder}]}>
        <TextInput
          testID="Signin.Email"
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

      {/* Signin field for password */}
      <View style={[styles.inputFieldContainer, {borderWidth: passwordInputBorder}]}>
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
      <View style={styles.buttonContainer}>
        {/* <Text style={styles.errorMsg}>{message}</Text> */}
        <SigninButton 
          testID="Signin.Button"
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
  inputFieldContainer: {
    marginTop: "3%",
    width: "75%",
    height: 42,
    borderRadius: 21,
    borderColor: "red",
    backgroundColor: "white",
    alignItems: "center",
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
  buttonContainer: {
    marginTop: "10%",
    width: "75%",
  },
});

export default SigninScreen;
