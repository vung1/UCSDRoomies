import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Button, ImageBackground} from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import user_prof from '../../assets/data/user_prof';
// import React from "react";





const ProfileScreen = ({navigation}) => {

 const Tab = createMaterialTopTabNavigator();
 let squares = [];
let numberOfSquare = 4;

//  {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100, resizeMode:'cover' }} />}
      
  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View 
          style={{
            // padding: 1,
            width: '50%',
            height: 150,
            // margin: 0.01,
            backgroundColor: 'blue',
            opacity: 1,
          }}
          key={index}>
          <Text>{user_prof[0].personalimages[index]}</Text>
        <Image source={{ uri: user_prof[0].personalimages[index]}} />
        
      </View>,

      
    );
  }
  
  const Posts = () => {
    return(
         <ScrollView
        showsVerticalScrollIndicator={false}
        >
        <View
          style={{
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            // paddingVertical: 5,
            // justifyContent: 'space-between',
          }}>
          {user_prof[0].personalimages.map((img)=>

          <View 
          style={{
            padding: 5,
            width: '50%',
            height: 150,
          }}>
              <Image style={{
                width:"100%", 
                height:"100%",
                borderRadius:10,
                backgroundColor:"grey"
                }} source={{ uri: img}} />

          </View>

          )}
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
  const [image, setImage] = useState(null);
   const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
     <View style={{width: '100%', padding: 0}}>
     {/* <ProfileBody  */}


{/*      
          // name="User"
          // // accountName="User"
          // profileImage={{uri : 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/34604303_2112995925596886_8035880099964256256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fqr1cJlYiJgAX8lfcTn&_nc_ht=scontent-lax3-2.xx&oh=00_AfA2u9CK2fhN1wfhUjkyohjV0UHuh2SPOImPkrYnmDm0_w&oe=641B71D5'}}
         */}
         {/* /> */}
         <View
    style ={{flexDirection:'column',}}>

     {/* <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}>  */}
     
      <View
      
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 50,
          backgroundColor:'#247DCF',
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,

       
        }}>
        
        <View
          style={{
            alignItems: 'center',
            // backgroundColor:'#247DCF'
          }}>
          <Text
            style={{
              paddingVertical: 20,
              fontWeight: 'bold',
              color: 'white'
            }}>
            {"Profile"}
          </Text>
        
          <Image 
          source={{uri :'https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/298553691_644732880342350_1557357737172763795_n.jpg?stp=c0.87.1080.1080a_dst-jpg_s552x414&_nc_cat=100&ccb=1-7&_nc_sid=da31f3&_nc_ohc=1XKqJW0eCq8AX_sjflb&_nc_ht=scontent-lax3-2.xx&oh=00_AfBuc5T44M4UaudAxk2oL2kcN-twVjOdiJrbRoMneE-9bg&oe=640DF4BE'}} 
          style={{  width: 150, height: 150, borderRadius: 100, resizeMode:'cover'}} /> 
      
      

      {/* <MaterialIcons name="edit" size={23} color = "white" containerStyle={styles.icon} onPress={pickImage}/>
      {/*  This is supposed to take in data of the image */}
      {/* <MaterialIcons name="edit" title = "Save" onPress={()=>navigation.navigate("Save",{image})}/> */} 
      
      {/* {image && <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100, resizeMode:'cover' }} />} */}
      
      
        
          
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: 'bold',
               color: 'white'
            }}>
            User
          </Text>
     

        </View>
        {/* <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{post}</Text>
          <Text>Posts</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{followers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{following}</Text>
          <Text>Following</Text>
        </View> */}
        {/* </LinearGradient> */}
      </View>
      {/* </LinearGradient> */}
     
      <View>
      <View style={{alignItems: 'left'}}>
         <Text
            style={{
              paddingVertical: 10,
              fontWeight: 'bold',
            //    color: ''
            }}>
            About
          </Text>
          </View>

           <View style={{alignItems: 'left'}}>
         <Text
            style={{
              paddingVertical: 10,
            //   fontWeight: 'bold',
            //    color: 'white'
            }}>
            Major
          </Text>
          </View>

           <View style={{alignItems: 'left'}}>
         <Text
            style={{
            //   paddingVertical: 
            //   fontWeight: 'bold',
            //    color: 'white'
            }}>
            Interests
          </Text>
          </View>
        <View
        style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
                }}
/>
      </View>
      
    </View>

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
          } else if (route.name === 'Apartment') {
            icon = focused ? 'ios-play-circle' : 'ios-play-circle-outline';
            colour = focused ? 'black' : 'gray';
          }
           return <MaterialIcons name="perm-identity" size={23}  />
          },
          //  tabBarLabel:() => {return null},
         })}> 


        </Tab.Screen>
        {/* <MaterialIcons name="more-vert" size={23} color={colors.secondary} /> */}
        <Tab.Screen name = "Apartment" component={Apartment}
        
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
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  }});

const icon = StyleSheet.create( {
 backgroundColor: '#ccc',
 position: 'absolute',
 right: 0,
 bottom: 0,
 marginRight: 10
})



export default ProfileScreen;




