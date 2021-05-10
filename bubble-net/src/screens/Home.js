import React from "react";
// import Button from "react-native-button";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
// Firebase App (the core Firebase SDK) is always required and must be listed first
// import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCZLXgufwdhEnqZB0ibYhfByc6vq3EqmaY",
//   authDomain: "cs194-79bea.firebaseapp.com",
//   projectId: "cs194-79bea",
//   databaseURL: "https://cs194-79bea-default-rtdb.firebaseio.com",
//   storageBucket: "cs194-79bea.appspot.com",
//   messagingSenderId: "676858911978",
//   appId: "1:676858911978:web:50ba26740c080e0f16cb93",
//   measurementId: "G-QESM9YJ8VT"
// };

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
//   console.log("Firebase initialized");
// }else {
//   firebase.app(); // if already initialized, use that one
//   console.log("Firebase already initialized");
// }

class Home extends React.Component {
  state = {
    email: "",
    password: ""
  }
    render() {

      return (
      <TouchableOpacity style={styles.container} /*onPress={() => {this.props.navigation.navigate('Login')}}*/>
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
    backgroundColor: 'white',
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