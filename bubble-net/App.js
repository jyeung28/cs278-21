import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from 'expo-font';

// To create a new screen, make a new .js file and put in the /src/screens directory and import like the Home screen below
import Home from "./src/screens/Home.js";
import LogIn from "./src/screens/LogIn.js"
import SignUp from './src/screens/SignUp.js'

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
