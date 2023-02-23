import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import users from '../../assets/data/users';
import user_prof from '../../assets/data/user_prof';
import Svg, {Path} from 'react-native-svg';
import BackArrow from '../components/BackArrow';
import TypeInBox from '../components/TypeInBox';


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

      <View style={styles.message_area}>
        <ScrollView style={styles.scrollView} vertical={true}>
          {user.messages.map( msg => 
          <View style={styles.message_box}>
            {/* other one  */}
              {(msg.split(":")[0] != "me")?
                <><View style={styles.message_side}>
                  <View style={styles.user} key={user.id}>
                    <Image source={{ uri: user.image }} style={styles.simp_image} />
                  </View>
                </View><View style={styles.message_mid}>
                    <Text style={styles.message}>{msg.split("\n")[0]}</Text>
                  </View><View style={styles.message_side}>

                  </View></> : 
                <>
              {/* self user */}
                <View style={styles.message_self_side}></View>
                <View style={styles.message_self_mid}>
                    <Text style={styles.message_self}>{((msg.split(":")).slice(1)).join(":").split("\n")[0]}</Text>
                </View>
                <View style={styles.message_self_side}>
                  <View style={styles.user_self} key={user.id}>
                    
                    <Image source={{ uri: user_prof[0].image }} style={styles.simp_image} />
                  </View>
                </View></>
              }
              
          </View>
          
              ) 
          }
        </ScrollView> 
      </View>

      <View style={styles.container}>
         <TypeInBox />
      </View>
      
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
    backgroundColor:"#FFFFFF"
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
  user_self: {
    width: 40,
    height: 40,
    marginRight: 30,
    borderRadius: 50,
    backgroundColor: "#F1f1f1"
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
    flex: 9,
    flexDirection:"column",
    justifyContent: 'flex-end',
  },
  message_box: {
    backgroundColor:"#FFFFFF",
    flexDirection:"row",
  },
  message_side: {
    width:"100%",
    height:"100%",
    flex:1,
    alignItems: "flex-start",
    margin:3,
  },
  message_self_side: {
    width:"100%",
    height:"100%",
    flex:1,
    alignItems: 'flex-end',
    margin:3,
  },
  message_mid: {
    fontWeight:"300",
    fontSize:14,
    alignItems: 'flex-start',
    flex:3,
    margin:2,
  },
  message_self_mid: {
    fontWeight:"300",
    fontSize:14,
    alignItems: "flex-end",
    flex:3,
    margin:2,
  },
  message_self: {
    fontWeight:"300",
    fontSize:14,
    textAlign: "right",
    lineHeight: 20,
    margin:10,
    borderRadius:20,
    borderWidth:10,
    backgroundColor:"#F1F1F1",
    borderColor:"#F1F1F1",
    overflow: 'hidden',
  },
  message: {
    fontWeight:"300",
    fontSize:14,
    textAlign: "left",
    lineHeight: 20,
    // flex:1,
    margin:10,
    borderRadius:20,
    borderWidth:10,
    backgroundColor:"#F1F1F1",
    borderColor:"#F1F1F1",
    overflow: 'hidden',
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
