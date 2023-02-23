import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function LoginButton() {
  return (
    <TouchableOpacity
      onPress={() => console.log("Tocuh Button")}
      activeOpacity={0.8}
      style={styles.buttonContainer}
    >
      <Image
        source={require("../../../assets/images/tritonLogo.png")}
        style={styles.image}
      />
      <Text style={styles.buttonText}> LOGIN WITH UCSD EMAIL </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
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

export default LoginButton;