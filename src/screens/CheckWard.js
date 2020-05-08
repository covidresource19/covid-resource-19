import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';


export default class CheckWard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ward_no: '',
            email: '',
            hospital: '',
            visible :false
        }
    }

    componentDidMount(){
        const user = auth().currentUser
        this.setState({email : user.email})
        console.log("On CheckWard ...")
        console.log(user.email)
        this.retrieveData(user.email)

        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        
        
      }

      retrieveData = async(email) => {
          try {
              console.log('fetching on Checkward')
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

      check = () => {
          if(this.state.ward_no)
            this.props.navigation.navigate('DividerWard', {ward_no: this.state.ward_no,hospital: this.state.hospital})
        else 
            this.setState({visible:true})


      }

    render() {
        console.disableYellowBox = true

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
                <View style = {{flexDirection: 'row', justifyContent:'center', margin:50}}>
                    <Text style = {styles.input}>Enter the ward number : </Text>
                    <TextInput
                    
                    style = {{borderBottomWidth:1, fontSize:20, marginHorizontal:10, width:80, textAlign:'center'}}
                    
                    //placeholder='1'
                    autoFocus = 'true'
                    keyboardType='numeric'
                    onChangeText = {(ward_no) => this.setState({ward_no: ward_no})}
                    value={this.state.ward_no}
                    />
               </View>

               <TouchableOpacity
               style = {styles.button2}
               onPress = {() => this.check()}//this.props.navigation.navigate('DividerWard', {ward_no: this.state.ward_no,hospital: this.state.hospital})}
               >
                   <Text style = {{fontSize: 20, color: 'white', fontWeight: 'bold'}}>PROCEED</Text>
               </TouchableOpacity>

               <Dialog
                    visible={this.state.visible}
                    //dialogTitle = {<DialogTitle title="NOTICE"/>}
                    footer={
                        <DialogFooter>
                          <DialogButton
                          
                            text="OK"
                            onPress={() => this.setState({visible: false})}
                          />
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>Please enter ward number </Text>
                
                    </DialogContent>
                </Dialog>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignContent: 'center',

    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        padding: 15,
        fontWeight: 'bold'
    },
    input: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        
    },
    button2: {
        
        backgroundColor: 'black', 
        height: 42, 
        justifyContent:'center', 
        alignItems: 'center', 
        width: 120, 
        alignSelf:'center',
        marginTop: 50,
        borderRadius: 8
    }
})
