import React from 'react';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Text, Image, View, StyleSheet } from 'react-native';
import { useFonts, Almendra_400Regular_Italic } from '@expo-google-fonts/almendra';

const HomoLogo = () => {

    // Load the font
    const [fontsLoaded] = useFonts({Almendra_400Regular_Italic});
  
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
      <Text style={styles.text}>Roomies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    flexDirection:'row',
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  text: {
    marginTop: "12%",
    fontSize: 25, 
    fontFamily: 'Almendra_400Regular_Italic',
  },
});

export default HomoLogo;