import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeMenu = () => {

  return (
    <View style={styles.menuContainer}>
        <Image 
            source={require('../../../assets/images/icon_home_.png')} 
            style={styles.icon_image}></Image>
        <TouchableOpacity
          onPress={() => console.log('Like')}
          activeOpacity={1}
          style={styles.icon_button}>
          <Image 
            source={require('../../../assets/images/icon_follow.png')} 
            style={styles.icon_image}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Like')}
          activeOpacity={1}
          style={styles.icon_button}>
          <Image 
            source={require('../../../assets/images/icon_mesg.png')} 
            style={styles.icon_image}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Like')}
          activeOpacity={1}
          style={styles.icon_button}>
          <Image 
            source={require('../../assets/images/icon_profile.png')} 
            style={styles.icon_image}></Image>
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
  icon_button: {
    width: 40,
    height: 40,
    marginHorizontal: '6%',
  },
  icon_image: {
    width: 40,
    height: 40,
    marginHorizontal: '6%',
  },
});

export default HomeMenu;
