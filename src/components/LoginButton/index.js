import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

const LoginButton = () => {
  return (
    <View style={styles.buttonContainer}>
      <Image 
        source={require('../../../assets/images/tritonLogo.png')} 
        style={styles.image}
      />
      <Text style={styles.buttonText}> LOGIN WITH UCSD EMAIL </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "white",
    flexDirection:'row',
  },
  buttonText: {
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: 16,
    color: "black",
    marginRight: 10,
  },
  image: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
  }
});

export default LoginButton;