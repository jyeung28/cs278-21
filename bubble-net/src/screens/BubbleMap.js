import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import sidebar from '../assets/sidebar-icon.png'
import { useNavigation } from '@react-navigation/native';

import firebase from "firebase/app";
import "firebase/firestore";
// import { auth } from "firebase/auth";
// import { database } from "firebase/database";

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
function changeStatus(online) {
  if (online == false) {
    setOnline(true);
    console.log("Set online");
  } else {
    setOnline(false);
    console.log("Went offline");
  }
}

function BubbleMap() {
  useEffect(() => {
    // Assuming user is logged in
    const userId = firebase.auth().currentUser.uid;
    console.log("Presence detected for " + userId);
    const reference = firebase.database().ref(`/online/${userId}`);

    // Set the /users/:userId value to true
    reference.set(true).then(() => console.log('Online presence set'));
    
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));

  }, []);

  const navigation = useNavigation();

  const [online, setOnline] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={online === false ? styles.statusButtonOff : styles.statusButtonOn}>
          <Text style={styles.statusText}>Tap to Wake Up!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer} onPress={() => {navigation.navigate('Menu')}}>
          <Image style = {styles.menu} source={sidebar}/>
        </TouchableOpacity>
      </View>

    </View>
  ); 
};

export default withNavigation(BubbleMap);

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