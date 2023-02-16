import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Logo from '../components/Logo'

const InitScreen = () => {
  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      <View style={styles.logoContainer}><Logo/></View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: { 
    flex: 1,
    width: '100%',
    alignItems: "center",
  },
  logoContainer: {
    marginTop: "42%",
  }
});

export default InitScreen;
