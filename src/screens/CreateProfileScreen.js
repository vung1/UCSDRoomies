import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

import { db } from "../../firebase";
import LoginLogo from "../components/LoginLogo";
import useAuth from "../hooks/useAuth";
import { fontWeights } from "react-native-wind/dist/styles/typography/font-weight";

function CreateProfileScreen({ navigation }) {
  const tailwind = useTailwind();
  const user = useAuth();

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [bio, setBio] = useState(null);
  const [age, setAge] = useState(null);
  const [major, setMajor] = useState(null);
  const [hobbies, setHobbies] = useState(null);

  const incompleteForm = !image || !bio || !age || !major || !hobbies;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      image,
      firstName,
      lastName,
      bio,
      age,
      major,
      hobbies,
      timestamp: serverTimestamp,
    }).then(() => {
      navigation.navigate("HomeScreen");
    });
  };

  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      
      <LoginLogo />

      <Text style={tailwind("text-xl font-bold top-3")}>Create Profile</Text>

      <ScrollView style={styles.profileContainer} vertical>

        <Text style={styles.stepTitle}>Step 1: Upload a Profile Picture</Text>
        {/* <View style={styles.inputContainer}>
          <TextInput
            value={image}
            onChangeText={(imageText) => setImage(imageText)}
            placeholder="Enter a profile picture URL"
          />
        </View> */}

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

        <Text style={styles.stepTitle}>Step 4: The Age</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={age}
            style={styles.inputText}
            onChangeText={(ageText) => setAge(ageText)}
            keyboardType="numeric"
            placeholder="Enter your age"
          />
        </View>

        <Text style={styles.stepTitle}>Step 5: The Bio</Text>
        <View style={styles.largeInputContainer}>
          <TextInput
            value={bio}
            style={styles.inputText}
            multiline={true}
            onChangeText={(bioText) => setBio(bioText)}
            placeholder="Write a short bio about yourself"
          />
        </View>

        <Text style={styles.stepTitle}>Step 6: The Major</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={major}
            style={styles.inputText}
            onChangeText={(majorText) => setMajor(majorText)}
            placeholder="Enter your major"
          />
        </View>

        <Text style={styles.stepTitle}>Step 7: The Hobbies</Text>
        <View style={styles.largeInputContainer}>
          <TextInput
            value={hobbies}
            style={styles.inputText}
            multiline={true}
            onChangeText={(hobbiesText) => setHobbies(hobbiesText)}
            placeholder="Enter your interests"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={incompleteForm} style={styles.button}>
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
  inputContainer: {
    marginTop: "1%",
    height: 30,
    width: "80%",
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
  buttonContainer: {
    height: 180,
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: '60%',
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  }
});

export default CreateProfileScreen;
