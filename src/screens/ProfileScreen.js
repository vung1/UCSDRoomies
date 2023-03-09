
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Button, ImageBackground} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { ProfileBody } from '../components/ProfileBody';
import {BottomTabView} from '../components/BottomTabView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMenu from "../components/IconMenu";
import * as ImagePicker from 'expo-image-picker';
import user_prof from '../../assets/data/user_prof';
// import React from "react";


const ProfileScreen = ({navigation}) => {

 const Tab = createMaterialTopTabNavigator();
  
  const Posts = ({route}) => {
    const {imageGall} = route.params;
    return(
         <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor:"white"}}
        >
        <View
          style={{
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {imageGall.map((img)=>

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

  const tabBarOptions = ({route}) => ({
    tabBarShowLabel: false,
  tabBarIndicatorStyle: {
    backgroundColor: 'black',
    height: 1.5,
  },
    tabBarIcon: ({focused}) => {
      let color;
      if (route.name === 'Apartment') {
      color = focused ? 'black' : 'grey';
      return <MaterialIcons name="apartment" size={23} color={color}  />
    } else if (route.name === 'Posts') {
      color = focused ? 'black' : 'grey';
      return <MaterialIcons name="perm-identity" size={23} color={color}  />
    }
      
    },
    tabBarLabel:() => {return null},
  })

  const infoSec = (type, name) => (
    <>
    <View style={{
        alignItems: 'left'
        }}>
        <Text
            style={{
              paddingVertical: 10,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
      </View>
      
      {type.map((abt)=>
      <View style={{flexDirection:"row",alignItems: 'center'}}>
        <View  style={styles.title}>
          <Text>
          {abt.split(":")[0]}
        </Text>
        </View>
        <View  style={styles.input}>
          <Text style={{color:"grey"}}>
          {abt.split(":")[1]}
            </Text>
        </View>
  
      </View>
  
      )}
    </>
      
  )

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
     
     <View style={{width: '100%', height: '90%'}}>
      <View style={{flex:4, width: '100%', flexDirection:"column"}}>
          <View style={styles.first} >
            <View style={
              {transform: [{ scaleX: 0.125 }],
              marginTop:"10%",
              // justifyContent:"center",
              flexDirection:"column",
              alignItems:"center"
            }
              }>
            <Text
                    style={{
                      paddingVertical: 20,
                      color: 'white',
                      fontSize:24
                    }}>
                    Profile
                  </Text>
                
                  <Image 
                  source={{uri : user_prof[0].image}} //TODO change to user.Photourl
                  style={{  width: 100, height: 100, borderRadius: 100}} /> 
                  <Text
                    style={{
                      paddingVertical: 10,
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                    {user_prof[0].name.split(" ")[0]}, {user_prof[0].age}
                  </Text>
            </View>
          </View>
          <View style={styles.second} >

            {/* ABOUT */}
            {(user_prof[0].about.length > 0) ? infoSec(user_prof[0].about, "About") //TODO: connect firebase
            : <View style={styles.input}><Text>There is no info here</Text></View>
            } 
            
          {/* Line */}
          <View style={{
              marginTop:15,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
                  }} />

          {/* Apartment */}
          {(user_prof[0].apart.length > 0) ? infoSec(user_prof[0].apart, "Apartment") //TODO: connect firebase
            : <View style={styles.input}><Text>There is no info here</Text></View>
            } 

                
            </View>

          

      </View>
      
      {/* picture section */}
      <View style={{flex:3, backgroundColor:"white"}}>
      <Tab.Navigator style={{backgroundColor:"white"}}>
          <Tab.Screen name = "Posts" component={Posts} 
          initialParams={{imageGall:user_prof[0].personalimages}}//TODO:connect to firebase
          options={tabBarOptions}> 
          </Tab.Screen>
          <Tab.Screen name = "Apartment" component={Posts} 
          initialParams={{imageGall:user_prof[0].apartImg}}//TODO:connect to firebase
          options={tabBarOptions}>
          </Tab.Screen>
        </Tab.Navigator>
      </View>

     </View>
  
      <IconMenu 
        navigation={navigation}
        screenCurr="HomeScreen"
        screenCurrName="HomeScreen"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input:{
    flex:1,
    alignItems:"flex-end",
    padding:3,
  },
  title: {
    flex:1,
    alignItems:"flex-start",
  },
  container: {
    // position: 'absolute', 
    width: '100%',
    height:"100%",
    backgroundColor: 'blue',
    flex:1,
  },
  first: {
    flex:3,
		backgroundColor: '#247DCF',
    alignSelf: 'center',
		borderBottomRightRadius: 50,
		borderBottomLeftRadius: 50,
		transform: [{ scaleX: 8 }],
	},
	second: {
    marginLeft:20,
    marginRight:20,
    flex:2,
	},
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  }});


export default ProfileScreen;
