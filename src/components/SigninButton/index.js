import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

function SigninButton(props) {

  const { navigation, screenCurr, state, showMessages } = props;
  const reg = /^\w+([\.-]?\w+)*@ucsd.edu/;

  var emailMsg = '';
  var passwordMsg = '';

  const handleSignin = () => {
    showMessages('', '');
    var error = false
    // Check input email
    if (state.email == "" ) {
      emailMsg = "Please enter your UCSD email";
      error = true;
    } else if (reg.test(state.email) != true) {
      emailMsg = "Please enter your UCSD email in correct format";
      error = true;
    }
    // Check input password
    if (state.password == "") {
      passwordMsg = "Please enter your password";
      error = true;
    }
    // Show error messages if previous errors occur
    if (error) {
      console.log(emailMsg)
      showMessages(emailMsg, passwordMsg);
    } else {
      // Try to login the user
      signInWithEmailAndPassword(auth, state.email, state.password)
      // Successfully login, navigate to HomeScreen
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("HomeScreen");
        console.log("Logged in with:", user.email);
      })
      // Email and password do not match, send error message
      .catch(() => {
        passwordMsg = "Your email or password is incorrect";
        showMessages(emailMsg, passwordMsg);
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        screenCurr == "LoginScreen" ? 
        navigation.navigate("SigninScreen","SigninScreen") : 
        handleSignin()
      }}
      activeOpacity={0.8}
      style={styles.buttonContainer}
    >
      <Image
        source={require("../../../assets/images/tritonLogo.png")}
        style={styles.image}
      />
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
