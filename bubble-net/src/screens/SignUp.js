import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
// import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// // If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
// import "firebase/firestore";

// const signUpUser = async (email, password1, password2, props) => {
//   if (password1 === password2) {
//     firebase.auth().createUserWithEmailAndPassword(email, password1)
//       .then((userCredential) => {
//         // Signed in 
//         var user = userCredential.user;
//         firebase.database().ref('users/' + user.uid).set({
//           email: user.email,
//         });
//         console.log("Signed up " + user);
//         props.navigation.navigate('SignUpChild');
//       })
//       .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//       });
//   }
// }

class SignUp extends React.Component {
  state = {
    phone: "",
    password1: "", 
    password2: ""
  }

  render() {

    return (
      <View style={styles.container}>        
        <Image style={styles.logo}
          source={require('../assets/logo.png')}/>

        <Text style={styles.welcomeMessage}>What is your phone number?</Text>
  
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Phone number..."
            placeholderTextColor="#767676"
            onChangeText={text => this.setState({ phone: text })} />
        </View>

        <Text style={styles.welcomeMessage}>Create your password below.</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#767676"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password1: text })} />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Confirm password..."
            placeholderTextColor="#767676"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password2: text })} />
        </View>

        <TouchableOpacity style={styles.nextBtn} /*onPress={() => {signUpUser(this.state.email, this.state.password1, this.state.password2, this.props)}}*/>
          <Text style={styles.btnText}>NEXT</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {this.props.navigation.navigate('LogIn')}}>
          <Text style={styles.link}>Back to Log In</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default withNavigation(SignUp);


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