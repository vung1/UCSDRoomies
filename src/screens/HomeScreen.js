import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Card from '../components/TinderCard';
import users from '../../assets/data/users';
import { useNavigation } from '@react-navigation/core'

import AnimatedStack from '../components/AnimatedStack';

const HomeScreen = () => {
  const navigation = useNavigation()

  const onSwipeLeft = user => {
    console.warn('swipe left', user.name);
  };

  const onSwipeRight = user => {
    console.warn('swipe right: ', user.name);
  };

  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileSetting')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <AnimatedStack
        data={users}
        renderItem={({item}) => <Card user={item} />}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default HomeScreen;
