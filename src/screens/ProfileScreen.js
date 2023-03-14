/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
  ImageBackground,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { getDoc, doc } from "@firebase/firestore";
import IconMenu from "../components/IconMenu";
import useAuth from "../hooks/useAuth";
import { db, auth } from "../../firebase";

// import React from "react";

function ProfileScreen({ route, navigation }) {
  const { currentUser } = route.params;
  const { user, logOut } = useAuth();
  const [userD, setUserData] = useState([]);
  const [load, setLoad] = useState(false);

  let userData = currentUser || userD;

  useEffect(() => {
    async function getDocuments() {
      await getDoc(doc(db, "users", user.uid)).then((docSnapshot) => {
        // const currentUserData = docSnapshot.data();
        setUserData(docSnapshot.data());
        userData = currentUser || userD;
      });
    }
    getDocuments().then(() => {
      setLoad(true);
    });

    console.log(userData);
  }, [load]);

  const Tab = createMaterialTopTabNavigator();

  function Posts({ currentRoute }) {
    const { type } = currentRoute.params;
    const imageGall =
      type === "user" ? userData.userImages : userData.houseImages;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {imageGall &&
            imageGall.map((img) => (
              <View
                style={{
                  padding: 5,
                  width: "50%",
                  height: 150,
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    backgroundColor: "grey",
                  }}
                  source={{ uri: img }}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }

  const tabBarOptions = ({ currentRoute }) => ({
    tabBarShowLabel: false,
    tabBarIndicatorStyle: {
      backgroundColor: "black",
      height: 1.5,
    },
    tabBarIcon: ({ focused }) => {
      let color;
      if (currentRoute.name === "Apartment") {
        color = focused ? "black" : "grey";
        return <MaterialIcons name="apartment" size={23} color={color} />;
      }
      if (currentRoute.name === "Posts") {
        color = focused ? "black" : "grey";
        return <MaterialIcons name="perm-identity" size={23} color={color} />;
      }
    },
    tabBarLabel: () => {
      return null;
    },
  });

  const infoSec = (type, name) => (
    <>
      <View
        style={{
          alignItems: "left",
        }}
      >
        <Text
          style={{
            paddingVertical: 10,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
      </View>

      {type.map((abt) => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.title}>
            <Text>{abt.split(":")[0]}</Text>
          </View>
          <View style={styles.input}>
            <Text style={{ color: "grey" }}>{abt.split(":")[1]}</Text>
          </View>
        </View>
      ))}
    </>
  );

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <View style={{ width: "100%", height: "90%" }}>
        <View style={{ flex: 4, width: "100%", flexDirection: "column" }}>
          <View style={styles.first}>
            <View
              style={{
                transform: [{ scaleX: 0.125 }],
                marginTop: "10%",
                justifyContent: "center",
                flexDirection: "column",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  paddingVertical: 20,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                Profile
              </Text>

              <Image
                source={{ uri: userData.userimage }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
              <Text
                style={{
                  paddingVertical: 10,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {userData.firstName}, {userData.age}
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              right: "8%",
              top: "16%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                logOut();
              }}
              style={{
                backgroundColor: "white",
                height: 25,
                width: 80,
                borderRadius: 12.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.second}>
            {/* ABOUT */}
            {infoSec(
              [`Major:${userData.major}`, `Interests:${userData.hobbies}`],
              "About",
            )}

            {/* Line */}
            <View
              style={{
                marginTop: 15,
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />

            {/* Apartment */}
            {userData.userType
              ? infoSec(
                  [`House Information:${userData.houseInfo}`],
                  "Apartment",
                )
              : null}
          </View>
        </View>

        {/* picture section */}
        <View style={{ flex: 3, backgroundColor: "white" }}>
          <Tab.Navigator style={{ backgroundColor: "white" }}>
            <Tab.Screen
              name="Posts"
              component={Posts}
              initialParams={{ type: "user" }} // TODO:connect to firebase
              options={tabBarOptions}
            />
            {userData.userType ? (
              <Tab.Screen
                name="Apartment"
                component={Posts}
                initialParams={{ type: "house" }} // TODO:connect to firebase
                options={tabBarOptions}
              />
            ) : null}
          </Tab.Navigator>
        </View>
      </View>

      <IconMenu
        navigation={navigation}
        screenCurr="ProfileScreen"
        screenCurrName="ProfileScreen"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    alignItems: "flex-end",
    padding: 3,
  },
  title: {
    flex: 1,
    alignItems: "flex-start",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
    flex: 1,
  },
  first: {
    flex: 3,
    backgroundColor: "#247DCF",
    alignSelf: "center",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    transform: [{ scaleX: 8 }],
  },
  second: {
    marginLeft: 20,
    marginRight: 20,
    // flex:2,
    minHeight: 5,
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});

export default ProfileScreen;
