import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import InitScreen from './src/screens/InitScreen';

const App = () => {
  return (
    <View style={styles.pageContainer}>
      <InitScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
