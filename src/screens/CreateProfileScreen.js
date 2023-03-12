import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

import { db } from "../../firebase";
import useAuth from "../hooks/useAuth";
import AddImage from "../components/AddImage";
import ProfileHideComponents from "../components/ProfileHideComponents";

function CreateProfileScreen({ navigation }) {
  const tailwind = useTailwind();
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

    // console.log(userImages, houseImages, houseInfo);
    // console.log(user.uid, firstName, lastName, age, bio, major, hobbies, userType);

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
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("HomeScreen");
      })
      .catch((error) => console.log("TTTTTTT error", error.message));
  };

  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      <View style={{ marginTop: 70 }}></View>

      <Text style={tailwind("text-xl font-bold top-3")}>Create Profile</Text>

      <ScrollView style={styles.profileContainer} vertical>
        <Text style={styles.stepTitle}>Step 1: Upload a Profile Picture</Text>
        <View style={styles.imageContainer}>
          <AddImage saveImage={setUserImage} />
        </View>

        <Text style={styles.stepTitle}>Step 2: First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={firstName}
            style={styles.inputText}
            onChangeText={(nameText) => setFirstName(nameText)}
            placeholder="Enter your first name"
          />
        </View>

        <Text style={styles.stepTitle}>Step 3: Last Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={lastName}
            style={styles.inputText}
            onChangeText={(nameText) => setLastName(nameText)}
            placeholder="Enter your second name"
          />
        </View>

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

        <Text style={styles.stepTitle}>Step 5: Your Bio</Text>
        <View style={styles.largeInputContainer}>
          <TextInput
            value={bio}
            style={styles.inputText}
            multiline={true}
            onChangeText={(bioText) => setBio(bioText)}
            placeholder="Write a short bio about yourself"
          />
        </View>

        <Text style={styles.stepTitle}>Step 6: Your Major</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={major}
            style={styles.inputText}
            onChangeText={(majorText) => setMajor(majorText)}
            placeholder="Enter your major"
          />
        </View>

        <Text style={styles.stepTitle}>Step 7: Your Hobbies</Text>
        <View style={styles.largeInputContainer}>
          <TextInput
            value={hobbies}
            style={styles.inputText}
            multiline={true}
            onChangeText={(hobbiesText) => setHobbies(hobbiesText)}
            placeholder="Enter your interests"
          />
        </View>

        <Text style={styles.stepTitle}>Step 8: Your Photos</Text>

        <ScrollView style={styles.scrollContainer} horizontal>
          <View style={styles.scrollImage}>
            <AddImage saveImage={setUserImage1} />
          </View>
          <View style={styles.scrollImage}>
            <AddImage saveImage={setUserImage2} />
          </View>
          <View style={styles.scrollImage}>
            <AddImage saveImage={setUserImage3} />
          </View>
          <View style={styles.scrollImage}>
            <AddImage saveImage={setUserImage4} />
          </View>
        </ScrollView>

        <Text style={styles.stepTitle}>Step 9: Already Have A Leasing?</Text>
        <Switch
          value={userType}
          onValueChange={(value) => setUserType(value)}
          style={styles.switch}
        />

        <ProfileHideComponents
          hide={userType}
          sethouseInfo={sethouseInfo}
          setHouseImage1={setHouseImage1}
          setHouseImage2={setHouseImage2}
          setHouseImage3={setHouseImage3}
          setHouseImage4={setHouseImage4}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={incompleteForm}
            onPress={() => {
              console.log("Build Profile");
              updateUserProfile();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  profileContainer: {
    width: "100%",
    marginTop: "5%",
  },
  stepTitle: {
    marginLeft: "10%",
    fontSize: 16,
    marginTop: "5%",
  },
  imageContainer: {
    width: 100,
    hight: 100,
    marginTop: "1%",
    marginLeft: "10%",
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
    paddingRight: 5,
  },
  switch: {
    marginTop: "1%",
    marginLeft: "10%",
  },
  buttonContainer: {
    height: 180,
    alignItems: "center",
  },
  button: {
    height: 40,
    width: "60%",
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CreateProfileScreen;
