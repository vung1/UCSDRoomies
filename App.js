import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import InitScreen from './src/screens/InitScreen';
import StackNavigator from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import utilities from './tailwind.json';
import LoginScreen from './src/screens/LoginScreen'




export default function App(){
  return (
    // <View style={styles.pageContainer}>
    //   <InitScreen/>
    //   <MatchesScreen/>
    // </View>
    <TailwindProvider utilities={utilities}>
    
    <NavigationContainer>

      <StackNavigator>

      </StackNavigator>
    </NavigationContainer>
    
    </TailwindProvider>
  );
}

// const App = () => {
//   return (
//     <View style={styles.pageContainer}>
//       <HomeScreen/>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   pageContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
// });


