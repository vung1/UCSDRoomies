// import React from "react";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
// import * as ImagePicker from "react-native-image-picker"
import * as ImagePicker from "expo-image-picker";
// import ImagePicker from 'react-native-image-crop-picker';

export default function ImagePick() {
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}

// const App =() => {

//   const uploadImage = async () => {
//     ImagePicker.openPicker({
//     width: 300,
//     height: 400,
//     cropping: true
//   }).then(image => {
//     console.log(image);
//   }).catch(error => console.log(error));
// }
//   return(
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

//        <Button title="Pick an image from camera roll" onPress={uploadImage} color = "tomato" />
//     </View>
//   );
// };

// export default App ;
