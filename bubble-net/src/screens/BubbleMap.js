import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import sidebar from '../assets/sidebar-icon.png'
import { useNavigation } from '@react-navigation/native';

import firebase from "firebase/app";
import "firebase/firestore";
const md5 = require('md5');
// import { auth } from "firebase/auth";
// import { database } from "firebase/database";

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';


function BubbleMap() {
  const navigation = useNavigation();
  const [online, setOnline] = useState(false);
  const [userName, setUser] = useState("");
  var friendList = [];

  function changeStatus() {
    setOnline(!online);

    const userKey = firebase.auth().currentUser.uid;
    const reference = firebase.database().ref(`Users`);
    const userReference = firebase.database().ref(`Users`).child(userKey);
    var userId = null;
    userReference.on('value', function(snap) {
      userId = snap.child('ID').val();
      var userName = snap.child('phone').val();
      setUser(userName);
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
                active: !online,
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

    console.log(online ? "Went offline" : "Set online");
  }

function updateFriends() {
  // loop over all friends to check who is marked as available
  const userKey = firebase.auth().currentUser.uid;
  const userReference = firebase.database().ref(`Users`).child(userKey);
  userReference.on('value', function(snap) {
    snap.forEach(function(childNodes) {
      const friendListRef = firebase.database().ref('Users').child(userKey).child('friends')

      friendListRef.on('value', function(snap2) {
        snap2.forEach(function(friendNode) {
          var friendName = friendNode.val().name
          console.log(friendName)
          if (friendNode.val().available == true) {
            console.log("found available friend: " + friendName)
            friendList.push(friendName);
            console.log(friendList);
          }
        });
      })
    })
  });
  console.log(friendList);
}



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={online === false ? styles.statusButtonOff : styles.statusButtonOn} onPress={() => changeStatus()}>
          <Text style={styles.statusText}>{!online ? "Tap To Wake Up!" : "Active!"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuContainer} onPress={() => {navigation.navigate('Menu')}} >
          <Image style = {styles.menu} source={sidebar}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addFriendContainer} onPress={() => {navigation.navigate('AddFriend')}} >
          <Image style = {styles.addFriend} source={require('../assets/plus.png')}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.container} onPress={() => updateFriends()}>
          <Image style={online === false ? styles.avatarContainerInactive : styles.avatarContainerActive} 
            source={require('../assets/user.png')}/>
          <Text style={styles.name}>{userName}</Text>
      </TouchableOpacity>
      {updateFriends()}
    </View>

  );
}

export default withNavigation(BubbleMap);
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF5E0',
      alignItems: 'center',
      marginTop: '0%'
    },
    avatarContainerInactive: {
      padding:0,
      margin:0,
      borderRadius: 400,
      width: 320,
      height: 360,
      marginBottom: '0%',
      marginTop: '0%',
      backgroundColor: '#768185',
      transform: [{ scale: .3 }]
    },
    avatarContainerActive: {
      padding:0,
      margin:0,
      borderRadius: 400, 
      width: 320,
      height: 360,
      marginBottom: '0%',
      marginTop: '0%',
      backgroundColor: '#61dafb',
      transform: [{ scale: .3 }]
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
    addFriendContainer: {
      width: 35,
      height: 35,
      marginTop: 53,
      marginBottom: 10,
      marginLeft: -50,
      position: "absolute"
    },
    addFriend: {
      width: 35,
      height: 35,
      transform: [{ scale: 1.4 }]
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
    statusButtonOff: {
      width: "65%",
      backgroundColor: "#F07F7F",
      borderRadius: 5,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: 50,
    },
    statusButtonOn: {
      width: "65%",
      backgroundColor: "#88E5B3",
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
      fontWeight: "bold"
    },
    name: {
      fontFamily: "gotham_rounded_medium",
      color: "#1c2e4a",
      fontWeight: "bold",
      marginTop: -120
    }
  });