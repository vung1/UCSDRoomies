import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { checkPluginState } from "react-native-reanimated/lib/reanimated2/core";


function IconMenu(props) {
  const { navigation, screenCurr} = props;
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={() => {screenCurr != "HomeScreen" ? navigation.navigate("HomeScreen",
          "HomeScreen"
        ) : console.log("stay")}}
        activeOpacity={0.8}
        style={styles.button}
      >
        <Feather name="home" size={35} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {screenCurr != "LikesScreen" ? navigation.navigate("Likes",
        "LikesScreen"
       ) : console.log("stay")}}
        activeOpacity={0.8}
        style={styles.button}
      >
        <AntDesign name="hearto" size={35} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {screenCurr != "MatchesScreen" ? navigation.navigate("Matches",
         "MatchesScreen"
        ) : console.log("stay")}}
        activeOpacity={0.8}
        style={styles.button}
      >
        <AntDesign name="message1" size={35} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("user")}
        activeOpacity={0.8}
        style={styles.button}
      >
        <FontAwesome name="user-o" size={35} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    bottom: 0,
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.36,
    elevation: 1,
  },
  button: {
    marginHorizontal: "6.8%",
  },
});

export default IconMenu;
