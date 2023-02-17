import React from 'react';
import {SafeAreaView, View, StyleSheet, TextInput} from 'react-native';

const TypeInBox = () => {
  // const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeText] = React.useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Type Something..."
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 10,
    padding: 10,
    paddingLeft:30,
    borderRadius: 30,
    backgroundColor: "#F1F1F1",
    selectionColor:"#F1F1F1",
  },
});

export default TypeInBox;
