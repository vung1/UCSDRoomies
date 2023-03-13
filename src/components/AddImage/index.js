import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";

function AddImage(props) {
  
  const { storeImage, saveImage } = props;

  const [image, setImage] = useState(storeImage);

  const addImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(JSON.stringify(img));
    if (!img.canceled) {
      setImage(img.assets[0].uri);
      saveImage(img.assets[0].uri);
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage}>
          <Text>{image ? "  Edit" : " Upload"} Image </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddImage;
