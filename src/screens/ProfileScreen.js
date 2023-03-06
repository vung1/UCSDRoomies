import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { ProfileBody } from '../components/ProfileBody';
import {BottomTabView} from '../components/BottomTabView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import Icon from 'react-native-vector-icons/F';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMenu from "../components/IconMenu";


// function ProfileScreen({navigation}) {
//   return (
//     <View >
//       <Text>Profile Screen</Text>
//     </View>
//   );
// };

const ProfileScreen = ({navigation}) => {
  
 const Tab = createMaterialTopTabNavigator();
 let squares = [];
  let numberOfSquare = 4;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index}>
        <View
          style={{
            width: 130,
            height: 150,
            marginVertical: 0.5,
            backgroundColor: 'black',
            opacity: 0.1,
          }}></View>
      </View>,
    );
  }

  const Posts = () => {
    return(
         <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    )
  }
// Lease
  const Apartment = () => {
    return(
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
            flexWrap: 'wrap',
            flexDirection: 'row',
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}>
          {squares}
        </View>
      </ScrollView>
    )
  }
// Personal pics
  // const Tags = () => {
  //   return(
  //     <View>
  //       <Text>
  //       Tags
  //       </Text>
  //     </View>
  //   )
  // }

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
     <View style={{width: '100%', padding: 0}}>
     <ProfileBody 
      name="User"
          accountName="User"
          profileImage={{uri : 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/34604303_2112995925596886_8035880099964256256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fqr1cJlYiJgAX8lfcTn&_nc_ht=scontent-lax3-2.xx&oh=00_AfA2u9CK2fhN1wfhUjkyohjV0UHuh2SPOImPkrYnmDm0_w&oe=641B71D5'}}
          followers="3.6M"
          following="35"
          post="458"
        />


     </View>
    
     


      {/* <BottomTabView /> */}
      
      {/* <View>
        <Text>BottomTabView</Text>
      </View> */}
      <Tab.Navigator>
       
       
        <Tab.Screen name = "Posts" component={Posts} 
        options={({route}) => ({
          tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
          tabBarIcon: ({focused, colour}) => {
            let icon;
           if (route.name === 'Posts') {
            icon = focused ? 'ios-apps-sharp' : 'ios-apps-sharp';
            colour = focused ? 'black' : 'gray';
          } else if (route.name === 'Video') {
            icon = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            colour = focused ? 'black' : 'gray';
          }
           return <MaterialIcons name="perm-identity" size={23}  />
          },
          //  tabBarLabel:() => {return null},
         })}> 


        </Tab.Screen>
        {/* <MaterialIcons name="more-vert" size={23} color={colors.secondary} /> */}
        <Tab.Screen name = "Apartment " component={Apartment}
        
        options={{
          tabBarIcon: ({color, size}) => {
           return <MaterialIcons name="apartment" size={23}  />
          },
          tabBarLabel:() => {return null},
        }}>


        </Tab.Screen>
      
      </Tab.Navigator>
      <IconMenu 
        navigation={navigation}
        screenCurr="HomeScreen"
        screenCurrName="HomeScreen"
      />
    </View>
  );
}




export default ProfileScreen;




