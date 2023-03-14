import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  JSON,
} from "react-native";
import Svg, { Path } from "react-native-svg";

function sender(msg, setMsg, currMsg) {
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  return (
    console.log(`sent ${msg.message}`),
    currMsg.push(`me:${msg.message}\n${hour}:${min}`),
    setMsg({ message: "" }),
    console.log(currMsg)
  );
}

function TypeInBox(props) {
  const { currMsg } = props;
  const [number, onChangeText] = React.useState("");
  const [contentHeight, setContentHeight] = React.useState({ height: 90 });
  // this.state = {msg :""};
  const [msg, setMsg] = React.useState({ message: "" });
  // this.onContentSizeChange = this.onContentSizeChange.bind(this);
  // console.log("outside "+typeof(contentHeight));
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 5 }}>
        <TextInput
          style={styles.input}
          placeholder="Type Something..."
          keyboardType="default"
          returnKeyType="send"
          value={msg.message}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter") {
              sender(msg, setMsg, currMsg);
            }
          }}
          onContentSizeChange={(e) => {
            let inputH = Math.max(e.nativeEvent.contentSize, 60);
            if (inputH > 100) inputH = 100;
            // console.log("inside "+typeof(inputH));
            setContentHeight(contentHeight + inputH);
          }}
          onChangeText={(textMessage) => {
            onChangeText();
            setMsg({ message: textMessage });
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F1F1F1",
          padding: 20,
          borderRadius: 30,
          height: "80%",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            sender(msg, setMsg, currMsg);
          }}
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
    borderWidth: 10,
    borderColor: "#F1F1F1",
    backgroundColor: "#F1F1F1",
    selectionColor: "#F1F1F1",
  },
});

export default TypeInBox;
