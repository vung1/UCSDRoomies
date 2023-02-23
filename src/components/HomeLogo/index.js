import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Text, Image, View, StyleSheet } from "react-native";
import { useFonts, Almendra700BoldItalic } from "@expo-google-fonts/almendra";

function HomoLogo() {
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
      <Image
        source={require("../../../assets/images/appLogo.png")}
        style={styles.image}
      />
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
    fontFamily: "Almendra_700Bold_Italic",
  },
});

export default HomoLogo;
