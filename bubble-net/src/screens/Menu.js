import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import x from '../assets/x.png'

import firebase from "firebase/app";
import "firebase/firestore";
const md5 = require('md5');

// import { auth } from "firebase/auth";
// import { database } from "firebase/database";

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

function Menu() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function logOut() {
    const userKey = firebase.auth().currentUser.uid;
    const reference = firebase.database().ref(`Users`);
    const userReference = firebase.database().ref(`Users`).child(userKey);
    
    var userId = null;
    userReference.on('value', function(snap) {
      userId = snap.child('ID').val();
      var userName = snap.child('phone').val();
    });
    console.log("Presence detected for " + userKey + " id: " + userId);
   
    var updates = {};
    reference.on('value', function(snap) {
      snap.forEach(function(childNodes) {
        const friendKey = childNodes.key
        const friendsList = childNodes.val().friends
        const friendListRef = firebase.database().ref('Users').child(childNodes.key).child('friends')
        // console.log(friendListRef)

        friendListRef.on('value', function(snap2) {
          snap2.forEach(function(friendNode) {
            var friendHash = md5(friendNode.val().phone)
            
            if (friendHash == userId) {
              var currStatus = friendNode.val().active;
              var updatedData = {
                active: false,
                id: friendHash,
                name: friendNode.val().name,
                phone: friendNode.val().phone
              }

              updates['/' + friendKey + '/friends/' + friendHash] = updatedData;
              // friendNode.val().active = true 
              // console.log("friend list updated for " + friendHash)
              // console.log("active status: " + friendNode.val().active)
            }
          });
        });
      });
    });
    reference.update(updates);
    navigation.navigate('LogIn')
  }

  return (
  <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusButton}>
          <Text style={styles.statusText}>Menu</Text>
        </View>
        <TouchableOpacity style={styles.menuContainer} onPress={() => {navigation.navigate('BubbleMap')}}>
          <Image style = {styles.menu} source={x}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contacts</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => logOut()}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>

    </View>
  ); 
};

export default withNavigation(Menu);

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
  menuContainer: {
    width: 35,
    height: 35,
    marginTop: 53,
    marginBottom: 10,
    marginLeft: 290,
    position: "absolute"
  },
  menu: {
    width: 35,
    height: 35,
  },
   header: {
    flexDirection: 'row',
    backgroundColor: '#F8B970',
    justifyContent: 'space-around',
    marginTop: 0,
    width: '100%',
    height: 105
  },
  promptMessage: {
    color: "#3C3C4385",
    fontSize: 20,
    marginTop: 20,
  },
  statusButton: {
    width: "65%",
    backgroundColor: "#F8B970",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 50,
  },
  statusText: {
    fontFamily: "gotham_rounded_medium",
    color: "#1c2e4a",
    fontWeight: "bold",
    position: "relative",
    fontSize: 30
  },
  button: {
    width: "65%",
    backgroundColor: "#88E5B3",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 80,
  },
  buttonText: {
    fontFamily: "gotham_rounded_medium",
    color: "#1c2e4a",
    fontWeight: "bold",
    position: "relative",
    fontSize: 20
  },
});