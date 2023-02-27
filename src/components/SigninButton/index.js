import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../../firebase";

function SigninButton(props) {
  const { navigation } = props;
  const { email } = props;
  const { password } = props;

  const handleLogin = () => {
    if (email == "" && password == "") {
      // if email and password are empty, stay in current screen
      navigation.navigate("SigninScreen", "SigninScreen");
    } else {
      // Try to login the user
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          navigation.navigate("HomeScreen");
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <TouchableOpacity
      onPress={handleLogin}
      // {() => navigation.navigate(
      //   "SigninScreen",
      //   "SigninScreen"
      // )}
      activeOpacity={0.8}
      style={styles.buttonContainer}
    >
      <Image
        source={require("../../../assets/images/tritonLogo.png")}
        style={styles.image}
      />
      <Text testID="SignIn.Button" style={styles.buttonText}>
        {" "}
        SIGN IN WITH UCSD EMAIL{" "}
      </Text>
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
