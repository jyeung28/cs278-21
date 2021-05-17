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



status = 0
var friends = {};

function BubbleMap() {
  const navigation = useNavigation();
  const [online, setOnline] = useState(false);
  useEffect(() => {
    // // Assuming user is logged in
    // const userId = firebase.auth().currentUser.uid;
    // console.log("Presence detected for " + userId);
    // const reference = firebase.database().ref(`Users`);
    // //Iterate Through Friends and Set Presence to True 
    // //


    // // Set the /users/:userId value to true
    // //reference.set(true).then(() => console.log('Online presence set'));
    
    // // reference
    // //   .onDisconnect()
    // //   .remove()
    // //   .then(() => console.log('On disconnect function configured.'));


    
  }, []);
  

 function changeStatus(online) {
    

    const userId = firebase.auth().currentUser.uid;
    console.log("Presence detected for " + userId);
    const reference = firebase.database().ref(`Users`);
    const userReference = firebase.database().ref(`Users`).child(userId);
    const friendsListRef = userReference.child(`friends`);

      //Iterate Through Friends and Set Presence to True 
      friendsListRef.once('value', (data) => {
        //console.log(data.val())
        data.forEach((friend) => {
          //console.log(friend.key === md5(friend.child(`phone`).val()))
          //console.log(friend)
          //reference.child(friend.key).child(`active`).set(online);
          reference.orderByChild(`ID`).equalTo(md5(friend.child(`phone`).val())).limitToFirst(1).on(`value`, function(snapshot) {
            //console.log(snapshot); //.child(`friends`).child(md5(friend.child(`phone`).val())).child( `active`));
            for(var friendID in snapshot.val()){
              //console.log(snapshot.child(friendID).child(`friends`))
              for(var info in snapshot.child(friendID).child(`friends`).val()){
                  console.log("set " + friendID +   "    :      " + info + " :   to " + online)
                  reference.child(friendID).child(`friends`).child(info).child(`active`).set(online)
                  reference.child(friendID).child(`friends`).child(info).child(`active`).onDisconnect().set(false)
                  
              }
            }
          });
        });
      }, []);
    setOnline(!online);
    console.log(online ? "Went offline" : "Set online");
  }

function updateFriends(){


}



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={online === false ? styles.statusButtonOff : styles.statusButtonOn} onPress={() => {changeStatus(online)}}>
          <Text style={styles.statusText}>{!online ? "Tap To Wake Up!" : "Active!"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer} onPress={() => {navigation.navigate('Menu')}} >
          <Image style = {styles.menu} source={sidebar}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addFriendContainer} onPress={() => {navigation.navigate('AddFriend')}} >
          <Image style = {styles.addFriend} source={require('../assets/plus.png')}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.container} onPress={() => {}}>
          <Image style={online === false ? styles.avatarContainerInactive : styles.avatarContainerActive} 
            source={require('../assets/user.png')}/>
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
      padding:10,
      margin:20,
      borderRadius: 400,
      width: 320,
      height: 360,
      marginBottom: '20%',
      marginTop: '40%',
      backgroundColor: '#768185',
      transform: [{ scale: .3 }]
    },
    avatarContainerActive: {
      padding:10,
      margin:20,
      borderRadius: 400, 
      width: 320,
      height: 360,
      marginBottom: '20%',
      marginTop: '40%',
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
    }
  });