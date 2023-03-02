import React from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

const CreateProfileScreen = () => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind("flex-1 items-center")}>
      <Image
        style={tailwind("h-20 w-full")}
        resizeMode="contain"
        source={{ uri: "https://i.imgur.com/pPX20oJ.png" }}
      />
      <Text style={tailwind("text-xl font-bold")}>Create Profile</Text>

      <Text>Step 1: Upload a Profile Picture</Text>
      <TextInput placeholder="Enter a profile picture URL" />

      <Text>Step 2: The Bio</Text>
      <TextInput placeholder="Write a short bio about yourself" />

      <Text>Step 3: The Age</Text>
      <TextInput placeholder="Enter your age" />

      <Text>Step 4: The Major</Text>
      <TextInput placeholder="Enter your major" />

      <Text>Step 5: The Hobbies</Text>
      <TextInput placeholder="Enter your interests" />

      <TouchableOpacity style={tailwind("")}>
        <Text syle={tailwind("black")}>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProfileScreen;
