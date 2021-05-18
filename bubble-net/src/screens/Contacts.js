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



function Contacts() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactsMap, setMap] = useState({});
  const [contactsFound, updateContacts] = useState(false);

  function retrieveContacts() {
    var friendMap = {};
    const userKey = firebase.auth().currentUser.uid;
    const friendListRef = firebase.database().ref('Users').child(userKey).child('friends')


    friendListRef.once('value', function(snap) {
      snap.forEach(function(childNodes) {
        const friendKey = childNodes.key
        var friendName = childNodes.val().name
        var friendPhone = childNodes.val().phone
        var friendStatus = childNodes.val().active
        friendMap[friendName] = {name: friendName, phone: friendPhone, status: friendStatus}
      });
    });

    setMap(friendMap);
    updateContacts(true);
  }

  function makeButton(data){
    return(
        <TouchableOpacity style={styles.friendContainer}> 
          <Image style={styles.friendContainerActive} 
              source={require('../assets/user.png')}/>
          <Text style={styles.name}>{data}{"\n"}{contactsMap[data].phone}</Text>
        </TouchableOpacity>
      );
  }

  // var grid = makeAvatarGrid()
  // console.log(grid)
  // console.log(contactsMap)
  // console.log(Object.keys(contactsMap).map(makeButton)

  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <View style={styles.statusButton}>
          <Text style={styles.statusText}>Contacts</Text>
        </View>

        <TouchableOpacity style={styles.menuContainer} onPress={() => {navigation.navigate('Menu')}}>
          <Image style = {styles.menu} source={x}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => retrieveContacts()}>
          <Text style={styles.buttonText}>Retrieve contacts</Text>
      </TouchableOpacity>  

      <View style={styles.avatarGrid}>{Object.keys(contactsMap).map(makeButton,this)}</View> 
      
    </View>
  ); 
};

export default withNavigation(Contacts);

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
  avatarGrid: {
    flex: 0,
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: "white",
    width: '90%'
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
  avatarContainer: {
    alignItems: "center",
    position: "relative",
    marginBottom: 20
  },
  avatarGrid: {
    flex: 0,
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  friendContainer: {
    alignItems: "center",
    position: "relative",
    flexWrap: 'wrap',
  },
  friendContainerActive: {
    borderRadius: 400, 
    margin: 20,
    width: 96,
    height: 108,
    backgroundColor: '#f8bb78',
    position: "relative"
  },
  name: {
    fontFamily: "gotham_rounded_medium",
    color: "#1c2e4a",
    fontWeight: "bold",
  },
});