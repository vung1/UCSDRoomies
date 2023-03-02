import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import users from "../../assets/data/users";
import BackArrow from "../components/BackArrow";
import IconMenu from "../components/IconMenu";

function LikesScreen({ navigation }) {
  return (
    <View style={styles.ver_container}>
      <SafeAreaView style={styles.container}>
        <View style={{ marginTop:10, marginBottom:30,flexDirection: "row",justifyContent:"center"}}>
          <Text
            style={styles.head}
          >
            Likes
          </Text>
        </View>

      <View>
        <Text style={styles.head, {fontSize:18, marginLeft:30, marginBottom:15}}>
          {users.length} Likes
        </Text>
      </View>

      <View style={styles.message_area}>
        <ScrollView style={
          styles.scrollView
          }
          vertical
          >
            <View style={styles.users}>
                {users.map((user) =>
                  user.messages ? ( //FIXME: change it to likes
                    <TouchableOpacity
                    onPress={() =>
                        // navigation.navigate("Chat", {
                        //   user
                        // })
                        console.log("profile " + user.id)
                      }
                    >
                    <View style={styles.user} key={user.id}>
                    <ImageBackground source={{ uri: user.image }} style={styles.simp_image} imageStyle={{ borderRadius: 10, overflow: "hidden"}} >
                      <Text style={styles.name}>{user.name.split(" ")[0]}</Text>
                    </ImageBackground>
                  </View>
                      
                    </TouchableOpacity>
                  ) : null,
                )}
            </View>
          
            
        </ScrollView>
      </View>
      </SafeAreaView>
      
      <IconMenu 
        navigation={navigation}
        screenCurr="LikesScreen"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  head:{
    fontSize: 24,
    color: "#000000"
  },
  ver_container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 10,
    flex: 1,
    
  },
  users: {
    // height:"100%",
    // width:600,
    flexDirection:"row",
    flex:1,
    justifyContent: "left",
    flexWrap: "wrap",
    padding: 10,
  },
  user: {
    width: "100%",
    height: 260,
    borderRadius: 40,
    padding:10,
    // overflow: "hidden",
    justifyContent: "center",
    // backgroundColor: 'skyblue',
  },

  simp_image: {
    width: 184,
    height: "100%",
    backgroundColor:"grey",
    flexDirection: "column-reverse",
    borderRadius: 10,
    alignItems:"flex-start"
  },
  name: {
    fontWeight: "300",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    padding:10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  message_area: {
    flex: 4,
  }
});

export default LikesScreen;