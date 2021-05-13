import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import x from '../assets/x.png'

import firebase from "firebase/app";
import "firebase/firestore";
// import { auth } from "firebase/auth";
// import { database } from "firebase/database";

// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';

function Menu() {
  const navigation = useNavigation();

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

      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('LogIn')}}>
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