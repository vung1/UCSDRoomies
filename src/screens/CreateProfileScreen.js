import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

import { db } from "../../firebase";
import useAuth from "../hooks/useAuth";
import AddImage from "../components/AddImage";
import ProfileHideComponents from "../components/ProfileHideComponents";

function CreateProfileScreen({ navigation }) {
  const { user } = useAuth();
  const [userimage, setUserImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [bio, setBio] = useState(null);
  const [age, setAge] = useState(null);
  const [major, setMajor] = useState(null);
  const [hobbies, setHobbies] = useState(null);
  const [userType, setUserType] = useState(false);
  const [houseInfo, sethouseInfo] = useState(null);

  const [userimage1, setUserImage1] = useState(null);
  const [userimage2, setUserImage2] = useState(null);
  const [userimage3, setUserImage3] = useState(null);
  const [userimage4, setUserImage4] = useState(null);

  const [houseimage1, setHouseImage1] = useState(null);
  const [houseimage2, setHouseImage2] = useState(null);
  const [houseimage3, setHouseImage3] = useState(null);
  const [houseimage4, setHouseImage4] = useState(null);

  const ifUserImage = userimage1 || userimage2 || userimage3 || userimage4;
  const ifHouseImage = houseimage1 || houseimage2 || houseimage3 || houseimage4;

  const incompleteForm =
    !userimage ||
    !bio ||
    !age ||
    !major ||
    !hobbies ||
    !ifUserImage ||
    (userType && (!houseInfo || !ifHouseImage));

  const updateUserProfile = () => {
    const houseImages = [];
    if (houseimage1 != null) {
      houseImages.push(houseimage1);
    }
    if (houseimage2 != null) {
      houseImages.push(houseimage2);
    }
    if (houseimage3 != null) {
      houseImages.push(houseimage3);
    }
    if (houseimage4 != null) {
      houseImages.push(houseimage4);
    }

    const userImages = [];
    if (userimage1 != null) {
      userImages.push(userimage1);
    }
    if (userimage2 != null) {
      userImages.push(userimage2);
    }
    if (userimage3 != null) {
      userImages.push(userimage3);
    }
    if (userimage4 != null) {
      userImages.push(userimage4);
    }

    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      userimage,
      firstName,
      lastName,
      age,
      bio,
      major,
      hobbies,
      userImages,
      userType,
      houseInfo,
      houseImages,
      passes : [],
      swipes : [],
      messages: [],
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("HomeScreen");
      })
      .catch((error) => console.log("TTTTTTT error", error.message));
  };
  
  return (

    <View style={{ height: "100%" }}>
      
      <View style={styles.scaleBackground}>
        <View style={{ transform: [{ scaleX: 0.25 }] }}>
          {/* Title */}
          <Text style={styles.screenTitle}> Create Profile </Text>
          {/* User image */}
          <View style={styles.imageContainer}>
            <AddImage storeImage={userimage} saveImage={setUserImage} />
          </View>
        </View>
      </View>

      <ScrollView style={{ width: "100%", marginTop: "3%" }} vertical>
        
        {/* User Image */}
        <Text style={styles.stepTitle}>Step 1: Upload a Profile Picture</Text>
        <View style={{marginTop: "1%"}}></View>

        {/* First Name */}
        <Text style={styles.stepTitle}>Step 2: First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={firstName}
            style={styles.inputText}
            onChangeText={(nameText) => setFirstName(nameText)}
            placeholder="Enter your first name"
          />
        </View>

        {/* Last Name */}
        <Text style={styles.stepTitle}>Step 3: Last Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={lastName}
            style={styles.inputText}
            onChangeText={(nameText) => setLastName(nameText)}
            placeholder="Enter your second name"
          />
        </View>

        {/* Age */}
        <Text style={styles.stepTitle}>Step 4: Your Age</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={age}
            style={styles.inputText}
            onChangeText={(ageText) => setAge(ageText)}
            keyboardType="numeric"
            placeholder="Enter your age"
          />
        </View>

        {/* Bio */}
        <Text style={styles.stepTitle}>Step 5: Your Bio</Text>
        <View style={styles.largeInputContainer}>
          <TextInput
            value={bio}
            style={styles.inputText}
            multiline
            onChangeText={(bioText) => setBio(bioText)}
            placeholder="Write a short bio about yourself"
          />
        </View>

        {/* Major */}
        <Text style={styles.stepTitle}>Step 6: Your Major</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={major}
            style={styles.inputText}
            onChangeText={(majorText) => setMajor(majorText)}
            placeholder="Enter your major"
          />
        </View>

        {/* Hobbies */}
        <Text style={styles.stepTitle}>Step 7: Your Hobbies</Text>
        <View style={styles.largeInputContainer}>
          <TextInput
            value={hobbies}
            style={styles.inputText}
            multiline
            onChangeText={(hobbiesText) => setHobbies(hobbiesText)}
            placeholder="Enter your interests"
          />
        </View>

        {/* Additional Images */}
        <Text style={styles.stepTitle}>Step 8: Your Photos</Text>
        <ScrollView style={styles.scrollContainer} horizontal>
          <View style={styles.scrollImage}>
            <AddImage storeImage={userimage1} saveImage={setUserImage1} />
          </View>
          <View style={styles.scrollImage}>
            <AddImage storeImage={userimage2} saveImage={setUserImage2} />
          </View>
          <View style={styles.scrollImage}>
            <AddImage storeImage={userimage3} saveImage={setUserImage3} />
          </View>
          <View style={styles.scrollImage}>
            <AddImage storeImage={userimage4} saveImage={setUserImage4} />
          </View>
        </ScrollView>

        {/* Leasing Status */}
        <Text style={styles.stepTitle}>Step 9: Already Have A Leasing?</Text>
        <Switch
          value={userType}
          onValueChange={(value) => setUserType(value)}
          style={{ marginTop: "1%", marginLeft: "10%" }}
        />

        {/* Leasing Information */}
        <ProfileHideComponents
          hide={userType}
          sethouseInfo={sethouseInfo}
          houseimage1={houseimage1}
          houseimage2={houseimage2}
          houseimage3={houseimage3}
          houseimage4={houseimage4}
          setHouseImage1={setHouseImage1}
          setHouseImage2={setHouseImage2}
          setHouseImage3={setHouseImage3}
          setHouseImage4={setHouseImage4}
        />

        {/* Button */}
        <View style={{ height: 160, alignItems: "center" }}>
          <TouchableOpacity
            disabled={incompleteForm}
            onPress={() => {
              console.log("Build Profile");
              updateUserProfile();
            }}
            style={styles.button}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Create Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scaleBackground: {
    backgroundColor: "#247DCF",
    alignSelf: "center",
    height: 255,
    width: 200,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    transform: [{ scaleX: 4 }],
  },
  screenTitle: { 
    fontSize: 24, 
    marginTop: "30%", 
    fontWeight: "bold", 
    alignSelf: "center",
    color: "white",
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: "12%",
  },
  stepTitle: {
    marginLeft: "10%",
    fontSize: 16,
    marginTop: "5%",
  },
  inputContainer: {
    height: 30,
    width: "80%",
    marginTop: "1%",
    marginLeft: "10%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
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
  button: {
    height: 40,
    width: "60%",
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
});

export default CreateProfileScreen;
