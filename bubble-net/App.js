import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from 'expo-font';

// To create a new screen, make a new .js file and put in the /src/screens directory and import like the Home screen below
import Home from "./src/screens/Home.js";
import LogIn from "./src/screens/LogIn.js"
import SignUp from './src/screens/SignUp.js'
import BubbleMap from './src/screens/BubbleMap.js'
import Menu from './src/screens/Menu.js'
import AddFriend from './src/screens/AddFriend.js'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // // If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";

// // Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const Stack = createStackNavigator();


export default function App() {
   let [fontsLoaded] = useFonts({
    'gotham_rounded_medium': require('./src/assets/fonts/GothamRounded-Medium.otf'),
    'gotham_rounded_book': require('./src/assets/fonts/GothamRoundedBook_21018.ttf'),
    'gotham_rounded_bold': require('./src/assets/fonts/GothamRoundedBold_21016.ttf'),
  });

   return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="BubbleMap" component={BubbleMap} options={{ headerShown: false }} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="AddFriend" component={AddFriend} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
