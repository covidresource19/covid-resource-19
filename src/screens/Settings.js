import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'


export default class Settings extends React.Component {

    constructor(props){
        super(props) 
        this.state = {
            hospital: '',
            ward: '',
            ward_no: ''
        }
    }

    componentDidMount() {
        const {state} = this.props.navigation;

        this.setState({
            hospital: state.params.hospital,
            ward: state.params.ward,
            ward_no: state.params.ward_no,

        })
    }

    signout = async () => {
        await auth().signOut()
        this.props.navigation.navigate('LoginScreen')
    }


    render() {
        return(
            <View style = {{flex: 1}}>
                <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                    </View>
                    <Text style={styles.title}>SETTINGS</Text>
                <View style = {{marginTop: 20, margin: 10}}>
                    <TouchableOpacity
                    onPress = {() => this.props.navigation.navigate('CheckWard')}
                    >
                    <View style = {styles.box}>
                    <Icon style={{ margin:10}}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="outdent"
                            size={35}
                            color="#ffab91"

                        />
                        <Text style = {styles.title1}>Change Ward</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress = {() => this.props.navigation.navigate('EditTotal',{hospital: this.state.hospital, ward: this.state.ward, ward_no: this.state.ward_no})}
                    >
                    <View style = {styles.box}>
                    <Icon style={{ margin:10}}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="pencil-square-o"
                            size={35}
                            color="#ffab91"

                        />
                        <Text style = {styles.title1}>Edit Total Count</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress = {() => this.signout()}
                    >
                    <View style = {styles.box}>
                    <Icon style={{ margin:10}}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="sign-out"
                            size={35}
                            color="#ffab91"

                        />
                        <Text style = {styles.title1}>Sign Out</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => this.props.navigation.navigate('current')}
                    >
                        <Text style={{ fontSize: 20, color: '#fbe9e7', fontWeight: 'bold' }}>BACK</Text>
                    </TouchableOpacity>
                    
                </View>
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
    title1: {
        fontSize: 22,
        margin: 13,
        marginLeft: 0,
        //fontStyle: 'italic'
    },
    box: {
        flexDirection: 'row',
        borderBottomWidth:1,
        marginBottom: 20,
        borderColor :"#ffccbc"
        
        
    },
    title: {
        fontSize: 22,
        margin: 10,
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button2: {

        backgroundColor: 'black',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        alignSelf: 'center',
        marginTop: 70,
        borderRadius: 8,
        elevation: 5,

    },
})