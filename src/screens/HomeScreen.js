import React from 'react';
import {View, StyleSheet} from 'react-native';
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

      </View>
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
    height: "10%",
    marginTop: "12%",
  },
  matchContainer: {
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    marginTop: "3%",
  }
});

export default HomeScreen;
