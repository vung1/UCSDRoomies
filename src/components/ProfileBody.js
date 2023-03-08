import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ImagePick} from '../screens/ImagePick';
import * as ImagePicker from 'expo-image-picker';
export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  
//   post,
//   followers,
//   following,
}) => {
  

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
      this.setImage({profileImage:result.assets[0].uri});
    }
  };

  return (
    
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
          borderBottomRightRadius: 15,
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
            source={profileImage}
            
            style={{
              resizeMode: 'cover',
              width: 150,
              height: 150,
              borderRadius: 100,
              
            }}
          />
      <MaterialIcons name="edit" size={23} color = "white" containerStyle={styles.icon} onPress={pickImage}/>
        
          
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: 'bold',
               color: 'white'
            }}>
            {name}
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

  );
};



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