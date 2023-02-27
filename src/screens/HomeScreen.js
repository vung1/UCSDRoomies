import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
// import React, { useLayoutEffect } from "react";

import { useTailwind } from "tailwind-rn";

import AntIcon from "react-native-vector-icons/AntDesign";
import Swiper from "react-native-deck-swiper";
import { doc, setDoc } from "@firebase/firestore";

import IconMenu from "../components/IconMenu";
import HomeLogo from "../components/HomeLogo";
import { db, auth } from "../../firebase";

// import useAuth from...
const DUMMY_DATA = [
  {
    firstName: "Mya",
    lastName: "Bolds",
    age: 30,
    classification: "Graduate Student",
    majors: "Computer Science",
    photoURL:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/287545022_1091736855020876_5602520662715136881_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gXWtJZMOGMMAX-SmrwU&_nc_ht=scontent-lax3-2.xx&oh=00_AfB4cf7VOZisjFQ8aCaqBDpSuywyk4B8k8VRmWnRIvePGw&oe=63F8C614",
    id: "123",
  },

  {
    firstName: "Victor",
    lastName: "Ung",
    age: 30,
    classification: "Graduate Student",
    majors: "Computer Science",
    photoURL:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/34604303_2112995925596886_8035880099964256256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fqr1cJlYiJgAX8lfcTn&_nc_ht=scontent-lax3-2.xx&oh=00_AfA2u9CK2fhN1wfhUjkyohjV0UHuh2SPOImPkrYnmDm0_w&oe=641B71D5",
    id: "456",
  },

  {
    firstName: "Darlene",
    lastName: "Jiang",
    age: 30,
    classification: "Graduate Student",
    majors: "Computer Science ",
    photoURL:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/326464979_1189459725017205_2497974280865416237_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7T3Dl4mGPA0AX_XHzIl&_nc_ht=scontent-lax3-2.xx&oh=00_AfDQDAAfZdv0PMfZ4E0UP-SuNu5qwcKJ3JxsO1IXi5fNQA&oe=63F95A33",
    id: "789",
  },

  {
    firstName: "Josh",
    lastName: "Yan",
    age: 30,
    classification: "Graduate Student",
    majors: "Computer Science ",
    photoURL:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/37081933_213393819314265_6367120236990169088_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qppccfxWV9oAX-VWNls&_nc_ht=scontent-lax3-1.xx&oh=00_AfCUSGY3klKxDVKn8WUwq2rC3Yt8mzSzueW0_y6VLbmgog&oe=641B6496",
    id: "101112",
  },

  {
    firstName: "Jack",
    lastName: "Sun",
    age: 30,
    classification: "Graduate Student",
    majors: "Computer Science ",
    photoURL:
      "https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/192436271_1214099862361681_8439239647122206602_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9gVc74c9qLEAX8aqgQE&tn=fCUD-PsIbWKfLdzZ&_nc_ht=scontent-lax3-2.xx&oh=00_AfDdr1GFfQRImzwC25eaR91_Odz5aXOfqrcxT5034-M6hQ&oe=641B85CD",
    id: "1052700",
  },

  {
    firstName: "Brian",
    lastName: "Nguyen",
    age: 30,
    classification: "Graduate Student",
    majors: "Computer Science",
    photoURL:
      "https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/289682412_3185058221746238_7439599793167202859_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=L4nOqtfLAtQAX-1iwJr&tn=fCUD-PsIbWKfLdzZ&_nc_ht=scontent-lax3-1.xx&oh=00_AfAcuNjrHlGasTU-RB8b2SaGs-OEUQ2zx96NGf_o1ntArA&oe=63F917C0",
    id: "131415",
  },
];

function HomeScreen({ navigation }) {
  // const navigation = useNavigation();
  const swipeRef = React.useRef(null);
  const tailwind = useTailwind();
  const user = auth.currentUser;

  const swipeLeft = (cardIndex) => {
    const profiles = DUMMY_DATA;

    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`you swiped PASS on ${userSwiped.firstName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };

  const swipeRight = (cardIndex) => {
    const profiles = DUMMY_DATA;

    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`you swiped on ${userSwiped.firstName}`);

    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };

  return (
    // const{logout} = useAuth();

    <View style={styles.pageContainer}>
      {/* Header */}
      {/* flex row item-center justify-between px-5 */}
      {/* <View style = {("flex row items-center justify-between relative px-5")}> */}
      <View style={styles.logoContainer}>
        {/* ROOMIES LOGO */}
        <View>
          <HomeLogo />
        </View>
        {/* ROOMIES LOGO */}

        {/* FILTER ICON */}
        {/* <TouchableOpacity style ={ tailwind(" absolute right-5 top-3")} > */}
        <TouchableOpacity style={styles.filter}>
          <AntIcon name="filter" size={30} />
        </TouchableOpacity>
        {/* <TouchableOpacity style = {tailwind("right-100 top-33")}>
        <AntIcon name = 'filter' size = {30}/>  
      </TouchableOpacity>
      <TouchableOpacity style = {tailwind("right-100 top-33")}>
        <AntIcon name = 'filter' size = {30}/>  
      </TouchableOpacity> */}
        {/* FILTER ICON */}
      </View>
      {/* ENd of Header */}

      {/* {Cards} */}
      {/* style ={tailwind('flex-1 -mt-3')} */}

      {/* <SafeAreaView style = {tailwind("flex-1")} > */}
      <SafeAreaView style={styles.cardContainer}>
        {/* <View style ={tailwind('flex-1')}> */}
        <View style={styles.animatedCard}>
          <Swiper
            ref={swipeRef}
            // style= {styles.card}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={DUMMY_DATA} // TODO: should be profiles from database
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
            renderCard={(card) => (
              // <View key = {card.id} style= {tailwind("relative bg-white h-3/4 rounded-xl")}>
              // <View key = {card.id} style= {tailwind("relative bg-white h-3/4 rounded-xl")}>
              <View key={card.id} style={styles.card}>
                <Image
                  style={tailwind("absolute top-0 h-full w-full rounded-xl ")}
                  source={{ uri: card.photoURL }}
                />
                {/* <Text>{card.name}</Text> */}
                {/* <View style={tailwind('absolute bottom-0 bg-white w-full flex-row justify-between items-between h-20 px-6 py-2 rounded-b-xl')}> */}
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
                      {card.firstName}
                    </Text>
                    {/* <Text style = {{fontSize:20, height:20}}>{card.firstName}</Text> */}
                    {/* <Text>{card.majors}</Text> */}
                    {/* style = {tailwind("text-xl text-white font-bold")} */}
                    <Text>{card.classification}</Text>
                  </View>
                  <Text style={tailwind("text-xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Buttons for matching  */}
        {/* Margin bottom pushes up and margin top pushes down */}

        {/* <View style = {tailwind('mb-8 flex-row justify-evenly ')}> */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              swipeRef.current.swipeLeft();
            }}
            activeOpacity={0.8}
            // style = {tailwind('items-center justify-center rounded-full w-16 h-16 bg-red-500')}>
            style={styles.button}
          >
            <Image
              source={require("../../assets/images/nope.png")}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              swipeRef.current.swipeRight();
            }}
            activeOpacity={0.8}
            // style = {tailwind('items-center justify-center rounded-full w-16 h-16 bg-blue-500')}>
            style={styles.button}
          >
            <Image
              source={require("../../assets/images/like.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <IconMenu 
        navigation={navigation}
        screenCurr="HomeScreen"
        screenCurrName="HomeScreen"
      />
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
  card: {
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
