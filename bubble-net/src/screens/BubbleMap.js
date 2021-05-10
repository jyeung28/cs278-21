import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';
import sidebar from '../assets/sidebar-icon.png'

class BubbleMap extends React.Component {
  state = {
    email: "",
    password: ""
  }
    render() {

      return (
      <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.statusButton}>
              <Text style={styles.statusText}>Tap to Wake Up!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}>
              <Image style = {styles.menu} source={sidebar}/>
            </TouchableOpacity>
          </View>

        </View>
    );
  }   
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
  statusButton: {
    width: "65%",
    backgroundColor: "#F07F7F",
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