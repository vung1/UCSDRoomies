import React from "react";
import { View, Text, TextInput, StyleSheet, SafeAreaView, Image, Button, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import user_prof from "../../assets/data/user_prof";
import BackArrow from "../components/BackArrow";
import Svg, { Path } from "react-native-svg";
// import TypeInBox from "../components/TypeInBox";


function ChatScreen({ route, navigation }) {
  const { user } = route.params;
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
            <Image source={{ uri: user.image }} style={styles.simp_image} />
          </View>
          <Text style={styles.name}>{user.name.split(" ")[0]}</Text>
        </View>
      </View>

      <View style={styles.message_area}>
        <ScrollView style={styles.scrollView} vertical>
          {user.messages.map((msg) => (
            <View style={styles.message_box}>
              {/* other one  */}
              {msg.split(":")[0] !== "me" ? (
                <>
                  <View style={styles.message_side}>
                    <View style={styles.user} key={user.id}>
                      <Image
                        source={{ uri: user.image }}
                        style={styles.simp_image}
                      />
                    </View>
                  </View>
                  <View style={styles.message_mid}>
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
          ))}
        </ScrollView>
      </View>

      <View style={{flex:1, padding:10}}>
        <TypeInBox currMsg={user.messages}/>
      </View>
    </SafeAreaView>
  );
}


function sender(msg, setMsg, currMsg){
  var hour = new Date().getHours();
  var min = new Date().getMinutes();
  return (
    console.log("sent " + msg.message ),
    currMsg.push("me:"+msg.message+"\n"+hour +":"+min),
    setMsg({message: ""}),
    console.log(currMsg)
  )
}

function TypeInBox(props) {

  const {currMsg} = props;
  const [number, onChangeText] = React.useState("");
  const [contentHeight, setContentHeight] = React.useState({ height: 90 });
  // this.state = {msg :""};
  const [msg, setMsg] = React.useState({ message: "" });
  // this.onContentSizeChange = this.onContentSizeChange.bind(this);
  // console.log("outside "+typeof(contentHeight));
  return (
    <View style={{flexDirection:"row", alignItems:"center", }}>
      <View style={{flex:5}}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Type Something..."
        keyboardType="default"
        returnKeyType="send"
        value={msg.message}
        onKeyPress={(e) => {
            if(e.nativeEvent.key == 'Enter'){
              sender(msg, setMsg, currMsg)
            }
          }
        }
        onContentSizeChange={(e) => {
          let inputH = Math.max(e.nativeEvent.contentSize, 60);
          if (inputH > 100) inputH = 100;
          // console.log("inside "+typeof(inputH));
          setContentHeight(contentHeight + inputH);
        }}
        onChangeText={(text) => {
          setMsg({message: text})
          }
        }
        
      />
    </View>
    <View style={{
      flex:1, 
      backgroundColor:"#F1F1F1",
      padding: 20,
      borderRadius: 30,
      height: "80%",
      alignItems: "center",
      flexDirection:"column",
      }}>
          <TouchableOpacity
          onPress={() => {
            sender(msg, setMsg, currMsg)
          }
          }
          style={{ width: "100%", height: "100%" }}
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
          </TouchableOpacity>
    </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  input: {
    margin: 5,
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBotton: 20,
    borderRadius: 30,
    borderWidth:10,
    borderColor: "#F1F1F1",
    backgroundColor: "#F1F1F1",
    selectionColor: "#F1F1F1",
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
    textAlign: "right",
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
