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
    }
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
        () => this.props.navigation.navigate('Home')
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
          <Text style={style.header}>COVID-19</Text>
          <View style={{ flexDirection: 'row', padding: 5, }}>
            <Icon name="user" size={25} color="black" style={{ paddingTop: 10 }} />
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
          <View style={{ flexDirection: 'row', padding: 5, marginBottom: 20 }}>
            <Icon name="lock" size={30} color="black" style={{ paddingTop: 9 }} />
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
        </View>

    )
  }
}
const style = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    margin: 10,
    marginTop: 200,
    backgroundColor: 'white'
  },
  header: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: "center",
    padding: 10,
    paddingBottom: 40,
    color: 'black',
    fontStyle: "italic"
  },
  textbutton: {
    fontSize: 20,
    alignSelf: "center",
    color: 'white',
    textAlign:'center'
  },
  textInput: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  button1: {
    backgroundColor: '#341f97',
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
    backgroundColor: '#341f97',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 40,
    width:150,

  },
})