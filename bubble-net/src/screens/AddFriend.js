import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from "firebase/app";
import { useNavigation } from '@react-navigation/native';
import { useAlert } from "react-alert";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
const md5 = require('md5');

function addFriend(phone, name, props,state) {

  const userId = firebase.auth().currentUser.uid;
  const baseReference = firebase.database().ref(`Users`).child(userId).child(`friends`);
  baseReference.get().then((snapshot) => {
    if(snapshot.exists()){
      state.alreadyAdded = true;
      console.log(snapshot.val())
    } 
    if(true){ //FOR DEBUGGING
      baseReference.child(md5(phone)).set({
        name: name,
        phone: phone,
        active: false,
        id: md5(phone)
      });
      props.navigation.navigate('BubbleMap');
    }
  });
}

class AddFriend extends React.Component {
  state = {
    phone: "",
    name: "",
    alreadyAdded: false
  }


  render() {

    return (
      <View style={styles.container}>        
        <Image style={styles.logo}
          source={require('../assets/logo.png')}/>

        <Text style={styles.welcomeMessage}>Add Friend?</Text>
  
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Friend Email Address"
            placeholderTextColor="#767676"
            onChangeText={text => this.setState({ phone: text })} />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Friend Name"
            placeholderTextColor="#767676"
            onChangeText={text => this.setState({ name: text })} />
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={() => {addFriend(this.state.phone, this.state.name, this.props,this.state)}}>
          <Text style={styles.btnText}>{!this.state.alreadyAdded ? "Add Friend" : "Already Added!"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('BubbleMap')}}>
          <Text style={styles.link}>Back to Home</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default withNavigation(AddFriend);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E0',
    alignItems: 'center'
  },
  welcomeMessage: {
    fontFamily: "gotham_rounded_medium",
  	fontSize: 16,
  	color: "#1c2e4a",
  	alignItems: 'center',
  	fontWeight: "bold",
  	justifyContent: 'center',
  	textAlign: 'center',
  	marginBottom: 10,
  	width: "80%"
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20

  },
  inputText: {
    fontFamily: "gotham_rounded_book",
    height: 50,
    color: "#3C3C43"
  },
  forgot: {
    color: "#1c2e4a",
    fontSize: 14,
    position: "relative",
    paddingLeft: 225
  },
  link: {
    fontFamily: "gotham_rounded_book",
    color: "#1c2e4a",
    fontSize: 14,
    position: "relative",
  },
  nextBtn: {
    width: "80%",
    backgroundColor: "#88E5B3",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  btnText: {
    fontFamily: "gotham_rounded_medium",
    color: "#1c2e4a",
    fontWeight: "bold"
  }
});