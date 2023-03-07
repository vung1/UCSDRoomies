import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth";

function SignupButton(props) {
  const { navigation, screenCurr, state, showMessages } = props;
  const reg = /^\w+([\.-]?\w+)*@ucsd.edu/;
  const { register, loading } = useAuth();

  let emailMsg = "";
  let passwordMsg = "";
  let repasswordMsg = "";

  const handleSignup = () => {
    showMessages("", "", "");
    let error = false;
    if (state.email == "") {
      emailMsg = "Please enter your UCSD email";
      error = true;
    } else if (reg.test(state.email) != true) {
      emailMsg = "Please enter your UCSD email in correct format";
      error = true;
    } else if (false) {
      //
      // TODO: check if the email is already exists
      //
      emailMsg = "Account already exists";
      error = true;
    }
    // Check input password
    if (state.password == "") {
      passwordMsg = "Please enter your password";
      error = true;
    } else {
      // Check confirm password
      if (state.repassword == "") {
        repasswordMsg = "Please confirm your password";
        error = true;
      } else if (state.password != state.repassword) {
        repasswordMsg = "Passwords did not match";
        error = true;
      }
    }
    // Show error messages if previous errors occur
    if (error) {
      showMessages(emailMsg, passwordMsg, repasswordMsg);
    }
    // If no error occurs on user inputs,
    // Check if account is already exists & register the user
    else {
      register(state, showMessages, navigation);
    }
  };

  return (
    <View>
      <TouchableOpacity
        {...props}
        testID="Signup.Button"
        onPress={() => {
          screenCurr == "LoginScreen"
            ? navigation.navigate("SignupScreen", "SignupScreen")
            : handleSignup();
        }}
        activeOpacity={0.8}
        style={styles.buttonContainer}
      >
        <Image
          source={require("../../../assets/images/tritonLogo.png")}
          style={styles.image}
        />
        <Text style={styles.buttonText}> SIGN UP WITH UCSD EMAIL </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorMsg: {
    fontSize: 12,
    color: "red",
    marginBottom: "5%",
    marginLeft: "5%",
  },
  buttonContainer: {
    height: 55,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    borderColor: "red",
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

export default SignupButton;
