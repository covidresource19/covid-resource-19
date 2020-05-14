import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
//import AsyncStorage from '@react-native-community/async-storage'

export default class DividerWard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: auth().currentUser.email,
            type: '',
        }
    }
    componentDidMount = async () => {

        const {state} = this.props.navigation;

        let hospital = state.params.hospital
        let ward = 'Ward '+ state.params.ward_no
        firestore()
            .collection('Hospitals')
            .doc(hospital).collection(hospital).doc(ward)
            .get()
            .then(documentSnapshot => {
                console.log('Ward exists: ', documentSnapshot.exists);
                
                if (documentSnapshot.exists) {
                    console.log('User data: ', documentSnapshot.data());
                    this.props.navigation.navigate('current',{hospital: hospital, ward: ward, ward_no: state.params.ward_no})

                }
                else{
                    this.props.navigation.navigate('HomeIt',{hospital: hospital, ward: ward, ward_no: state.params.ward_no})
                }
            });
    }

    render() {
        return (
            <View>
                <ActivityIndicator size="large" color="#ff7043" />
            </View>
        )
    }
}