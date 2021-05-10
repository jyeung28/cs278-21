import React from "react";

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
      <View style={styles.container}>
        <TouchableOpacity style={styles.container} onPress={() => {this.props.navigation.navigate('LogIn')}}>
            <Image style={styles.logo} 
              source={require('../assets/logo.png')}/>
        </TouchableOpacity>

      </View>
    );
  }   
};

// Must export with "withNavigation" to connect to navigator
export default withNavigation(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'center',
    marginTop: '0%'
  },
  welcomeMessage: {
    fontFamily: "gotham_rounded_medium",
    fontSize: 16,
    color: "#3C3C4385",
    alignItems: 'center',
    fontWeight: "bold",
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 30,
    width: "80%"
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
    marginTop: '50%'
  },
  inputView: {
    width: "80%",
    backgroundColor: "#EDEDED",
    borderColor: "#4BBFC370",
    borderRadius: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1, 
    shadowColor: "#18A3A7",
    shadowRadius: 0, 
    shadowOpacity: 10,
    shadowOffset: {
      width: 0,
      height: 1.5
    },
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20

  },
  inputText: {
    fontFamily: "gotham_rounded_book",
    height: 60,
    color: "#3C3C43"
  },
  forgot: {
    fontFamily: "gotham_rounded_book",
    color: "#18A3A7",
    fontSize: 14,
    position: "relative",
    paddingLeft: 210
  },
  createAccount: {
    fontFamily: "gotham_rounded_book",
    color: "#18A3A7",
    fontSize: 14,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#4BBFC3",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowColor: "#18A3A7",
    shadowRadius: 0, 
    shadowOpacity: 10,
    shadowOffset: {
      width: 0,
      height: 1.5
    },
  },
  loginText: {
    fontFamily: "gotham_rounded_medium",
    color: "white",
    fontWeight: "bold"
  }
});