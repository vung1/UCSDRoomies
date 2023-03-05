import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { ProfileBody } from '../components/ProfileBody';
// function ProfileScreen({navigation}) {
//   return (
//     <View >
//       <Text>Profile Screen</Text>
//     </View>
//   );
// };

const ProfileScreen = ({navigation}) => {

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
     <View style={{width: '100%', padding: 10}}>
     <ProfileBody 
      name="User"
          accountName="User"
          profileImage={{uri : 'https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/34604303_2112995925596886_8035880099964256256_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Fqr1cJlYiJgAX8lfcTn&_nc_ht=scontent-lax3-2.xx&oh=00_AfA2u9CK2fhN1wfhUjkyohjV0UHuh2SPOImPkrYnmDm0_w&oe=641B71D5'}}
          followers="3.6M"
          following="35"
          post="458"
        />


     </View>
    </View>
  );
}




export default ProfileScreen;




