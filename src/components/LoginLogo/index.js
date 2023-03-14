import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

const appLogoPNG = require("../../../assets/images/appLogo.png");

function LoginLogo() {
  return (
    <View style={styles.logoContainer}>
      <Image source={appLogoPNG} style={styles.image} />
      <Text style={{ fontSize: 24, fontFamily: "AmericanTypewriter-Bold" }}>
        {" "}
        UCSD{" "}
      </Text>
      <Text style={{ fontSize: 24, fontFamily: "AmericanTypewriter-Bold" }}>
        {" "}
        Roomies{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 200,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 100,
  },
  image: {
    width: 90,
    height: 90,
    marginTop: "8%",
    marginBottom: "3%",
  },
});

export default LoginLogo;
