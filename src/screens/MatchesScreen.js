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
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

function MatchesScreen({ navigation }) {

  const { user } = useAuth();
  const [messages, setAllMessages] = useState([]);
  const [chat_map, setChatMap] = useState({});
  // const [all_users, setAllUsers] = useState([]); // all the users except the current login user info
  const [user_data, setUserData] = useState({}); // current logged in user data
  const [matched_users, setMatches] = useState([]); // all the swiped and matched other users

  useEffect(() => {
    // let unsub;

    // Get current login user chat history
    db.collection('users').get().then(snapshot => {
      // Get all users info from firebase include current login user
      const users_map = {};
      snapshot.docs.map((doc) => {
        users_map[doc.data().id] = doc.data();
      })
      // setAllUsers(users_map);
      setUserData(users_map[user.uid]);
      // Find current user and get messages historys KEYS
      if ("messages" in users_map[user.uid]) {
        setChatMap(users_map[user.uid].messages);
      } else {
        setChatMap({});
      }
    }).catch((error) => {
      console.error(error);
    });

    // Get all message history from firebase
    const getMessages = async() => { 
      const docSnap = await getDoc(doc(db, "message_for_all", "all_messages"));
      if (docSnap.exists()) {
        const firebase_messages_list = docSnap.data();
        setAllMessages(firebase_messages_list);
      } else {
        console.log("No such document! message_for_all, all_messages");
        setDoc(doc(db, "message_for_all", "all_messages"));
      }
    }
    getMessages();

    // Get all the swiped other_users
    async function getSwipedUsers() {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        db.collection('users').get().then(snapshot => {
          // Get all users info from firebase include current login user
          const users_map = {};
          snapshot.docs.map((doc) => {
            users_map[doc.data().id] = doc.data();
          });

          const matchArr = [];
          docSnap.data().swipes.forEach((swiped_id) => {
            const curr = users_map[swiped_id];
            // console.log(curr.swipes);
            if (typeof curr.swipes !== 'undefined' && curr.swipes.length !== 0 && curr.swipes.includes(user.uid)) {
              matchArr.push({ id:curr.id, firstName:curr.firstName, lastName:curr.lastName, userimage:curr.userimage });
            }
          });
          setMatches(matchArr);
        }).catch((error) => {
          console.error(error);
        });
      } else {
        console.log("No such document! users, user.uid");
      }
    }
    getSwipedUsers();

    // return unsub;
  }, []); // messages, matched_users

  // console.log(matched_users);
  // console.log(all_users)

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
            {matched_users.map((other_user) => (
              <View key={other_user.id}>
              <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chat", {
                  other_user, user_data
                })
              }
              >
                <View style={styles.user} >
                  <Image source={{ uri: other_user.userimage }} style={styles.simp_image} />
                  <Text style={styles.name}>{other_user.firstName}</Text>
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
            {/* {all_users.map((other_user) =>  */}
            {matched_users.map((other_user) => 
                // chat_map[other_user.id] is the key, id_id, to get the actual chat data
                (messages[chat_map[other_user.id]]!=null && messages[chat_map[other_user.id]].length!=0) ? ( //(true) ? (
                  <TouchableOpacity
                  onPress={() =>
                      navigation.navigate("Chat", {
                        other_user, user_data
                      })
                    }
                  >
                    <View style={styles.message_box} key={other_user.id}>
                      <View style={styles.user} key={other_user.id}>
                        <Image
                          source={{ uri: other_user.userimage }}
                          style={styles.simp_image}
                        />
                      </View>
                      <View style={styles.message_mid}>
                        <Text style={styles.msg_name}>{other_user.firstName}</Text>
                        <Text style={styles.message}>
                          {messages[chat_map[other_user.id]].slice(-1)[0].split("\\n")[0].split(":")[1]}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.time} />
                        <Text style={styles.time}>
                          {messages[chat_map[other_user.id]][0].split("\\n")[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : null, // ( 
                //   // in this case, the other_user haven't start a conversation with current logged in user
                //   <TouchableOpacity
                //   onPress={() =>
                //       navigation.navigate("Chat", {
                //         other_user, user_data
                //       })
                //     }
                //   >
                //     <View style={styles.message_box} key={other_user.id}>
                //       <View style={styles.user} key={other_user.id}>
                //         <Image
                //           source={{ uri: other_user.userimage }}
                //           style={styles.simp_image}
                //         />
                //       </View>
                //       <View style={styles.message_mid}>
                //         <Text style={styles.msg_name}>{other_user.firstName}</Text>
                //         <Text style={styles.message}>
                //           {/* {messages[chat_map[other_user.id]].slice(-1)[0].split("\\n")[0].split(":")[1]} */}
                //         </Text>
                //       </View>
                //       <View>
                //         <Text style={styles.time} />
                //         <Text style={styles.time}>
                //           {/* {messages[chat_map[other_user.id]][0].split("\\n")[0].split(":")[1]} */}
                //         </Text>
                //       </View>
                //     </View>
                //   </TouchableOpacity>
                // )
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
