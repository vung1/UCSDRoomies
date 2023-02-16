import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import users from '../../assets/data/users';

const MatchesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#247DCF'}}>
          New Matches
        </Text>
        <ScrollView style={styles.scrollView} horizontal={true}>
          <View style={styles.users}>
            {users.map(user => (
              <View style={styles.user} key={user.id}>
                <Image source={{uri: user.image}} style={styles.simp_image} />
                <Text style={styles.name}>{user.name.split(" ")[0]}</Text>
              </View>
              
            ))}
          </View>
        </ScrollView>
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
  container: {
    padding: 10,
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
    fontFamily:"nunito",
    fontWeight:"300",
    fontSize:14,
    textAlign: "center",
    lineHeight: 40,
  },
});

export default MatchesScreen;
