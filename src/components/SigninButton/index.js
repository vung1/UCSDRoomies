import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth";

function SigninButton(props) {

  const { navigation, screenCurr, state} = props;
  const [message, setState] =  React.useState('')
  const reg = /^\w+([\.-]?\w+)*@ucsd.edu/;
  const { logIn, loading } = useAuth();

  return (
    <View> 
      <Text style={styles.errorMsg}>{message}</Text>
      <TouchableOpacity {...props}
        testID="Signin.Button"
        onPress={() => {
          setState("");
          screenCurr == "LoginScreen" ? 
          navigation.navigate("SigninScreen","SigninScreen") : 
          state.email == "" ?
          setState("* Please enter your email") :
          reg.test(state.email) != true ?
          setState("* Please enter your UCSD email in right format") :
          state.password == "" ?
          setState("* Please enter your password") :
          // TODO: Check validation, if profile is completed go to homepage, 
          // else go to profile page
          logIn(state)
          // console.log(state)
        }}
        activeOpacity={0.8}
        style={styles.buttonContainer}
      >
        <Image
          source={require("../../../assets/images/tritonLogo.png")}
          style={styles.image}
        />
        <Text style={styles.buttonText}> SIGN IN WITH UCSD EMAIL </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  errorMsg: {
    fontSize: 12,
    color: "red",
    marginBottom: "5%",
    marginLeft: "5%",
  },
  buttonContainer: {
    height: 55,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
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
  },
});

export default SigninButton;
