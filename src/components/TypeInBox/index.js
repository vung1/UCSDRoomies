import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const TypeInBox = () => {
  // const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeText] = React.useState('');
  const [contentHeight, setContentHeight] = React.useState({height: 90 });
  // this.onContentSizeChange = this.onContentSizeChange.bind(this);
  // console.log("outside "+typeof(contentHeight));
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder="Type Something..."
        keyboardType="default" 
        multiline={true}
        onContentSizeChange={e=>{
          let inputH = Math.max(e.nativeEvent.contentSize, 60)
          if(inputH>100) inputH =100
          // console.log("inside "+typeof(inputH));
          setContentHeight(contentHeight + inputH)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 5,
    height: 60,
    paddingLeft:30,
    paddingRight:30,
    paddingTop:20,
    paddingBotton: 20,
    borderRadius: 30,
    backgroundColor: "#F1F1F1",
    selectionColor:"#F1F1F1",
    
  },
});

export default TypeInBox;
