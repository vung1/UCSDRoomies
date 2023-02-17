import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import users from '../../assets/data/users';
import Svg, {Path} from 'react-native-svg';
import BackArrow from '../components/BackArrow';

const ChatScreen = ({route, navigation}) => {
  const { user} = route.params;
  return (
    <SafeAreaView style={styles.ver_container}>
      <View style={styles.container}>
      
      <View style={{flexDirection: "row"}}>
        <BackArrow navigation={navigation} screen={'MatchesScreen'} screenName={'Matches'}/>
        <View style={styles.user} key={user.id}>
                <Image source={{uri: user.image}} style={styles.simp_image} />
              </View>
              <Text style={styles.name}>{user.name.split(" ")[0]}</Text>
          </View>
        
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
    width: 40,
    height: 40,
    marginLeft: 30,
    borderRadius: 50,
  },
  simp_image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  name: {
    fontWeight:"600",
    fontSize:20,
    textAlign: "justify",
    lineHeight: 40,
    marginLeft: 15,
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
