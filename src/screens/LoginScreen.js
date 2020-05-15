import auth from '@react-native-firebase/auth'
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import messaging from '@react-native-firebase/messaging'
import Icon from 'react-native-vector-icons/FontAwesome'
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Id: '',
      pass: '',
      userId: '',
      date: '',
      visible: false,
      context: '',
      fcmToken : '',
    }
  }

  componentDidMount = async => {
    this.checkPermission()
  }
  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
        this.getFcmToken();
    } else {
        this.requestPermission();
    }
  }

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      this.state.fcmToken = fcmToken
      console.log('firebase token = ' + fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }

  requestPermission = async () => {
    try {
      await messaging().requestPermission();
      // User has authorised
    } catch (error) {
        // User has rejected permissions
    }
  }

  sendNotif = async() => {
  }


  LoginId = Id => {
    this.setState({ Id: Id })

  } 
  Password = pass => {
    this.setState({ pass: pass })
  }
  navsidnout = () => {
    this.props.navigation.navigate('Home')
  }
  login = () => {
    auth().signInWithEmailAndPassword(this.state.Id, this.state.pass)
      .then(
        () => this.props.navigation.navigate('Divider')
      ).catch((e) => this.check(e))
  }
  check = (e) => {
    this.state.visible = true
    this.setState({
      context : e
    })
  }
  signUp = () => {
    this.props.navigation.navigate('SignUpScreen')
  }
  render() {
    console.disableYellowBox = true

    return (
        <View style={style.container}>
          <Text style={style.header}>COVID-19 RESOURCE</Text>
          <View style={{ flexDirection: 'row', padding: 5, }}>
          <View style = {{height: 40, width: 40, backgroundColor: 'black', borderRadius: 8,alignContent: 'center', justifyContent: 'center' , marginRight:5}}>
            <Icon name="user" size={22} color='#ffccbc' style={{ padding: 12,  }} /></View>
            <TextInput
              placeholder='Login ID'
              placeholderTextColor='black'
              onChangeText={this.LoginId}
              keyboardType='email-address'
              textContentType='emailAddress'
              maxFontSizeMultiplier={100}
              autoCapitalize='none'
              style={style.textInput}
            >
            </TextInput>
          </View>
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
            })}>
            <DialogContent>
              <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>{this.state.context.toString()}</Text>
            </DialogContent>
          </Dialog>
          <View style={{ flexDirection: 'row', padding: 5, marginBottom: 20 , marginTop: 8}}>
            <View style = {{height: 40, width: 40, backgroundColor: 'black', borderRadius: 8,alignContent: 'center', justifyContent: 'center' , marginRight:5}}>
            <Icon name="lock" size={22} color='#ffccbc' style={{ padding: 12,  }} /></View>
            <TextInput
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='black'
              onChangeText={this.Password}
              style={style.textInput}
            >
            </TextInput>
          </View>
          <Text></Text>

          <View style={{ alignContent: 'center', paddingLeft: 0 ,flexDirection:'row' }}>
            <TouchableOpacity onPress={this.login} >
              <View style={style.button1}>
                <Text style={style.textbutton}>Log In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.signUp} >
              <View style={style.button2}>
                <Text style={style.textbutton}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            
          </View>
          <TouchableOpacity onPress={this.sendNotif()} >
              <View style={style.button2}>
                <Text style={style.textbutton}>Notif</Text>
              </View>
            </TouchableOpacity>

        </View>

    )
  }
}
const style = StyleSheet.create({
  container: {
    justifyContent:'center',
    flex:1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    margin: 10,
    //marginTop: 200,
   // backgroundColor: '#fbe9e7'
  },
  header: {
    paddingTop: 30,
    fontSize: 47,
    fontWeight: 'bold',
    alignSelf: "center",
    padding: 10,
    paddingBottom: 40,
    color: 'black',
    fontStyle: "italic",
    //width: 240,
    textAlign :'center',
  },
  textbutton: {
    fontSize: 20,
    alignSelf: "center",
    color: '#ffccbc',
    textAlign:'center',
    fontWeight: 'bold'
  },
  textInput: {
    height: 50,
    width: '80%',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  button1: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 30,
    marginRight:20,
    width:150,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginLeft:20
  },
  button2: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 40,
    width:150,

  },
})