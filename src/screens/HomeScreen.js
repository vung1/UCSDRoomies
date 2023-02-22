import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Card from '../components/TinderCard';
import users from '../../assets/data/users';

import AnimatedStack from '../components/AnimatedStack';
import HomeLogo from '../components/HomeLogo';
import IconMenu from '../components/IconMenu';

const HomeScreen = () => {
  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };

  const onSwipeRight = user => {
    console.warn('swipe right: ', user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.logoContainer}><HomeLogo /></View>
      <View style={styles.matchContainer}>
        <AnimatedStack
          data={users}
          renderItem={({item}) => <Card user={item} />}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => console.log('Nope')}
            activeOpacity={0.8}
            style={styles.button}
            >
            <Image 
              source={require('../../assets/images/nope.png')} 
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Like')}
            activeOpacity={0.8}
            style={styles.button}>
            <Image 
              source={require('../../assets/images/like.png')} 
              style={styles.image}></Image>
          </TouchableOpacity>
        </View>
      </View>

      <IconMenu />

    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    height: '10%',
    marginTop: '12%',
  },
  matchContainer: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection:'row',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2%',
    
  },
  button: {
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '12%',
  },
  image: {
    width: 65,
    height: 65,
  },
});

export default HomeScreen;
