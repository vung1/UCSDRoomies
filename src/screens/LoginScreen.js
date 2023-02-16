import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Logo from '../components/Logo'
import LoginButton from '../components/LoginButton';

const LoginScreen = () => {
  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      <View style={styles.logoContainer}><Logo/></View>
      <Text style={styles.agreementText}>
        By clicking Log In, you agree with our Terms. {'\n'}
        Learn how we process your data in our Privacy {'\n'}
        Policy and Cookies Policy.  
      </Text>
      <View style={styles.loginButtonContainer}><LoginButton /></View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1,
    width: '100%',
    alignItems: "center",
  },
  agreementText: {
    marginTop: "20%",
    color: "white",
    textAlign: "center",
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 16,
  },
  logoContainer: {
    marginTop: "42%",
  },
  loginButtonContainer: {
    marginTop: "6%",
  },
});

export default LoginScreen;