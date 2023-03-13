import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import LoginLogo from "../components/LoginLogo";
import SignupButton from "../components/SignupButton";
import BackArrow from "../components/BackArrow";

function SignupScreen({ navigation }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    repassword: "",
  });

  const [emialInputBorder, setEmailInputBorder] = React.useState(0);
  const [passwordInputBorder, setPasswordInputBorder] = React.useState(0);
  const [repasswordInputBorder, setRepasswordInputBorder] = React.useState(0);

  const [emailErrorMsg, setEmailMsg] = React.useState("");
  const [passwordErrorMsg, setPasswordMsg] = React.useState("");
  const [repasswordErrorMsg, setRePasswordMsg] = React.useState("");

  const showMessages = (emailMsg, passwordMsg, repasswordMsg) => {
    setEmailMsg(emailMsg);
    setPasswordMsg(passwordMsg);
    setRePasswordMsg(repasswordMsg);
    if (emailMsg === "") {
      setEmailInputBorder(0);
    } else {
      setEmailInputBorder(2);
    }

    if (passwordMsg === "") {
      setPasswordInputBorder(0);
    } else {
      setPasswordInputBorder(2);
    }

    if (repasswordMsg === "") {
      setPasswordInputBorder(0);
    } else {
      setPasswordInputBorder(2);
    }
  };

  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      {/* Back arrow to login screen */}
      <View style={styles.backArrow}>
        <BackArrow
          testID="Signup.Back"
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
      <View
        style={[styles.inputFieldContainer, { borderWidth: emialInputBorder }]}
      >
        <TextInput
          style={styles.textInput}
          placeholder="UCSD Email"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setState({
              email: text,
              password: state.password,
              repassword: state.repassword,
            });
          }}
        />
      </View>
      <Text style={styles.errorMsg}>{emailErrorMsg}</Text>

      {/* Sign up field for password */}
      <View
        style={[
          styles.inputFieldContainer,
          { borderWidth: passwordInputBorder },
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          onChangeText={(text) => {
            setState({
              email: state.email,
              password: text,
              repassword: state.repassword,
            });
          }}
        />
      </View>
      <Text style={styles.errorMsg}>{passwordErrorMsg}</Text>

      {/* Sign up field for confirm password */}
      <View
        style={[
          styles.inputFieldContainer,
          { borderWidth: repasswordInputBorder },
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          onChangeText={(text) => {
            setState({
              email: state.email,
              password: state.password,
              repassword: text,
            });
          }}
        />
      </View>
      <Text style={styles.errorMsg}>{repasswordErrorMsg}</Text>

      {/* Signin button */}
      <View style={styles.buttonContainer}>
        <SignupButton
          navigation={navigation}
          screenCurr="SignupScreen"
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
    color: "red",
    marginLeft: 0,
    left: 0,
    width: "70%",
  },
  buttonContainer: {
    marginTop: "10%",
    width: "75%",
  },
});

export default SignupScreen;
