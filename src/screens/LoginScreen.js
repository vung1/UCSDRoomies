import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import Logo from '../components/Logo'

const LoginScreen = () => {
  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      
      <View style={styles.pageContainer}></View><Logo/>
      
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}> LOGIN WITH UCSD EMAIL </Text>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: { 
    flex: 1,
    width: '100%',
    alignItems: "center",
  },
  pageContainer: {
    marginTop: "50%",
  },
  buttonContainer: { 
    padding: 10, 
    alignItems: "center", 
    borderRadius: 5 
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  }
});

export default LoginScreen;