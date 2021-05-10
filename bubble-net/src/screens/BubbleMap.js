import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

class BubbleMap extends React.Component {
  state = {
    email: "",
    password: ""
  }
    render() {

      return (
      <TouchableOpacity style={styles.container} /*onPress={() => {this.props.navigation.navigate('Login')}}*/>
          <Image style={styles.logo} 
            source={require('../assets/logo.png')}/>
      </TouchableOpacity>
    );
  }   
};

export default withNavigation(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: '0%'
  },
  logo: {
  	width: 300,
  	height: 300,
  	marginBottom: 20,
    marginTop: '60%'
  },
  fieldTrip: {
    fontWeight: "bold",
    fontSize: 45,
    color: "#18A3A7",
    marginBottom: 15
  }
});