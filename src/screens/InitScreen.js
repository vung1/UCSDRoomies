import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InitScreen = () => {
  return (
    <View style={styles.pageContainer}>
      <Text>hi</Text>
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
});

export default InitScreen;
