import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTailwind } from "tailwind-rn";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { updateCurrentUser } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../firebase";
import useAuth from "../hooks/useAuth";

function ModelScreen() {
  const tailwind = useTailwind();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [education, setEducation] = useState(null);
  const [major, setMajor] = useState(null);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const SetUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      firstName,
      lastName,
      age,
      classification: education,
      majors: major,
      photoURL: image,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("HomeScreen", "HomeScreen");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>

      <Text style={tailwind("font-bold")}>Step 1: First Name</Text>
      <TextInput
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={tailwind("text-xl")}
        placeholder="Enter your first name"
      />

      <Text style={tailwind("font-bold")}>Step 2: Last Name</Text>
      <TextInput
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={tailwind("text-xl")}
        placeholder="Enter your last name"
      />

      <Text style={tailwind("font-bold")}>Step 3: Age</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        style={tailwind("text-xl")}
        placeholder="Enter your age"
      />

      <Text style={tailwind("font-bold")}>Step 4: Education Level</Text>
      <TextInput
        value={education}
        onChangeText={(text) => setEducation(text)}
        style={tailwind("text-xl")}
        placeholder="Enter your education level"
      />

      <Text style={tailwind("font-bold")}>Step 5: Major</Text>
      <TextInput
        value={major}
        onChangeText={(text) => setMajor(text)}
        style={tailwind("text-xl")}
        placeholder="Enter your major"
      />

      <Text style={tailwind("font-bold")}>Step 6: The Profile Pic</Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        style={tailwind("text-xl")}
        placeholder="Enter a Profile Pic URL"
      />

      <TouchableOpacity onPress={SetUserProfile}>
        <Text style={styles.title}>Set Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default ModelScreen;
