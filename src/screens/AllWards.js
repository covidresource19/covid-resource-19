import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList ,ActivityIndicator , TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AllWards extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style = {{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <Text>DISPLAY VACANCIES FOR VENTILATORS, OXY BEDS AND NON-OXY BEDS OF ALL WARDS </Text>
            </View>
        )
    }
}