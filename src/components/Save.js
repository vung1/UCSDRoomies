import React, { View, Image } from "react-native";
import { useState } from "react";
import Feather from "@icons/material/FeatherIcon";
// import firebase from 'firebase'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "@firebase/storage";

// require("firebase/firestore")
// require("firebase/firebase-storage")
export default function Save({ route }) {
  // const { image } = route.params;
  // Line below is supposed to show the image uri in the console

  // console.log("CONSOLE" + route.params.image);
  // const UploadImage = async () => {
  //   const uri = route.params.image
  //   const cPath = `posts/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
  //   console.log(cPath)

  //   const response = await fetch(uri)
  //   // #responsible for  blob  will pass to firestore, which will then upload image
  //   const blob= await response.blob();
  //   //  Generates a random number that has 36 chars
  //   // cblob tells firebase storage which file it is and put blob starts upload process
  //   const task = firebase.storage().ref().child(cPath).put(blob);

  //   const taskProgress = snapshot=> {
  //     console.log(`transferred: ${snapshot.bytesTransferred}`)
  //   }
  //   const taskCompleted = () => {
  //         task.snapshot.ref.getDownloadURL().then((snapshot)=>{
  //           console.log(snapshot)
  //         })
  //   }

  //   const taskError = snapshot => {
  //     console.log(snapshot)

  //   }
  //   // Has the task state chaged? What do the tasks have to show?
  //   task.on("state_changed", taskProgress, taskError, taskCompleted)
  // }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: route.params.image }} />
      <Feather
        name="check"
        size={24}
        color="green"
        onPress={() => {
          UploadImage();
        }}
      />
    </View>
  );
}
