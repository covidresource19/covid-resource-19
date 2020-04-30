import * as firebase from 'firebase/app'
import React from 'react';
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker
} from 'react-native';
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'

import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';


export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: '',
            pass: '',
            pass2: '',
            hospital: '',
            textVisible: false,
            
            db: firebase.firestore(),
            visible: false,
            check: false,
            keywords : []
        }
    }
    
    hospital = hospital => {
        this.setState({ hospital: hospital })
    }
    
    LoginId = Id => {
        this.setState({ Id: Id })
    }
    Password = pass => {
        this.setState({ pass: pass })
    }
    RePassword = pass2 => {
        this.setState({ pass2: pass2 })
    }

    check = () => {
        console.log('checking')
        
        console.log(this.state.hospital)
        
        console.log(this.state.Id)
        console.log(this.state.pass)
        console.log(this.state.pass2)
        
        
        if (this.state.hospital != '')
            this.setState({ check: true })
        
        else if (this.state.Id != '')
            this.setState({ check: true })
        else if (this.state.pass != '')
            this.setState({ check: true })
        else if (this.state.pass2 != '')
            this.setState({ check: true })
        
        else{
            this.setState({ check: false })
            console.log('failed')
        }



    }
    signUp = () => {
        console.log(this.state.Id)
        //this.check()
        /*if (this.state.pass == this.state.pass2) {
            firebase.auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                .then(() => this.addusertodb());
        }
        else {
            this.setState({ textVisible: true })
        }*/
        //if (this.state.check) {
            console.log('happening')
            this.setState({ visible: false })
            if (this.state.pass == this.state.pass2) {
                firebase.auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                    .then(() => this.addusertodb());
            }
            else {

                this.setState({ textVisible: true })
            }
        }
       /*else {
            this.setState({ visible: true })
            console.log('not happeming')
        //}*/

    //}
    login = () => {
        this.props.navigation.navigate('LoginScreen')
    }
    
    handleEventName = (name) => {
        this.setState ({ event_name: name})
        let arrName = [''];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        })
        this.setState({keywords: arrName})
        return arrName;
    }
    addusertodb = async() => {
        console.log('adding')
        let arr = this.handleEventName(this.state.hospital)
        console.log('adding...')
        await this.state.db.collection("Users").doc(this.state.hospital).set({
            
            hospital: this.state.hospital,
            email: this.state.Id.toLowerCase(),
            keywords: this.state.keywords

        })
        .catch((e) => console.log(e))
        console.log('added')
        // this.props.navigation.navigate('LoginScreen')
    }
    render() {
        return (
                <ScrollView style={{ padding: 10, marginTop: 20 }}>
                    <View style={style.container}>
                        
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="hospital-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Hospital'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.hospital}>
                            </TextInput>
                        </View>
                        
                        
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="user" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                placeholder='Email Id'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.LoginId}
                                autoCapitalize='none'
                                keyboardType='email-address'>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.Password}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Re Enter your Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.RePassword}>
                            </TextInput>
                        </View>
                        {
                            this.state.textVisible ? <Text style={{ alignSelf: 'center', color: 'red' }}>Password did not match</Text> : null
                        }
                        <Dialog
                            visible={this.state.visible}
                            dialogTitle={<DialogTitle title="CAUTION" />}
                            footer={
                                <DialogFooter>

                                    <DialogButton
                                        text="OK"
                                        onPress={() => this.setState({ visible: false })}
                                    />
                                </DialogFooter>
                            }
                            dialogAnimation={new SlideAnimation({
                                slideFrom: 'bottom',
                            })}
                        >
                            <DialogContent>
                                <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Please fill up all the fields!</Text>
                            </DialogContent>
                        </Dialog>
                        <View style={{flexDirection:'row' , marginTop:10,marginBottom:10}}>
                        <TouchableOpacity onPress={() => this.signUp()} >
                            <View style={style.button1}>
                                <Text style={style.textbutton}>Sign Up</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.login} >
                            <View style={style.button1}>
                                <Text style={style.textbutton}>Go To LogIn</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    header: {
        paddingTop: 30,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: "center",
        padding: 10,
        paddingBottom: 40
    },
    textbutton: {
        fontSize: 20,
        alignSelf: "center",
        color: 'white'
    },
    textInput: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    button1: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        width:150,
        marginBottom: 10,
        marginRight:20,
        marginLeft:20
    },
    button2: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40,
        width:170
    },
    textInput1: {
        height: 50,
        width: 74,
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
})