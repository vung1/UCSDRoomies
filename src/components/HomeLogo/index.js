import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

const appLogoPNG = require("../../../assets/images/appLogo.png");

function HomoLogo() {

  return (
    <View style={styles.logoContainer}>
      <Image source={appLogoPNG} style={styles.image} />
      <Text style={styles.text}>Roomies</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  text: {
    marginTop: "5%",
    height: 25,
    fontSize: 25,
    fontFamily: "AmericanTypewriter-CondensedBold",
  },
});

export default HomoLogo;
