import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import firebase from 'firebase'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            db : firebase.firestore(),
        }
    }


    componentDidMount(){
        const user = firebase.auth().currentUser
        this.setState({email : user.email })
        console.log("success kinda")
        console.log(user.email)
        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        
        
      }

    render() {
        return (
            <View style = {{flex:1, justifyContent:'center'}}>
                <Text>Welcome {this.state.email}</Text>
            </View>
        )
    }
}