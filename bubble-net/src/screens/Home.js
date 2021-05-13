import React from "react";
// import Button from "react-native-button";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// // import * as firebase from "firebase/app"

// // // If you enabled Analytics in your project, add the Firebase SDK for Analytics
//import "firebase/analytics";

// // Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDYJzQYi6fiAqKdjmdkie8ld7ZUMCi8pTA",
  authDomain: "bubble-net-4fbb4.firebaseapp.com",
  databaseURL: "https://bubble-net-4fbb4-default-rtdb.firebaseio.com",
  projectId: "bubble-net-4fbb4",
  storageBucket: "bubble-net-4fbb4.appspot.com",
  messagingSenderId: "748132683004",
  appId: "1:748132683004:ios:2e2bbac84d694c5bdb5b79",
  measurementId: "G-MEASUREMENT_ID",
};

// //Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized");
}else {
  firebase.app(); // if already initialized, use that one
  console.log("Firebase already initialized");
}

class Home extends React.Component {
    render() {

      return (
      <TouchableOpacity style={styles.container} onPress={() => {this.props.navigation.navigate('LogIn')}}>
          <Image style={styles.logo} 
            source={require('../assets/logo.png')}/>
      </TouchableOpacity>
    );
  }   
};

export default withNavigation(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'center',
    marginTop: '0%'
  },
  logo: {
  	width: 300,
  	height: 300,
  	marginBottom: 20,
    marginTop: '60%'
  },
  fieldTrip: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#18A3A7",
    marginBottom: 15
  }
});