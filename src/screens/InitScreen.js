import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import LoginLogo from '../components/LoginLogo'

const InitScreen = () => {
  return (
    <TouchableOpacity 
      onPress={() => console.log('Tocuh Screen')}
      activeOpacity={1}
      style={styles.background}>
      <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
        <View style={styles.logoContainer}><LoginLogo/></View>
      </LinearGradient>
    </TouchableOpacity>
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
  },
});

export default InitScreen;
