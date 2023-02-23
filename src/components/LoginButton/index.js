import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/core'

function LoginButton() {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('EmailPassword');
        console.log("Tocuh Button");
      }}
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
