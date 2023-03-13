import React, { useState } from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import AddImage from "../AddImage";

function ProfileHideComponents(props) {
  const {
    hide,
    sethouseInfo,
    setHouseImage1,
    setHouseImage2,
    setHouseImage3,
    setHouseImage4,
  } = props;

  const [houseInfo, sethouseInfoCurr] = useState(null);

  if (!hide) {
    return null;
  }

  return (
    <View>
      <Text style={styles.stepTitle}>Step 10: Your Leasing Information</Text>
      <View style={styles.largeInputContainer}>
        <TextInput
          value={houseInfo}
          style={styles.inputText}
          multiline
          onChangeText={(bioText) => {
            sethouseInfoCurr(bioText);
            sethouseInfo(bioText);
          }}
          placeholder="Write a short bio about yourself"
        />
      </View>

      <Text style={styles.stepTitle}>Step 11: Your Leasing Photos</Text>

      <ScrollView style={styles.scrollContainer} horizontal>
        <View style={styles.scrollImage}>
          <AddImage saveImage={setHouseImage1} />
        </View>
        <View style={styles.scrollImage}>
          <AddImage saveImage={setHouseImage2} />
        </View>
        <View style={styles.scrollImage}>
          <AddImage saveImage={setHouseImage3} />
        </View>
        <View style={styles.scrollImage}>
          <AddImage saveImage={setHouseImage4} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    marginLeft: "10%",
    fontSize: 16,
    marginTop: "5%",
  },
  largeInputContainer: {
    marginTop: "1%",
    height: 80,
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
  },
  inputText: {
    height: "100%",
    width: "90%",
  },
  scrollContainer: {
    width: "80%",
    marginTop: "1%",
    marginLeft: "10%",
    paddingHorizontal: 2,
  },
  scrollImage: {
    height: 100,
    width: 100,
    paddingRight: 5,
  },
});

export default ProfileHideComponents;
