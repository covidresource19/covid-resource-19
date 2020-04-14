import React from 'react';
import { Text, StyleSheet, ImageBackground, View} from 'react-native';
import firebase from 'firebase'
import "firebase/firestore";


export default class SplashScreen extends React.Component{
    
    componentDidMount = async() =>{
        console.log("starting")
        this.FirebaseIntialize()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setTimeout(
              () => this.props.navigation.navigate('Home'),
              1000
              )
            }else{
                setTimeout(
                () => this.props.navigation.navigate('LoginScreen'),
                1000
                )
            }
         });
    }
    FirebaseIntialize = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBoRFfgr1My_C6XVoJxBnJUGxpu5YKqmLo",
            authDomain: "covid19-7791b.firebaseapp.com",
            databaseURL: "https://covid19-7791b.firebaseio.com",
            projectId: "covid19-7791b",
            storageBucket: "covid19-7791b.appspot.com",
            messagingSenderId: "496933900215",
            appId: "1:496933900215:web:f2dfe4caa1b7933101e232",
            measurementId: "G-4H4D740JDD"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          //firebase.analytics();
        console.log('Firebase App Created')
    }
render(){
    return(
        <View>
            <Text style={style.text}>WELCOME TO</Text>
            <Text style={style.text}>COVID RESOURCE '19</Text>
        </View>
)}
}
const style = StyleSheet.create({
    text:{
        color:'black',
        fontSize:50,
        textAlign:'center'
    }
})