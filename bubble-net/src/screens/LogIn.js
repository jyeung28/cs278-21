import React from "react";

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var signInUser = async (phone, password, props) => {
  firebase.auth().signInWithEmailAndPassword(phone, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Logged in " + user.uid);
      props.navigation.navigate('BubbleMap');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

class LogIn extends React.Component {
  state = {
    phone: "",
    password: ""
  }
    render() {

      return (
      <View style={styles.container}>
        <Image style={styles.logo}
          source={require('../assets/logo.png')}/>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Phone..."
            placeholderTextColor="#767676"
            onChangeText={text => this.setState({ phone: text })} />
        </View>

        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#767676"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })} 
            />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        

        <TouchableOpacity style={styles.loginBtn} onPress={() => {signInUser(this.state.phone, this.state.password, this.props)}}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('SignUp')}}>
          <Text style={styles.createAccount}>Don't have an account? Sign up!</Text>
        </TouchableOpacity>

      </View>
    );
  }   
};

// Must export with "withNavigation" to connect to navigator
export default withNavigation(LogIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'center',
    marginTop: '0%'
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    marginTop: '40%'
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FED69A",
    borderColor: "#FED69A",
    borderRadius: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1, 
    height: 55,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20

  },
  forgot: {
    fontFamily: "gotham_rounded_book",
    color: "#1c2e4a",
    fontSize: 14,
    position: "relative",
    paddingLeft: 210
  },
  createAccount: {
    fontFamily: "gotham_rounded_book",
    color: "#1c2e4a",
    fontSize: 14,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#88E5B3",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    fontFamily: "gotham_rounded_medium",
    color: "#1c2e4a",
    fontWeight: "bold"
  }
});