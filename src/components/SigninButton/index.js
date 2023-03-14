import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "../../hooks/useAuth";

const tritonLogo = require("../../../assets/images/tritonLogo.png");

function SigninButton(props) {
  const { navigation, screenCurr, state, showMessages } = props;
  const reg = /^\w+([.-]?\w+)*@ucsd.edu/;

  const { logIn, loading } = useAuth();

  let emailMsg = "";
  let passwordMsg = "";

  const handleSignin = () => {
    showMessages("", "");
    let error = false;
    // Check input email
    if (state.email === "") {
      emailMsg = "Please enter your UCSD email";
      error = true;
    } else if (reg.test(state.email) !== true) {
      emailMsg = "Please enter your UCSD email in correct format";
      error = true;
    }
    // Check input password
    if (state.password === "") {
      passwordMsg = "Please enter your password";
      error = true;
    }
    // Show error messages if previous errors occur
    if (error) {
      showMessages(emailMsg, passwordMsg);
    }
    // If no error occurs on user inputs,
    // validate user email and password & log in the user
    else {
      logIn(state, showMessages, navigation);
    }
  };

  return (
    <TouchableOpacity
      {...props}
      testID="Signin.Button"
      onPress={() => {
        if (screenCurr === "LoginScreen") {
          navigation.navigate("SigninScreen", "SigninScreen");
        } else {
          handleSignin();
        }
      }}
      activeOpacity={0.8}
      style={styles.buttonContainer}
    >
      <Image source={tritonLogo} style={styles.image} />
      <Text style={styles.buttonText}> SIGN IN WITH UCSD EMAIL </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 55,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  buttonText: {
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: 16,
    color: "black",
    marginRight: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default SigninButton;
