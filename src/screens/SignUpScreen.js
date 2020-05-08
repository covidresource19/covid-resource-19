import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
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
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalFilterPicker from 'react-native-modal-filter-picker'

import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';


export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: '',
            pass: '',
            pass2: '',
            hospital: '',
            textVisible: false,

            db: firestore(),
            visible: false,
            check: false,
            keywords: [],
            visible_picker: false,
            picked: null
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

        else {
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
            auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                .then(() => console.log('hello'), this.addusertodb());
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
        this.setState({ event_name: name })
        let arrName = [''];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        })
        this.setState({ keywords: arrName })
        return arrName;
    }
    addusertodb = async() => {
        console.log('adding')
        let arr = this.handleEventName(this.state.hospital)
        console.log('adding...')
        await this.state.db.collection("Users").doc(this.state.Id).set({
            
            hospital: this.state.hospital,
            email: this.state.Id.toLowerCase(),
            keywords: arr

        }).then(() => this.props.navigation.navigate('LoginScreen'))
        .catch((e) => console.log(e))
        console.log('added')
        //this.props.navigation.navigate('LoginScreen')
    }

    onShow = () => {
        this.setState({ visible_picker: true });
      }
    
      onSelect = (picked) => {
        this.setState({
          picked: picked.label,
          visible_picker: false,
          hospital: picked.label
        })
      }
    
      onCancel = () => {
        this.setState({
          visible_picker: false
        });
      }

    render() {
        console.disableYellowBox = true
        const { visible_picker, picked } = this.state;

        const options = [
            {
                key: '19.1268° N, 72.8363° E',
                label: 'Andheri Sports Complex'

             },
            {
                key: '19.1180° N, 72.8780° E',
                label: 'Seven Hills Hospital'
            },
            {
                key: '19.1221° N, 72.8950° E',
                label: 'MCMCR'
            },
            {
                key: '18.9410° N, 72.8274° E',
                label: 'Bombay Hospital',
            },
            {
                key: '18.9525° N, 72.8182° E',
                label: 'Saifee General Hospital',
            },
            {
                key: '18.9488° N, 72.7955° E',
                label: 'Saint Elizabeth Hospital',
            },
            {
                key: '18.9591° N, 72.8202° E',
                label: 'Reliance Foundation Hospital',
            },
            {
                key: '18.9597° N, 72.8332° E',
                label: 'MH Saboo Siddique & General Hospital',
            },
            {
                key: '18.9657° N, 72.8134° E',
                label: 'Bhatia Hospital',
            },
            {
                key: '18.9717° N, 72.8098° E',
                label: 'Jaslok Hospital',
            },
            {
                key: '18.9752° N, 72.8238° E',
                label: 'Wockhardt Hospital',
            },
            {
                key: '18.9995° N, 72.8409° E',
                label: 'Global Hospital',
            },
            {
                key: '19.0045° N, 72.8418° E',
                label: 'Bai Jerbai Wadia Hospital',
            },
            {
                key: '19.0335° N, 72.8383° E',
                label: 'Hinduja Hospital',
            },
            {
                key: '19.0463° N, 72.8427° E',
                label: 'S L Raheja Hospital',
            },
            {
                key: '19.0511° N, 72.8292° E',
                label: 'Lilavati Hospital',
            },
            {
                key: '19.0552° N, 72.8273° E',
                label: 'Bandra Holy Family Hospital',
            },
            {
                key: '19.0597° N, 72.8527° E',
                label: 'Guru Nanak Hospital',
            },
            {
                key: '19.0470° N, 72.8746° E',
                label: 'K.J. Somaiya Medical College and Research Centre',
            },
            {
                key: '19.1590° N, 72.8492° E',
                label: 'SRV Hospital',
            },
            {
                key: '19.0959° N, 72.8401° E',
                label: 'Dr Balabhai Nanavati Hospital',
            },
            {
                key: 'morocco',
                label: 'HJ Doshi Ghatkopar Hindu Sabha Hospital',
            },
            {
                key: '19.1204° N, 72.9171° E',
                label: 'Dr LH Hiranandani Hospital',
            },
            {
                key: '19.1313° N, 72.8251° E',
                label: 'Kokilaben Dhirubhai Ambani Hospital',
            },
            {
                key: '19.1621° N, 72.9420° E',
                label: 'Fortis Hospital Mulund',
            },
            {
                key: '19.0235° N, 72.8378° E',
                label: 'Shushrusha Hospital',
            },
            {
                key: '18.9804° N, 72.8337° E',
                label: 'Bharat Ratna Dr. Babasaheb Ambedekar Memorial Hospital',
            },
            {
                key: '19.1180° N, 72.8780° E',
                label: 'Seven Hills Hospital',
            },
            {
                key: '19.1078° N, 72.8362° E',
                label: 'HBT Medical College & RN Cooper Municipal Hospital'
            },
            {
                key: '19.0787° N, 72.9012° E',
                label: 'Rajwadi Hospital',
            },
            {
                key: '19.0652° N, 72.8779° E',
                label: 'Kurla Bhabha Hospital',
            },
            {
                key: '19.0025° N, 72.8421° E',
                label: 'Seth G.S. KEM Hospital',
            },
            {
                key: '20.7397° N, 78.6593° E',
                label: 'Kasturba Hospital',
            },
            {
                key: '18.9744° N, 72.8223° E',
                label: 'B.Y.L. Nair Charitable Hospital',
            },
            {
                key: '18.9631° N, 72.8336° E',
                label: 'Sir JJ Group of Hospitals',
            },
            {
                key: '18.9451° N, 72.8318° E',
                label: 'Gokuldas Tejpal Hospital',
            },
            {
                key: '18.9405° N, 72.8381° E',
                label: 'St. Gerorges Hospital',
            },
            {
                key: '19.0127° N, 72.8614° E',
                label: 'Mumbai Port Trust Hospital',
            },
            {
                key: '18.9706° N, 72.8240° E',
                label: 'Jagjivan Ram Hospital',
            },


            
        ];

        return (
            <ScrollView style={{ padding: 10, marginTop: 20 }}>
                <View style={style.container}>

                <View style={{ flexDirection: 'row', padding: 12,marginLeft:20,marginRight:20, marginBottom: 10 , borderBottomWidth:1}}>
                    <TouchableOpacity 
                    style = {{backgroundColor: '#bbdefb', borderRadius: 8, height: 30, justifyContent:'center', width: 120}}
                    title = 'Select Hospital'
                    onPress={this.onShow}>
                        <Text style = {{ textAlign: 'center'}}>Select Hospital</Text>
                    </TouchableOpacity>
                    
                    <Text style = {{fontSize: 20}}>  {picked}</Text>
                    
                    <ModalFilterPicker
                    placeholderText= 'Hospital'
                        visible={visible_picker}
                        onSelect={this.onSelect}
                        onCancel={this.onCancel}
                        options={options}
                        noResultsText= 'No matches'
                        //filterTextInputStyle = {{fontSize: 5}}
                        
                        //listContainerStyle = {{ }}
                        
                    />
                   
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
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <TouchableOpacity onPress={this.signUp} >
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
        width: 150,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20
    },
    button2: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40,
        width: 170
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