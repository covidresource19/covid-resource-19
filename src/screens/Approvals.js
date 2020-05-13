import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'

export default class Approvals extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hospital: '',
            email: '',

        }
    }



    componentDidMount(){
        const user = auth().currentUser
        this.setState({email : user.email})
       // console.log("On Approvals ...")
        console.log(user.email)
        this.retrieveData(user.email)

        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        
        
      }

      retrieveData = async(email) => {
          try {
              console.log('fetching on Approvals')
              await firestore().collection("Users").doc(email)
              .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                this.setState({
                    hospital:documentSnapshot.data().hospital
                })
              });
        
              
          }
          catch {
              console.log(error)
          }
      }

      render() {
          return(
              <View style = {{flex: 1}}>
                  <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                    </View>
                    <Text style = {styles.title}>APPROVALS  REQUESTED</Text>
              </View>
          )
      }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignContent: 'center',

    },
    headerText: {
        color: '#fbe9e7',
        textAlign: 'center',
        fontSize: 30,
        padding: 15,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 22,
        margin:10,
        borderBottomWidth: 1,
        textAlign:'center'
    },
})