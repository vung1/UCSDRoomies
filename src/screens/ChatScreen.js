import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import users from '../../assets/data/users';
import Svg, {Path} from 'react-native-svg';

const ChatScreen = ({navigation, user}) => {
  return (
    <SafeAreaView style={styles.ver_container}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() =>
                  navigation.navigate('Matches', {
                    screen: 'MatchesScreen' 
                  })
                }><View style={{flexDirection: "row"}}>
      <Svg xmlns="http://www.w3.org/2000/svg" height="100%" width="10%" viewBox="0 0 448 512" >
          <Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="#000000" fillRule='evenodd'/>
        </Svg>
        {/* <View style={styles.user} key={user.id}>
                <Image source={{uri: user.image}} style={styles.simp_image} />
                <Text style={styles.name}>{user.name.split(" ")[0]}</Text>
              </View> */}
           <Text style={{fontWeight: 'bold', fontSize: 24, color: '#247DCF', marginLeft: 20}}>
            Chat
          </Text>
          </View></TouchableOpacity>
        
      </View>
      {/* <View style={styles.message_area}>
      <ScrollView style={styles.scrollView} vertical={true}>
              <View style={styles.container}>
                {users.map(user => (
                (user.messages) ?
                <View style={styles.message_box} key={user.id}>
                  <View style={styles.user} key={user.id}>
                    <Image source={{uri: user.image}} style={styles.simp_image} />
                  </View>
                  <View style={styles.message_mid}>
                    <Text style={styles.msg_name}>{user.name}</Text>
                    <Text style={styles.message}>{user.messages[0].split("\n")[0]}</Text>
                  </View>
                  <View >
                    <Text style={styles.time}>
                    </Text>
                    <Text style={styles.time}>{user.messages[0].split("\n").pop()}
                    </Text>
                  </View>
                  
                </View> : null
                
              ))}
              </View>
      </ScrollView> */}
      {/* </View> */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  ver_container:{
    padding: 10,
    flexDirection: "column",
    flex: 1,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  users: {
    flexDirection: 'row',
  },
  user: {
    width: 85,
    height: 85,
    margin: 8,
    borderRadius: 50,

    borderWidth: 2,
    padding: 3,
    borderColor: '#247DCF',
  },
  // new_user:{
  //   width: 85,
  //   height: 85,
  //   margin: 8,
  //   borderRadius: 50,

  //   borderWidth: 2,
  //   padding: 3,
  //   borderColor: '#247DCF',
  // },
  simp_image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  name: {
    fontWeight:"300",
    fontSize:14,
    textAlign: "center",
    lineHeight: 40,
  },
  message_area:{
    flex: 4,
  },
  message_box: {
    height: 85,
    flexDirection:"row",
    margin: 8,
  },
  message_mid: {
    fontWeight:"300",
    fontSize:14,
    textAlign: "center",
    lineHeight: 40,
    flex:2,
    margin:8,
  },
  msg_name: {
    fontWeight:"400",
    fontSize:16,
    textAlign: "left",
    lineHeight: 40,
    flex:1,
  },
  message: {
    fontWeight:"300",
    fontSize:14,
    textAlign: "left",
    lineHeight: 40,
    flex:1,
  },
  time: {
    fontWeight:"300",
    fontSize:16,
    textAlign: 'justify',
    lineHeight: 40,
    flex:1,
  },
});

export default ChatScreen;
