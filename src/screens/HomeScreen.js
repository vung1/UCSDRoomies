import React, {useLayoutEffect} from 'react';
import {View, StyleSheet, Text, Button, SafeAreaView, TouchableOpacity} from 'react-native';
import Card from '../components/TinderCard';
import users from '../../assets/data/users';
// import React, { useLayoutEffect } from "react";
import AnimatedStack from '../components/AnimatedStack';
import {useNavigation} from "@react-navigation/core";
import {useTailwind} from 'tailwind-rn';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntIcon from "react-native-vector-icons/AntDesign";
import Swiper  from 'react-native-deck-swiper';
import {Image} from 'react-native' ; 
// import useAuth from...
const DUMMY_DATA = [
   { name: 'Mya',
    age: 30,
    location: "New York",
    majors: 'Physics',
    photoURL: 
    'https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/287545022_1091736855020876_5602520662715136881_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=gXWtJZMOGMMAX-SmrwU&_nc_ht=scontent-lax3-2.xx&oh=00_AfB4cf7VOZisjFQ8aCaqBDpSuywyk4B8k8VRmWnRIvePGw&oe=63F8C614',
    id:123
  },

   { name: 'Victor',
    age: 30,
    location: 'New York',
    majors: 'Physics',
    photoURL: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/34604303_2112995925596886_8035880099964256256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fqr1cJlYiJgAX8lfcTn&_nc_ht=scontent-lax3-2.xx&oh=00_AfA2u9CK2fhN1wfhUjkyohjV0UHuh2SPOImPkrYnmDm0_w&oe=641B71D5',
    id:456
   },
   
   {name: 'Darlene',
    age: 30,
    location: 'New York',
    majors: 'Physics',
    photoURL: 'https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/326464979_1189459725017205_2497974280865416237_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=7T3Dl4mGPA0AX_XHzIl&_nc_ht=scontent-lax3-2.xx&oh=00_AfDQDAAfZdv0PMfZ4E0UP-SuNu5qwcKJ3JxsO1IXi5fNQA&oe=63F95A33',
    id:789
  },

    {name: 'Josh',
    age: 30,
    location: 'New York',
    majors: 'Physics',
    photoURL: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/37081933_213393819314265_6367120236990169088_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=qppccfxWV9oAX-VWNls&_nc_ht=scontent-lax3-1.xx&oh=00_AfCUSGY3klKxDVKn8WUwq2rC3Yt8mzSzueW0_y6VLbmgog&oe=641B6496',
    id:101112
},

   { name: 'Jack',
    age: 30,
    location: 'New York',
    majors: 'Physics',
    photoURL: 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/192436271_1214099862361681_8439239647122206602_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9gVc74c9qLEAX8aqgQE&tn=fCUD-PsIbWKfLdzZ&_nc_ht=scontent-lax3-2.xx&oh=00_AfDdr1GFfQRImzwC25eaR91_Odz5aXOfqrcxT5034-M6hQ&oe=641B85CD',
},

   { name: 'Brian',
    age: 30,
    location: 'New York',
    majors: 'Physics',
    photoURL: 'https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/289682412_3185058221746238_7439599793167202859_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=L4nOqtfLAtQAX-1iwJr&tn=fCUD-PsIbWKfLdzZ&_nc_ht=scontent-lax3-1.xx&oh=00_AfAcuNjrHlGasTU-RB8b2SaGs-OEUQ2zx96NGf_o1ntArA&oe=63F917C0',
    id:131415
}

  ];
const HomeScreen = () => {

  const tailwind = useTailwind();
  return ( 

  // const{logout} = useAuth();


  <SafeAreaView style = {tailwind("flex-1")}>
    {/*Header*/}
    {/* flex row item-center justify-between px-5 */}
      <View style = {("items-center relative")}>
      {/*ROOMIES LOGO*/}
        {/* <Image style = {tw("h-14 w - 14")}source = { require(" ROOMIES LOGO HERE")}  */}
    
      {/* ROOMIES LOGO*/}
      {/*FILTER ICON*/}
      <TouchableOpacity style ={ tailwind(" absolute right-5 top-3 ")} >
          <AntIcon name = 'filter' size = {30}/>  
      </TouchableOpacity>
        {/* <TouchableOpacity style = {tailwind("right-100 top-33")}>
          <AntIcon name = 'filter' size = {30}/>  
      </TouchableOpacity>
        <TouchableOpacity style = {tailwind("right-100 top-33")}>
          <AntIcon name = 'filter' size = {30}/>  
      </TouchableOpacity> */}
      {/*FILTER ICON*/}
      </View>
      {/* ENd of Header*/}


      {/* {Cards} */}
      <View style ={tailwind()}>

      <Swiper 
      containerStyle={{backgroundColor: "transparent"}}
        cards = {DUMMY_DATA}
        stackSize={6}
        cardIndex={0}
        verticalSwipe={false} 
        renderCard={(card) => (
          <View key = {card.id} style= {tailwind("relative bg-white h-3/4 rounded-xl")}>
            <Image style = {tailwind(" absolute top-0 h-full w-full rounded-xl ")}
            source={{uri: card.photoURL}} />
            {/* <Text>{card.name}</Text> */}
          </View>
        )}
      />
      </View>
    </SafeAreaView>
    );
};

//   const onSwipeLeft = user => {
//     console.warn('swipe left', user.name);
//   };

//   const onSwipeRight = user => {
//     console.warn('swipe right: ', user.name);
//   };

//   return (
//     <View style={styles.pageContainer}>
//       <AnimatedStack
//         data={users}
//         renderItem={({item}) => <Card user={item} />}
//         onSwipeLeft={onSwipeLeft}
//         onSwipeRight={onSwipeRight}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   pageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//     width: '100%',
//   },
// });

export default HomeScreen;
