import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";

import { useTailwind } from "tailwind-rn";

import AntIcon from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-deck-swiper";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  serverTimestamp,
} from "@firebase/firestore";

import IconMenu from "../components/IconMenu";
import HomeLogo from "../components/HomeLogo";
import { db, auth } from "../../firebase";

import useAuth from "../hooks/useAuth";
import users from "../../assets/data/users";

const nopePNG = require("../../assets/images/nope.png");
const likePNG = require("../../assets/images/like.png");

function HomeScreen({ navigation }) {
  // const navigation = useNavigation();
  const swipeRef = React.useRef(null);
  const tailwind = useTailwind();
  const { user } = useAuth(); // auth.currentUser;
  const [profiles, setProfiles] = useState([]);
  const [passesUserIds, setPassesIds] = useState([]);
  const [swipesUserIds, setSwipesIds] = useState([]);
  const [userType, setUserType] = useState(false);

  // if the database is empty, redirect to ModelScreen
  // useLayoutEffect(() => onSnapshot(doc(db, "users", user.uid), (snapshot) => {
  //   if (!snapshot.exists()) {
  //     navigation.navigate("ModelScreen");
  //   }
  // }), []);

  useEffect(() => {
    let unsub;

    async function getDocuments() {
      await getDoc(doc(db, "users", user.uid)).then((docSnapshot) => {
        setUserType(docSnapshot.data().userType);
      });
    }
    getDocuments();

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes"),
      ).then((snapshot) => snapshot.docs.map((document) => document.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes"),
      ).then((snapshot) => snapshot.docs.map((document) => document.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      // console.log(passes, passedUserIds, swipes, swipedUserIds)

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        setPassesIds(docSnap.data().passes);
        setSwipesIds(docSnap.data().swipes);
      }

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds]),
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((document) => document.id !== user.uid)
              .filter((document) => document.data().userType !== userType)
              .map((document) => ({
                id: document.id,
                swipe_pass_timestamp: serverTimestamp(),
                ...document.data(),
              })),
          );
        },
      );
    };

    fetchCards();
    return unsub;
  }, [profiles, userType]); // [userType, profiles, user.uid]);

  // console.log(profiles);

  const swipeLeft = async (cardIndex) => {
    // const profiles = DUMMY_DATA;

    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`you swiped PASS on ${userSwiped.firstName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);

    passesUserIds.push(userSwiped.id);
    setPassesIds(passesUserIds);
    updateDoc(doc(db, "users", user.uid), { passes: passesUserIds });
  };

  const swipeRight = async (cardIndex) => {
    // const profiles = DUMMY_DATA;

    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`you swiped on ${userSwiped.firstName}`);

    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);

    swipesUserIds.push(userSwiped.id);
    setSwipesIds(swipesUserIds);
    updateDoc(doc(db, "users", user.uid), { swipes: swipesUserIds });
  };

  return (
    <View testID="view.container" style={styles.pageContainer}>
      {/* Header */}
      <View style={styles.logoContainer}>
        {/* ROOMIES LOGO */}
        <View>
          <HomeLogo />
        </View>
        {/* ROOMIES LOGO */}

        {/* FILTER ICON */}
        <TouchableOpacity style={styles.filter}>
          <AntIcon name="filter" size={30} />
        </TouchableOpacity>
        {/* FILTER ICON */}
      </View>
      {/* ENd of Header */}

      <SafeAreaView testID="SAV" style={styles.cardContainer}>
        <View style={styles.animatedCard}>
          <Swiper
            testID="swiper"
            ref={swipeRef}
            // style= {styles.card}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={profiles} // {DUMMY_DATA} // TODO: should be profiles from database
            stackSize={10}
            cardIndex={0}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              console.log("Swipe PASS");
              swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe MATCH");
              swipeRight(cardIndex);
            }}
            overlayLabels={{
              left: {
                title: "No!",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "Yes!",
                style: {
                  label: {
                    color: "#4DE3D0",
                  },
                },
              },
            }}
            renderCard={(currentUser) =>
              currentUser ? (
                <TouchableOpacity
                  onPress={() => {
                    // console.log(currentUser, "this is the currentUser");
                    navigation.navigate("ProfileScreen", {
                      currentUser,
                    });
                  }}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <View key={currentUser.id} style={styles.currentUser}>
                    <Image
                      style={tailwind(
                        "absolute top-0 h-full w-full rounded-xl ",
                      )}
                      source={{ uri: currentUser.userimage }}
                    />
                    <View
                      style={[
                        tailwind(
                          "absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl",
                        ),
                        styles.cardShadow,
                      ]}
                    >
                      <View>
                        <Text style={tailwind("text-xl font-bold")}>
                          {currentUser.firstName}
                        </Text>
                        <Text>{currentUser.classification}</Text>
                      </View>
                      <Text style={tailwind("text-xl font-bold")}>
                        {currentUser.age}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.card}>
                  <Image
                    style={tailwind("absolute top-0 h-full w-full rounded-xl ")}
                    source={{
                      uri: "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/29244092_1881987471874252_4979572236735217664_n.png?stp=dst-png&_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=byICIepiB3EAX-NV2z9&_nc_ht=scontent-lax3-1.xx&oh=00_AfA1Kuv69kBIk7cKjoAg3v_6rnvzE6kXEWmGMyKq-o4s2w&oe=64250DE8",
                    }}
                  />
                </View>
              )
            }
          />
        </View>

        {/* Buttons for matching  */}
        {/* Margin bottom pushes up and margin top pushes down */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID="leftSwipe"
            onPress={() => {
              swipeRef.current.swipeLeft();
            }}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Image source={nopePNG} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              swipeRef.current.swipeRight();
            }}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Image source={likePNG} style={styles.image} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <IconMenu navigation={navigation} screenCurr="HomeScreen" />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  logoContainer: {
    height: "10%",
    width: "100%",
    marginTop: "12%",
    flexDirection: "row",
    justifyContent: "center",
  },
  filter: {
    position: "absolute",
    right: "8%",
    top: "15%",
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 2,
  },
  cardContainer: {
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  animatedCard: {
    flex: 1,
    // backgroundColor: 'red',
    height: "70%",
    top: "-8%",
  },
  currentUser: {
    justifyContent: "center",
    alignItems: "center",
    height: "68%",
  },
  buttonContainer: {
    flexDirection: "row",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  button: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "12%",
  },
  image: {
    width: 65,
    height: 65,
  },
});

export default HomeScreen;
