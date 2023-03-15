import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { setDoc, getDoc, doc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import IconMenu from "../components/IconMenu";
import { db } from "../../firebase";

function MatchesScreen({ navigation }) {
  const { user } = useAuth();
  const [messages, setAllMessages] = useState([]);
  const [chatMap, setChatMap] = useState({});
  // const [all_users, setAllUsers] = useState([]); // all the users except the current login user info
  const [userData, setUserData] = useState({}); // current logged in user data
  const [matachedUsers, setMatches] = useState([]); // all the swiped and matched other users

  useEffect(() => {
    // Get current login user chat history
    db.collection("users")
      .get()
      .then((snapshot) => {
        // Get all users info from firebase include current login user
        const usersMap = {};
        // eslint-disable-next-line array-callback-return
        snapshot.docs.map((document) => {
          usersMap[document.data().id] = document.data();
        });
        // setAllUsers(usersMap);

        setUserData(usersMap[user.uid]);
        // Find current user and get messages historys KEYS
        if ("messages" in usersMap[user.uid]) {
          setChatMap(usersMap[user.uid].messages);
        } else {
          setChatMap({});
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Get all message history from firebase
    const getMessages = async () => {
      const docSnap = await getDoc(doc(db, "message_for_all", "all_messages"));
      if (docSnap.exists()) {
        const firebaseMessagesList = docSnap.data();
        setAllMessages(firebaseMessagesList);
      } else {
        console.log("No such document! message_for_all, all_messages");
        setDoc(doc(db, "message_for_all", "all_messages"));
      }
    };
    getMessages();

    // Get all the swiped other_users
    async function getSwipedUsers() {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        db.collection("users")
          .get()
          .then((snapshot) => {
            // Get all users info from firebase include current login user
            const usersMap = {};
            // eslint-disable-next-line array-callback-return
            snapshot.docs.map((document) => {
              usersMap[document.data().id] = document.data();
            });

            const matchArr = [];
            docSnap.data().swipes.forEach((swipedId) => {
              const curr = usersMap[swipedId];
              // console.log(curr.swipes);
              if (
                typeof curr.swipes !== "undefined" &&
                curr.swipes.length !== 0 &&
                curr.swipes.includes(user.uid)
              ) {
                matchArr.push({
                  id: curr.id,
                  firstName: curr.firstName,
                  lastName: curr.lastName,
                  userimage: curr.userimage,
                });
              }
            });
            setMatches(matchArr);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("No such document! users, user.uid");
      }
    }
    getSwipedUsers();

    // return unsub;
  }, [matachedUsers]); // messages, matachedUsers

  // console.log(matachedUsers);
  // console.log(messages)

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
              {/* {all_users.map((other_user) => ( */}
              {matachedUsers.map((otherUser) => (
                <View key={otherUser.id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Chat", {
                        otherUser,
                        userData,
                      })
                    }
                  >
                    <View style={styles.user}>
                      <Image
                        source={{ uri: otherUser.userimage }}
                        style={styles.simp_image}
                      />
                      <Text style={styles.name}>{otherUser.firstName}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.message_area}>
          <ScrollView style={styles.scrollView} vertical>
            <View style={styles.container}>
              {/* {all_users.map((otherUser) =>  */}
              {matachedUsers.map((otherUser) =>
                // chatMap[otherUser.id] is the key, id_id, to get the actual chat data
                messages[chatMap[otherUser.id]] != null &&
                messages[chatMap[otherUser.id]].length !== 0 ? ( // (true) ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Chat", {
                        otherUser,
                        userData,
                      })
                    }
                  >
                    <View style={styles.message_box} key={otherUser.id}>
                      <View style={styles.user} key={otherUser.id}>
                        <Image
                          source={{ uri: otherUser.userimage }}
                          style={styles.simp_image}
                        />
                      </View>
                      <View style={styles.message_mid}>
                        <Text style={styles.msg_name}>
                          {otherUser.firstName}
                        </Text>
                        <Text style={styles.message}>
                          {
                            messages[chatMap[otherUser.id]]
                              .slice(-1)[0]
                              .split("\\n")[0]
                              .split(":")[1]
                          }
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.time} />
                        <Text style={styles.time}>
                          {`${messages[chatMap[otherUser.id]]
                            .slice(-1)[0]
                            .split("\\n")[1]
                            .slice(0, 2)}:${messages[chatMap[otherUser.id]]
                            .slice(-1)[0]
                            .split("\\n")[1]
                            .slice(2, 4)}`}
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

      <IconMenu navigation={navigation} screenCurr="MatchesScreen" />
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
    flex: 3,
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
