import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth";

function SignupButton(props) {

  const { navigation, screenCurr, state} = props;
  const [message, setState] =  React.useState('')
  const reg = /^\w+([\.-]?\w+)*@ucsd.edu/;
  const { register, loading } = useAuth();

  return (
    <View> 
      <Text style={styles.errorMsg}>{message}</Text>
      <TouchableOpacity {...props}
        testID="Signup.Button"
        onPress={() => {
          setState("");
          screenCurr == "LoginScreen" ? 
          navigation.navigate("SignupScreen","SignupScreen") :
          state.email == "" ?
          setState("* Please enter your UCSD email") :
          reg.test(state.email) != true ?
          setState("* Please enter your UCSD email in right format") :
          // TODO: Check if the email is exist in database
          // if in database?
          // setState("* Account already exists") :
          state.password == "" ?
          setState("* Please enter your password") :
          state.repassword == "" ?
          setState("* Please enter your confirm password") :
          state.password != state.repassword ?
          setState("* Please enter the same confirm password") :
          // TODO: Save the acount and navigate to profile page
          // navigation.navigate("HomeScreen","HomeScreen")
          register(state, navigation)
          // console.log(state)
        }}
        activeOpacity={0.8}
        style={styles.buttonContainer}
      >
        <Image
          source={require("../../../assets/images/tritonLogo.png")}
          style={styles.image}
        />
        <Text style={styles.buttonText}> SIGN UP WITH UCSD EMAIL </Text>
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

export default SignupButton;
