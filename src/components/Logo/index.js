import React from 'react';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Text, Image, View, StyleSheet } from 'react-native';
import { useFonts, Almendra_700Bold_Italic } from '@expo-google-fonts/almendra';

const Logo = () => {

    // Load the font
    const [fontsLoaded] = useFonts({Almendra_700Bold_Italic});
  
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
      <Image source={require('../../../assets/images/appLogo.png')} style={styles.image} />
      <Text style={{fontSize: 24, fontFamily: 'Almendra_700Bold_Italic'}}> UCSD </Text>
      <Text style={{fontSize: 25, fontFamily: 'Almendra_700Bold_Italic'}}> Roomies </Text>
    </View>
  );
};

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

export default Logo;