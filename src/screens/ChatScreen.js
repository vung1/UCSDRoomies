import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { doc, setDoc, getDoc, updateDoc } from "@firebase/firestore";
import { db, auth } from "../../firebase";
import BackArrow from "../components/BackArrow";
import useAuth from "../hooks/useAuth";

function ChatScreen({ route, navigation }) {
  const { other_user, user_data } = route.params;
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [contentHeight, setContentHeight] = useState({ height: 90 });
  const [currentMessage, setMsg] = useState({ message: "" });
  const [messages, setAllMessages] = useState([]);
  const [key, setKey] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const scrollViewRef = useRef();
  let prevTime = 0;

  useEffect(() => {
    // get messages map key. (id_id ascending order)
    const key =
      user.uid > other_user.id
        ? `${other_user.id}_${user.uid}`
        : `${user.uid}_${other_user.id}`;
    setKey(key);

    // Get message history from firebase
    const getMessages = async () => {
      const docSnap = await getDoc(doc(db, "message_for_all", "all_messages"));
      if (docSnap.exists()) {
        const firebase_messages_list = docSnap.data();
        if (key in firebase_messages_list) {
          setAllMessages(firebase_messages_list[key]);
        } else {
          setAllMessages([]);
        }
      } else {
        console.log("No such document! Setting...");
        setDoc(doc(db, "message_for_all", "all_messages"));
      }
    };
    getMessages();
  }, [messages]);

  // console.log(messages);
  // console.log(user_data);
  // console.log("current user photoURL: ", user_data.image);

  async function sender(currMsg, setMessage) {
    const hour = new Date().getHours();
    const min = new Date().getMinutes();

    // intergrate with firebase
    const timestamp =
      (hour >= 10 ? hour.toString() : `0${hour}`) +
      (min >= 10 ? min.toString() : `0${min}`);
    const value = `${user.uid}:${currMsg.message}\\n${timestamp}`; // TODO: should change to server time serverTimestamp();

    messages.push(value);
    const docData = {
      [key]: messages,
    };
    await updateDoc(doc(db, "message_for_all", "all_messages"), docData);

    // store messages to each user in firebase
    // const docSnap = await getDoc(doc(db, "users", user.uid));
    // const curr_user_data = docSnap.data();
    if ("messages" in user_data) {
      user_data.messages[other_user.id] = key;
      // console.log(curr_user_data.messages);
      await updateDoc(doc(db, "users", user.uid), {
        messages: user_data.messages,
      });
    } else {
      const returnMessage = { [other_user.id]: key };
      await updateDoc(doc(db, "users", user.uid), {
        messages: returnMessage,
      });
    }

    setMessage({ message: "" });
  }

  function currentTimeLag(msg) {
    const time = msg.split("\\n").slice(-1);
    const lag = prevTime - time;
    // console.log("msg: " + msg + "time "+time+ " prevTime "+prevTime + " lag "+lag);
    prevTime = time;
    return lag > 0 || lag < -10;
  }

  return (
    <SafeAreaView style={styles.ver_container}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <BackArrow
            navigation={navigation}
            screen="MatchesScreen"
            screenName="Matches"
          />

          <View style={styles.user} key={other_user.id}>
            <Image
              source={{ uri: other_user.userimage }}
              style={styles.simp_image}
            />
          </View>
          <Text style={styles.name}>{other_user.firstName}</Text>
        </View>
      </View>

      <View style={styles.message_area}>
        <ScrollView
          style={styles.scrollView}
          vertical
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {messages.length == 0 ? (
            <Text style={styles.bar}>New message</Text>
          ) : (
            messages.map((msg) => (
              <>
                {currentTimeLag(msg) ? (
                  <Text style={styles.bar}>
                    {/* TODO */}
                    {`${msg.split("\\n").slice(-1)[0].substring(0, 2)}:${msg
                      .split("\\n")
                      .slice(-1)[0]
                      .substring(2, 4)}`}
                  </Text>
                ) : (
                  <Text style={styles.bar} />
                )}
                <View style={styles.message_box}>
                  {/* TODO */}
                  {msg.split(":")[0] !== user.uid ? (
                    <>
                      <View style={styles.message_side}>
                        <View style={styles.user} key={other_user.id}>
                          <Image
                            source={{ uri: other_user.userimage }}
                            style={styles.simp_image}
                          />
                        </View>
                      </View>
                      <View style={styles.message_mid}>
                        {/* TODO */}
                        <Text style={styles.message}>
                          {msg.split("\\n")[0].split(":")[1]}
                        </Text>
                      </View>
                      <View style={styles.message_side} />
                    </>
                  ) : (
                    <>
                      {/* self user */}
                      <View style={styles.message_self_side} />
                      <View style={styles.message_self_mid}>
                        <Text style={styles.message_self}>
                          {/* TODO */}
                          {msg.split("\\n")[0].split(":")[1]}
                        </Text>
                      </View>
                      <View style={styles.message_self_side}>
                        <View style={styles.user_self} key={user.uid}>
                          <Image
                            source={{ uri: user_data.userimage }} // TODO
                            style={styles.simp_image}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </>
            ))
          )}
        </ScrollView>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 5,
              margin: 5,
              height: contentHeight.height,
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 5,
              paddingBotton: 20,
              borderRadius: 30,
              borderWidth: 10,
              borderColor: "#F1F1F1",
              backgroundColor: "#F1F1F1",
              selectionColor: "#F1F1F1",
            }}
          >
            <TextInput
              style={{
                height: contentHeight.height - 30,
                borderColor: "#F1F1F1",
                backgroundColor: "#F1F1F1",
                selectionColor: "#F1F1F1",
              }}
              placeholder="Type Something..."
              keyboardType="default"
              blurOnSubmit
              returnKeyType="blur"
              multiline
              value={currentMessage.message}
              onContentSizeChange={(e) => {
                let inputH = Math.max(
                  e.nativeEvent.contentSize.height + 43,
                  60,
                );
                if (inputH > 83) inputH = 83;

                setContentHeight({ height: inputH });
              }}
              onChangeText={(text) => {
                if (text.length > 0 && text[-1] != "\n") {
                  setMsg({ message: text });
                } else {
                  setMsg({ message: "" });
                }
              }}
            />
          </View>
          <TouchableHighlight
            activeOpacity={0.6}
            color="#247DCF"
            onPress={() => {
              currentMessage.message !== ""
                ? sender(currentMessage, setMsg)
                : null;
            }}
            style={{ width: "100%", height: 60, flex: 1, borderRadius: 30 }}
          >
            <View
              style={{
                backgroundColor: "#F1F1F1",
                padding: 20,
                borderRadius: 30,
                height: "100%",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                height="100%"
                width="100%"
              >
                <Path
                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  fill="#B9B9B9"
                  fillRule="evenodd"
                />
              </Svg>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    color: "#B9B9B9",
    textAlign: "center",
  },
  root: {
    width: "100%",
    flex: 1,
    padding: 10,
  },
  ver_container: {
    padding: 10,
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
  },
  user: {
    width: 40,
    height: 40,
    marginLeft: 30,
    borderRadius: 50,
  },
  user_self: {
    width: 40,
    height: 40,
    marginRight: 30,
    borderRadius: 50,
    backgroundColor: "#F1f1f1",
  },
  simp_image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  name: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "justify",
    lineHeight: 40,
    marginLeft: 15,
  },
  message_area: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  message_box: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
  },
  message_side: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "flex-start",
    margin: 3,
  },
  message_self_side: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "flex-end",
    margin: 3,
  },
  message_mid: {
    fontWeight: "300",
    fontSize: 14,
    alignItems: "flex-start",
    flex: 3,
    margin: 2,
  },
  message_self_mid: {
    fontWeight: "300",
    fontSize: 14,
    alignItems: "flex-end",
    flex: 3,
    margin: 2,
  },
  message_self: {
    fontWeight: "300",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 20,
    margin: 10,
    borderRadius: 20,
    borderWidth: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#F1F1F1",
    overflow: "hidden",
  },
  message: {
    fontWeight: "300",
    fontSize: 14,
    textAlign: "left",
    lineHeight: 20,
    // flex:1,
    margin: 10,
    borderRadius: 20,
    borderWidth: 10,
    backgroundColor: "#F1F1F1",
    borderColor: "#F1F1F1",
    overflow: "hidden",
  },
  time: {
    fontWeight: "300",
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 40,
    flex: 1,
  },
});

export default ChatScreen;
