import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";


function SigninButton(props) {
  const { navigation } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(
        "SigninScreen",
        "SigninScreen"
      )}
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

