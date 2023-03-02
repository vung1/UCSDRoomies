import React from "react";
import { View, Text, Image, TextInput } from "react-native";
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

      <Text>Step 2: The Age</Text>
      <TextInput placeholder="Enter your age" />

      <Text>Step 3: The Major</Text>
      <TextInput placeholder="Enter your major" />

      <Text>Step 4: The Hobbies</Text>
      <TextInput placeholder="Enter your interests" />
    </View>
  );
};

export default CreateProfileScreen;
