import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';

export default class IncDecBeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            db: firestore(),
            unoccupied: 0,
            ward: '',
            hospital: '',
            ward_no: '',
            total: 0,
            occupied: 0,
            val: 0,
            occInit: 0,
            unoccInit: 0,
            visible:false,
            short_of : 0,
            visible1: false

        }

    }

    componentDidMount() {
        console.log('On IncDecBeds')
        const { state } = this.props.navigation;

        let hospital = state.params.hospital
        let ward = state.params.ward

        this.setState({
            hospital: state.params.hospital,
            ward: state.params.ward,
            ward_no: state.params.ward_no

        })

        this.retrieveData(hospital, ward)
    }

    retrieveData = async (hospital, ward) => {
        console.log(hospital, ward)
        try {
            console.log('fetching..')
            await firestore().collection('Hospitals').doc(hospital).collection(hospital).doc(ward)
                .onSnapshot(documentSnapshot => {
                    //console.log('User data: ', documentSnapshot.data());
                    this.setState({
                        ward_no: documentSnapshot.data().ward_no,
                        total: documentSnapshot.data().total,
                        occupied: documentSnapshot.data().occupied,
                        unoccupied: documentSnapshot.data().unoccupied,
                        occInit: documentSnapshot.data().occupied,
                        unoccInit: documentSnapshot.data().unoccupied,

                    })
                });


        }
        catch {
            console.log(error)
        }
    }

    increment = () => {

        if (parseInt(this.state.val) <= parseInt(this.state.unoccupied)) {
            this.setState({
                occupied: parseInt(this.state.occupied) + parseInt(this.state.val),
                unoccupied: parseInt(this.state.unoccupied) - parseInt(this.state.val)
            })
        }
        else {
            let diff = parseInt(this.state.val) - parseInt(this.state.unoccupied)
            //alert('Falling short of ' + diff + ' beds')
            this.setState ({
                visible: true,
                occupied: parseInt(this.state.total),
                unoccupied: 0,
                short_of: diff
            })
        }
    }

    decrement = () => {
        if (parseInt(this.state.val) <= parseInt(this.state.occupied))
        {this.setState({
            unoccupied: parseInt(this.state.unoccupied) + parseInt(this.state.val),
            occupied: parseInt(this.state.occupied) - parseInt(this.state.val)
        })}
        else {
            this.setState({
                occupied: 0,
                unoccupied: parseInt(this.state.total)
            })
        }
    }

    changeStatus = async () => {
        firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(this.state.ward).update({
            //total: this.state.total,
            occupied: this.state.occupied,
            unoccupied: this.state.unoccupied,
            //ward_no: this.state.ward_no,

        })
            .then(this.setState({visible1:true}))
            .catch((error) => {
                console.log("Error changing status ", error)
            })
    }


    signout = async () => {
        await auth().signOut()
        this.props.navigation.navigate('LoginScreen')
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
                <Text style={styles.heading}>WARD {this.state.ward_no}</Text>
                <Text style={styles.info}>Beds occupied : {this.state.occupied}/{this.state.total}</Text>
                <Text style={styles.info}>Beds unoccupied : {this.state.unoccupied}</Text>
                <Text style={styles.info2}>Change current occupied bed status</Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                    <TextInput
                        style={styles.input}
                        placeholder='Change by no.'
                        keyboardType='numeric'
                        onChangeText={(val) => {
                            this.setState({
                                val: val

                            })
                        }}

                    />

                    <TouchableOpacity
                        style={styles.buttonleft}
                        onPress={() => this.increment()}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonright}
                        onPress={() => this.decrement()}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 40, textAlign: 'center' }}>-</Text>
                    </TouchableOpacity>
                </View>


                <Text style={styles.info3}>Click DONE to save status</Text>

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.changeStatus()}
                >
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>DONE</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.signout()}
                >
                    <Text style={styles.signOut}>Sign out</Text>
                </TouchableOpacity>

                <Dialog
                    visible={this.state.visible}
                    dialogTitle = {<DialogTitle title="NOTICE"/>}
                    footer={
                        <DialogFooter>
                           <DialogButton
                            text="Cancel"
                            onPress={() => this.setState({visible: false})}
                          />
                          <DialogButton
                          
                            text="OK"
                            onPress={() => {}}
                          />
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>Falling short of {this.state.short_of} beds .</Text>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>Check availability in other hospitals ?</Text>
                    </DialogContent>
                </Dialog>
                <Dialog
                    visible={this.state.visible1}
                    //dialogTitle = {<DialogTitle title="NOTICE"/>}
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
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>Status changed successfully !</Text>
                
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
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        alignSelf: 'center'
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
    info: {
        fontSize: 20,
        margin: 15
    },
    info2: {
        fontSize: 20,
        marginTop: 100,
        fontWeight: 'bold',
        color: 'red',
        alignSelf: 'center'
    },
    info3: {
        fontSize: 15,
        marginTop: 100,
        fontWeight: 'bold',
        color: '#e0e0e0',
        alignSelf: 'center'
    },
    signOut: {
        alignSelf: 'center',
        fontSize: 20,



    },
    button: {
        width: 100,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        alignSelf: 'center',
        margin: 90,
        elevation: 2
    },
    buttonleft: {
        width: 55,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        borderRadius: 10,
        //borderRightWidth:1,
        //borderColor: 'white',
        elevation: 5,
        marginLeft: 20,
        marginRight: 20
    },
    buttonright: {
        width: 55,
        height: 50,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 8

    },
    button2: {

        backgroundColor: 'black',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        elevation: 5,

    },
    input: {
        fontSize: 20,
        borderBottomWidth: 1,
        textAlign: 'center'

    }


})


/*




<TouchableOpacity onPress={() => { }}>
                    <Icon style={{ margin: 12, alignSelf: 'center', flexDirection: 'column' }}
                        name="undo"
                        size={25}
                        color="#3f51b5"
                    />

                    OR

                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.reset()}
                >
                    <Text style={styles.signOut}>Reset</Text>
                </TouchableOpacity>

                reset = () => {
        this.setState({
            occupied: this.state.occInit,
            unoccupied: this.state.unoccInit
        })

    }
*/
