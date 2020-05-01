import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            db : firestore(),
        }
    }


    componentDidMount(){
        const user = auth().currentUser
        this.setState({email : user.email })
        console.log("success kinda")
        console.log(user.email)
        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        
        
      }
      signout = async() =>{
        await auth().signOut()
        this.props.navigation.navigate('LoginScreen')
      }
    render() {
        return (
            <View style = {{flex:1, justifyContent:'center'}}>
                <Text>Welcome {this.state.email}</Text>
                <Button 
                    onPress ={() => this.signout()}
                    title = 'signOut'
                />
            </View>
        )
    }
}