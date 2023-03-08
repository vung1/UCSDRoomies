import React, { useEffect, useState } from "react";
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
import { getDocs, collection, orderBy, query } from "@firebase/firestore";
import users from "../../assets/data/users";
import BackArrow from "../components/BackArrow";
import useAuth from "../hooks/useAuth";
import IconMenu from "../components/IconMenu";

import { db } from "../../firebase";

function LikesScreen({ navigation }) {
  const { user } = useAuth();
  const [swipes, setSwipes] = useState([]);

  useEffect(() => {
    async function getDocuments() {
      await getDocs(
        query(
          collection(db, "users", user.uid, "swipes"),
          orderBy("swipe_pass_timestamp", "desc"),
        ),
      ).then((querySnapshot) => {
        const passArr = [];
        querySnapshot.forEach((doc) => {
          const { firstName, lastName, photoURL } = doc.data();
          passArr.push({ id: doc.id, firstName, lastName, photoURL });
        });
        setSwipes(passArr);
      });
    }
    getDocuments();
  }, [swipes]);

  return (
    <View style={styles.ver_container}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={styles.head}>Likes</Text>
        </View>

        <View>
          <Text
            style={
              (styles.head, { fontSize: 18, marginLeft: 30, marginBottom: 15 })
            }
          >
            {swipes.length} Likes
          </Text>
        </View>

        <View style={styles.message_area}>
          <ScrollView style={styles.scrollView} vertical>
            <View style={styles.users}>
              {swipes.map((currentUser, index) => (
                <View style={styles.user} key={currentUser.id}>
                  <TouchableOpacity
                    onPress={() => console.log(`profile ${currentUser.id}`)}
                  >
                    <ImageBackground
                      source={{ uri: currentUser.photoURL }}
                      style={styles.simp_image}
                      imageStyle={{ borderRadius: 10, overflow: "hidden" }}
                    >
                      <Text style={styles.name}>
                        {currentUser.firstName} {currentUser.lastName}
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <IconMenu navigation={navigation} screenCurr="LikesScreen" />
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    fontSize: 24,
    color: "#000000",
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
    flexDirection: "row",
    flex: 1,
    justifyContent: "left",
    flexWrap: "wrap",
    padding: 10,
  },
  user: {
    width: "50%",
    height: 260,
    padding: 10,
    justifyContent: "center",
    // backgroundColor:"orange"
  },
  simp_image: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
    flexDirection: "column-reverse",
    borderRadius: 10,
    alignItems: "flex-start",
  },
  name: {
    fontWeight: "300",
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    padding: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  message_area: {
    flex: 4,
  },
});

export default LikesScreen;
