import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, Image, View, StyleSheet } from "react-native";
import { useFonts, Almendra700BoldItalic } from "@expo-google-fonts/almendra";

const appLogoPNG = require("../../../assets/images/appLogo.png");

function LoginLogo() {
  // Load the font
  const [fontsLoaded] = useFonts({ Almendra700BoldItalic });

  useEffect(() => {
    if (fontsLoaded) {
      // Hide the splash screen after the fonts have loaded and the
      // UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.logoContainer}>
      <Image source={appLogoPNG} style={styles.image} />
      <Text style={{ fontSize: 24, fontFamily: "Almendra700BoldItalic" }}>
        {" "}
        UCSD{" "}
      </Text>
      <Text style={{ fontSize: 25, fontFamily: "Almendra700BoldItalic" }}>
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
