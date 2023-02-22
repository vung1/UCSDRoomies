import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const HomeMenu = () => {

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        onPress={() => console.log('home')}
        activeOpacity={0.8}
        style={styles.button}>
        <Feather name="home" size={35} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log('like')}
        activeOpacity={0.8}
        style={styles.button}>
        <AntDesign name="hearto" size={35} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log('message')}
        activeOpacity={0.8}
        style={styles.button}>
        <AntDesign name="message1" size={35} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log('user')}
        activeOpacity={0.8}
        style={styles.button}>
        <FontAwesome name="user-o" size={35} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    height: '10%',
    width: '100%',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    borderTopLeftRadius: '50%',
    borderTopRightRadius: '50%',
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  shadowRadius: 5,
  shadowOpacity: 0.36,
  elevation: 1
  },
  button: {
    marginHorizontal: '6%',
  },
});

export default HomeMenu;
