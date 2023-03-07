import React, {useState, useEffect, useRef} from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, Button, TouchableOpacity, TouchableHighlight } from "react-native";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import user_prof from "../../assets/data/user_prof";
import BackArrow from "../components/BackArrow";
import Svg, { Path } from "react-native-svg";
import { db, auth } from "../../firebase";
import { doc, getDoc, getDocs, onSnapshot, setDoc, serverTimestamp, collection } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import firebase from "firebase/compat/app";

function ChatScreen({ route, navigation }) {
  const { user } = route.params;
  // const { firebase_user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [contentHeight, setContentHeight] = React.useState({ height: 90 });
  const [msg, setMsg] = React.useState({ message: "" });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const scrollViewRef = useRef();
  var prevTime = 0;
  const [messages, setAllMessages] = useState([]);
  const key = auth.currentUser.uid + "_" + user.id;
  // console.log(key);

  useEffect(() => {
    // Get message history from firebase
    const getMessages = async() => { 
      const docSnap = await getDoc(doc(db, "message_for_all", "all_messages"));
      if (docSnap.exists()) {
        const firebase_messages_list = docSnap.data();
        setAllMessages(firebase_messages_list[key]);
      } else {
        console.log("No such document!");
      }
    }
    getMessages();

  }, [db]);

  console.log(messages);

  async function sender(msg, setMsg){
    var hour = new Date().getHours();
    var min = new Date().getMinutes();
    
    messages.push("me:"
    +((msg.message[-1] != "\n") ? msg.message : msg.message.slice(-1)) +"\n"
    + ((hour >= 10)? hour : "0" + hour) +":"+((min >= 10)? min : "0" + min)),
    console.log(messages),
    setMsg({message: ""})

    // intergrate with firebase
    const timestamp = ((hour >= 10)? hour : "0" + hour) +":"+((min >= 10)? min : "0" + min);
    const value = auth.currentUser.uid + ":" + msg.message + "\n" + timestamp; // TODO: should change to server time serverTimestamp();

    // set messages to firebase message_for_all
    messages.push(value);
    // console.log("updated user messages history:", curr_user_messages);

    const docData = {
      [key]: messages, 
    };
    await setDoc(doc(db, "message_for_all", "all_messages"), docData);

    // store messages to each user in firebase
    db.collection("users").doc(auth.currentUser.uid).collection("messages").doc(user.id).set({ //auth.currentUser.uid, "messages").doc(user.id).set({
      [auth.currentUser.uid]: key
    });
  };

  function currentTimeLag(msg){
    {/* TODO */}
    // var time = msg.split("\n").slice(-1)[0].split(":").join("");
    // var lag = prevTime - time;
    // console.log("msg: " + msg + "time "+time+ " prevTime "+prevTime + " lag "+lag);
    // prevTime = time;
    // return lag > 0 || lag < -10;
  };

  return (
    <SafeAreaView style={styles.ver_container}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>

          <BackArrow
            navigation={navigation}
            screen="MatchesScreen"
            screenName="Matches"
          />
  
          <View style={styles.user} key={user.id}>
            <Image source={{ uri: user.photoURL }} style={styles.simp_image} />
          </View>
          <Text style={styles.name}>{user.firstName}</Text>
        </View>
      </View>

      <View style={styles.message_area}>
        <ScrollView 
        style={styles.scrollView} 
        vertical
        refreshControl ={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
        >
           {(messages.length == 0) ? 
           <Text 
           style={styles.bar}>
            New message
            </Text> 
           : messages.map((msg) => (
           <>
           { (currentTimeLag(msg)) ? 
           <Text style={styles.bar}>
            {/* TODO */}
            {msg.split("\n").slice(-1)[0]}
            </Text>:<Text style={styles.bar}></Text> }
            <View style={styles.message_box}>
              {/* TODO */}
              {msg.split(":")[0] !== "me" ? (
                <>
                  <View style={styles.message_side}>
                    <View style={styles.user} key={user.id}>
                      <Image
                        source={{ uri: user.photoURL }}
                        style={styles.simp_image}
                      />
                    </View>
                  </View>
                  <View style={styles.message_mid}>
                    {/* TODO */}
                    <Text style={styles.message}>{msg.split("\n")[0]}</Text> 
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
                      {msg.split(":").slice(1).join(":").split("\n")[0]}
                    </Text>
                  </View>
                  <View style={styles.message_self_side}>
                    <View style={styles.user_self} key={user.id}>
                      <Image
                        source={{ uri: user_prof[0].image }}
                        style={styles.simp_image}
                      />
                    </View>
                  </View>
                </>
              )} 
              
            </View>
           </> 
          ))}
        </ScrollView>
      </View>

      <View style={{flex:1, padding:10}}>
      <View style={{flexDirection:"row", alignItems:"center", }}>
      <View style={{
          flex: 5,
          margin: 5,
          height: contentHeight.height,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 5,
          paddingBotton: 20,
          borderRadius: 30,
          borderWidth:10,
          borderColor: "#F1F1F1",
          backgroundColor: "#F1F1F1",
          selectionColor: "#F1F1F1",
        }}>
      <TextInput
        style={{
          height: contentHeight.height - 30,
          borderColor: "#F1F1F1",
          backgroundColor: "#F1F1F1",
          selectionColor: "#F1F1F1",
        }}
        placeholder="Type Something..."
        keyboardType="default"
        blurOnSubmit={true}
        returnKeyType="blur"
        multiline
        value={msg.message}
        onContentSizeChange={(e) => {
          let inputH = Math.max(e.nativeEvent.contentSize.height+43, 60);
          if (inputH > 83) inputH = 83;
          
          setContentHeight({height: inputH});
        }}
        onChangeText={(text) => {
          ((text.length > 0 && text[-1] != "\n") ? setMsg({message: text}): null)
          }
        }
        
      />
    </View>
    <TouchableHighlight
          activeOpacity={0.6}
          color="#247DCF"
          onPress={() => {
            ((msg.message != "") ? sender(msg, setMsg) : null)
          }
          }
          style={{ width: "100%", height: 60, flex:1, borderRadius: 30,}}
          >
    <View style={{
      
      backgroundColor:"#F1F1F1",
      padding: 20,
      borderRadius: 30,
      height: "100%",
      alignItems: "center",
      flexDirection:"column",
      }}>
          
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
    color:"#B9B9B9",
    textAlign:"center"
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
    flex: 1
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
