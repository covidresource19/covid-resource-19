import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, TextInput , StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';



export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            db : firestore(),
            hospital: '',
            total: 0,
            occupied: 0,
            unoccupied: 0,
            ward: '',
            ward_no: '',
            visible1: false
        }
    }


    componentDidMount(){
        const user = auth().currentUser
        this.setState({email : user.email})
        console.log("success kinda")
        console.log(user.email)

        const {state} = this.props.navigation;

        this.setState({
            
            ward : state.params.ward,
            hospital: state.params.hospital,
            ward_no: state.params.ward_no

        })
        
        
        
      }


      addWardToDb = async(unoccupied) => {
          //let ward = 'Ward '+this.state.ward_no
          //console.log(ward)
          try {
              firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(this.state.ward).set({
                  total: this.state.total,
                  occupied: this.state.occupied,
                  unoccupied: unoccupied,
                  ward_no: this.state.ward_no,
                  
              })
              .then(console.log('ward successfully added in Hospitals collection'))
              
                  firestore().collection('Users').doc(this.state.email).collection('Wards').doc(this.state.ward_no).set({
                      ward_no: this.state.ward_no,
                      totalSetInitially: this.state.total,
                      occupiedInitially: this.state.occupied,
                      unoccupiedInitially: unoccupied
                  })
                  .then(console.log('initial details added to user successfully'),this.props.navigation.navigate('IncDecBedss',{hospital: this.state.hospital, ward:this.state.ward}))



              


          }
          catch {
              console.log('Error adding ',error)

          }
      } 

      proceed = () => {
          console.log(this.state.ward_no)

          if(parseInt(this.state.total)>=parseInt(this.state.occupied) && parseInt(this.state.occupied)>=0 && parseInt(this.state.total)>0)
          {
            let diff = this.state.total - this.state.occupied;
          this.setState({ unoccupied: diff }),
          this.addWardToDb(diff)
          }
          else{
              this.setState({visible1:true})
          }
          
          
        
      }

      
    render() {
        console.disableYellowBox = true


        return (
            <View style = {styles.container}>
                <View style = {styles.header}>
        <Text style = {styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
        <Text style = {styles.ward}>{this.state.ward}</Text>
               <View style = {{flexDirection: 'row', justifyContent:'center', margin:40}}>
                    <Text style = {styles.input}>Total Number of Beds : </Text>
                    <TextInput
                    
                    style = {{borderBottomWidth:1, fontSize:20, marginHorizontal:10, width:80, textAlign:'center'}}
                    
                    //placeholder='100'
                    keyboardType='numeric'
                    onChangeText = {(total) => this.setState({total: total})}
                    />
               </View>
               <View style = {{flexDirection: 'row', justifyContent:'center', margin:10}}>
                    <Text style = {styles.input}>Beds occupied currently: </Text>
                    <TextInput
                    
                    style = {{borderBottomWidth:1, fontSize:20, marginHorizontal:10, width:80, textAlign:'center'}}
                    
                    //placeholder='57'
                    keyboardType='numeric'
                    onChangeText = {(occupied) => this.setState({occupied: occupied})}
                    />
               </View>

               <TouchableOpacity
               style = {styles.button2}
               onPress = {() => this.proceed()}
               >
                   <Text style = {{fontSize: 20, color: 'white', fontWeight: 'bold'}}>PROCEED</Text>
               </TouchableOpacity>
               <Dialog
                    visible={this.state.visible1}
                    dialogTitle = {<DialogTitle title="CAUTION"/>}
                    footer={
                        <DialogFooter>
                          <DialogButton
                          
                            text="OK"
                            onPress={() => this.setState({visible1: false})}
                          />
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>Invalid entry!</Text>
                
                    </DialogContent>
                </Dialog>

                
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent: 'space-between'

    },
    button: {
        //alignSelf: 'flex-end',
        width: 100
    },
    row: {
        margin:10,
        flexDirection:'row'
        
    },
    header: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignContent:'center',
       
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
        margin:13
        
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
        },
    ward: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 25
    }
    
})