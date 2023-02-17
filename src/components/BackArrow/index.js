import React from 'react';
import {TouchableOpacity, Text, ImageBackground, View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const BackArrow = props => {
  const {navigation, screen, screenName} = props;
  return (
    <TouchableOpacity onPress={() =>
          navigation.navigate(screenName, {
            screen: screen
          })
        } style={{width: 50,
          height: 50}}>
        <Svg xmlns="http://www.w3.org/2000/svg" height="70%" width="70%" viewBox="0 0 448 512" >
          <Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" fill="#000000" fillRule='evenodd'/>
        </Svg>
    </TouchableOpacity>
  );
};

export default BackArrow;
