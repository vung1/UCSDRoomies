import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Card from '../components/TinderCard';
import users from '../../assets/data/users';

import AnimatedStack from '../components/AnimatedStack';
import HomeLogo from '../components/HomeLogo';

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
          <Image 
            source={require('../../assets/images/nope.png')} 
            style={styles.image}
          />
          <Image 
            source={require('../../assets/images/like.png')} 
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.barContainer}></View>
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
  },
  buttonContainer: {
    flexDirection:'row',
    height: '10%',
    justifyContent: 'center',
    top: '2.5%',
  },
  image: {
    width: 65,
    height: 65,
    marginHorizontal: '15%',
  },
  barContainer: {
    height: '15%',
  }
});

export default HomeScreen;
