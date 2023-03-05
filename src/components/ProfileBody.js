import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient'

export const ProfileBody = ({
  name,
  accountName,
  profileImage,
//   post,
//   followers,
//   following,
}) => {
  return (
    <View
    style ={{flexDirection:'column',}}>
   {/* <LinearGradient colors={["#74AED6", "#247DCF"]} style={styles.background}> */}

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
        
      </View>
      
     
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
      {/* </LinearGradient> */}
    </View>
  );
};

export const ProfileButtons = ({id, name, accountName, profileImage}) => {
  const navigation = useNavigation();
  const [follow, setFollow] = useState(follow);
  return (
    <>
      {id === 0 ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 5,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.push('EditProfile', {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }
            style={{
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                borderColor: '#DEDEDE',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setFollow(!follow)}
            style={{width: '42%'}}>
            <View
              style={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : '#3493D9',
                borderWidth: follow ? 1 : 0,
                borderColor: '#DEDEDE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: follow ? 'black' : 'white'}}>
                {follow ? 'Following' : 'Follow'}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '42%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text>Message</Text>
          </View>
          <View
            style={{
              width: '10%',
              height: 35,
              borderWidth: 1,
              borderColor: '#DEDEDE',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Feather
              name="chevron-down"
              style={{fontSize: 20, color: 'black'}}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  }});