import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import React from 'react'
import { ActivityIndicator, View,  } from 'react-native'

export default class Divider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: auth().currentUser.email,
            type: '',
        }
    }
    componentDidMount = async () => {
        const usersRef = firestore().collection('Admins').doc(this.state.email)

        usersRef.get()
            .then((docSnapshot) => {
                console.log(docSnapshot.exists)
                if (docSnapshot.exists) {
                    this.props.navigation.navigate('CheckWard')
                } else {
                    console.log('Staff')
                    this.props.navigation.navigate('CheckWardStaff')
                }
            });
    }

    render() {
        return (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}