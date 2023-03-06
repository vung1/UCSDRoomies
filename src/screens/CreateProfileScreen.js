import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

import { db } from "../../firebase";
import LoginLogo from "../components/LoginLogo";
import useAuth from "../hooks/useAuth";

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
      navigation.navigate("MatchesScreen");
    });
  };

  return (
    <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>
      <LoginLogo />
      <Text style={tailwind("text-xl font-bold")}>Create Profile</Text>
      <Text>Step 1: Upload a Profile Picture</Text>
      <TextInput
        value={image}
        onChangeText={(imageText) => setImage(imageText)}
        placeholder="Enter a profile picture URL"
      />

      <Text>Step 2: First Name</Text>
      <TextInput
        value={firstName}
        onChangeText={(nameText) => setFirstName(nameText)}
        placeholder="Enter your first name"
      />

      <Text>Step 3: Last Name</Text>
      <TextInput
        value={lastName}
        onChangeText={(nameText) => setLastName(nameText)}
        placeholder="Enter your second name"
      />

      <Text>Step 4: The Age</Text>
      <TextInput
        value={age}
        onChangeText={(ageText) => setAge(ageText)}
        keyboardType="numeric"
        placeholder="Enter your age"
      />

      <Text>Step 5: The Bio</Text>
      <TextInput
        value={bio}
        onChangeText={(bioText) => setBio(bioText)}
        placeholder="Write a short bio about yourself"
      />

      <Text>Step 6: The Major</Text>
      <TextInput
        value={major}
        onChangeText={(majorText) => setMajor(majorText)}
        placeholder="Enter your major"
      />

      <Text style={styles.ttext}>Step 7: The Hobbies</Text>
      <TextInput
        value={hobbies}
        onChangeText={(hobbiesText) => setHobbies(hobbiesText)}
        placeholder="Enter your interests"
      />

      <TouchableOpacity disabled={incompleteForm} style={styles.button}>
        <Text syle={tailwind("text-xl font-bold")}>Create Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: 40,
    width: '60%',
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  }
});

export default CreateProfileScreen;
