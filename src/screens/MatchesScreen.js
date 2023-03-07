import React, {useState, useEffect, useRef} from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
// import users from "../../assets/data/users";
import useAuth from "../hooks/useAuth";
import BackArrow from "../components/BackArrow";
import IconMenu from "../components/IconMenu";
import { db, auth } from "../../firebase";
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

function MatchesScreen({ navigation }) {

  const { user } = useAuth();
  const [users, setAllUsers] = useState([]);
  const [messages, setAllMessages] = useState([]);

  useEffect(() => {
    // Get user info from firebase
    db.collection('users').get().then(snapshot => {
      // Object.entries()
      const arr = snapshot.docs.filter(doc => doc.id !== user.uid).map(doc => doc.data());
      setAllUsers(arr);
    });

    // Get message history from firebase
    const getMessages = async() => { 
      const docSnap = await getDoc(doc(db, "message_for_all", "all_messages"));
      if (docSnap.exists()) {
        const firebase_messages_list = docSnap.data();
        setAllMessages(firebase_messages_list);
      }
    }
    getMessages();

  }, [db]);

  // console.log(users);
  // console.log(messages);

  return (
    <View style={styles.ver_container}>
      <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 24,
              color: "#247DCF",
              marginLeft: 20,
            }}
          >
            New Matches
          </Text>
        </View>
        <ScrollView style={styles.scrollView} horizontal>
          <View style={styles.users}>
            {users.map((user) => (
              <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chat", {
                  user
                })
              }
              >
                {/* <View style={styles.user} key={user.id}>
                <Image source={{ uri: user.image }} style={styles.simp_image} />
                <Text style={styles.name}>{user.name.split(" ")[0]}</Text> */}
                <View style={styles.user} key={user.id}>
                <Image source={{ uri: user.photoURL }} style={styles.simp_image} />
                <Text style={styles.name}>{user.firstName}</Text>
              </View>
                </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.message_area}>
        <ScrollView style={styles.scrollView} vertical>
          <View style={styles.container}>
            {users.map((user) =>
              (true) ? ( //(user.messages.length!=0) ? (
                <TouchableOpacity
                onPress={() =>
                    navigation.navigate("Chat", {
                      user
                    })
                  }
                >
                  <View style={styles.message_box} key={user.id}>
                    <View style={styles.user} key={user.id}>
                      <Image
                        source={{ uri: user.photoURL }}
                        style={styles.simp_image}
                      />
                    </View>
                    <View style={styles.message_mid}>
                      <Text style={styles.msg_name}>{user.firstName}</Text>
                      <Text style={styles.message}>
                        {/* {user.messages.slice(-1)[0].split("\n")[0]} */}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.time} />
                      <Text style={styles.time}>
                        {/* {user.messages[0].split("\n").pop()} */}
                      </Text>
                    </View>
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
        screenCurr="MatchesScreen"
        />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
    padding: 10,
  },
  ver_container: {
    // padding: 10,
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
    height: "30%",
  },
  user: {
    width: 85,
    height: 85,
    margin: 8,
    borderRadius: 50,

    borderWidth: 2,
    padding: 3,
    borderColor: "#247DCF",
  },

  simp_image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  name: {
    fontWeight: "300",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 40,
  },
  message_area: {
    flex: 4,
  },
  message_box: {
    height: 85,
    flexDirection: "row",
    margin: 8,
  },
  message_mid: {
    fontWeight: "300",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 40,
    flex: 2,
    margin: 8,
  },
  msg_name: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "left",
    lineHeight: 40,
    flex: 1,
  },
  message: {
    fontWeight: "300",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 40,
    flex: 1,
  },
  time: {
    fontWeight: "300",
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 40,
    flex: 1,
  },
});

export default MatchesScreen;
