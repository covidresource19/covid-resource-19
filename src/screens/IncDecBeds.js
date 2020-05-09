import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet, ScrollView,  } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';

export default class IncDecBeds extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            db: firestore(),
            ward: '',
            hospital: '',
            ward_no: '',

            val_vent: 0,
            val_oxy: 0,
            val_nonoxy: 0,

            visible_vent: false,
            visible_oxy: false,
            visible_nonoxy: false,

            short_of_vent: 0,
            short_of_oxy: 0,
            short_of_nonoxy: 0,

            visible1: false,

            ventilator_total: 0,
            ventilator_occupied: 0,
            ventilator_unoccupied: 0,
            oxygen_total: 0,
            oxygen_occupied: 0,
            oxygen_unoccupied: 0,
            non_oxygen_total: 0,
            non_oxygen_occupied: 0,
            non_oxygen_unoccupied: 0,


            vent_occ_init: 0,
            vent_unocc_init: 0,


            oxy_occ_init: 0,
            oxy_unocc_init: 0,


            nonoxy_occ_init: 0,
            nonoxy_unocc_init: 0

        }

    }

    componentDidMount() {
        console.log('On IncDecBeds')
        const { state } = this.props.navigation;
        console.log(state)
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

                        ventilator_total: documentSnapshot.data().ventilator_total,
                        ventilator_occupied: documentSnapshot.data().ventilator_occupied,
                        ventilator_unoccupied: documentSnapshot.data().ventilator_unoccupied,

                        oxygen_total: documentSnapshot.data().oxygen_total,
                        oxygen_occupied: documentSnapshot.data().oxygen_occupied,
                        oxygen_unoccupied: documentSnapshot.data().oxygen_unoccupied,

                        non_oxygen_total: documentSnapshot.data().non_oxygen_total,
                        non_oxygen_occupied: documentSnapshot.data().non_oxygen_occupied,
                        non_oxygen_unoccupied: documentSnapshot.data().non_oxygen_unoccupied,

                        vent_occ_init: documentSnapshot.data().ventilator_occupied,
                        vent_unocc_init: documentSnapshot.data().ventilator_unoccupied,


                        oxy_occ_init: documentSnapshot.data().oxygen_occupied,
                        oxy_unocc_init: documentSnapshot.data().oxygen_unoccupied,


                        nonoxy_occ_init: documentSnapshot.data().non_oxygen_occupied,
                        nonoxy_unocc_init: documentSnapshot.data().non_oxygen_unoccupied,

                    })
                });


        }
        catch {
            console.log(error)
        }
    }

    //VENTILATORS

    incrementVent = () => {

        if (parseInt(this.state.val_vent) <= parseInt(this.state.ventilator_unoccupied)) {
            this.setState({
                ventilator_occupied: parseInt(this.state.ventilator_occupied) + parseInt(this.state.val_vent),
                ventilator_unoccupied: parseInt(this.state.ventilator_unoccupied) - parseInt(this.state.val_vent),
                val_vent: ''
            })
        }
        else {
            let diff = parseInt(this.state.val_vent) - parseInt(this.state.ventilator_unoccupied)
            //alert('Falling short of ' + diff + ' beds')
            this.setState({
                visible_vent: true,
                ventilator_occupied: parseInt(this.state.ventilator_total),
                ventilator_unoccupied: 0,
                short_of_vent: diff,
                val_vent: ''
            })
        }
    }


    decrementVent = () => {
        if (parseInt(this.state.val_vent) <= parseInt(this.state.ventilator_occupied)) {
            this.setState({
                ventilator_unoccupied: parseInt(this.state.ventilator_unoccupied) + parseInt(this.state.val_vent),
                ventilator_occupied: parseInt(this.state.ventilator_occupied) - parseInt(this.state.val_vent),
                val_vent: ''

            })
        }
        else {
            this.setState({
                ventilator_occupied: 0,
                ventilator_unoccupied: parseInt(this.state.ventilator_total),
                val_vent: ''
            })
        }
    }

    resetVent = () => {
        this.setState({
            ventilator_occupied: this.state.vent_occ_init,
            ventilator_unoccupied: this.state.vent_unocc_init,
            val_vent: ''
        })

    }

    //OXYGEN BEDS

    incrementOxy = () => {

        if (parseInt(this.state.val_oxy) <= parseInt(this.state.oxygen_unoccupied)) {
            this.setState({
                oxygen_occupied: parseInt(this.state.oxygen_occupied) + parseInt(this.state.val_oxy),
                oxygen_unoccupied: parseInt(this.state.oxygen_unoccupied) - parseInt(this.state.val_oxy),
                val_oxy: ''
            })
        }
        else {
            let diff = parseInt(this.state.val_oxy) - parseInt(this.state.oxygen_unoccupied)
            //alert('Falling short of ' + diff + ' beds')
            this.setState({
                visible_oxy: true,
                oxygen_occupied: parseInt(this.state.oxygen_total),
                oxygen_unoccupied: 0,
                short_of_oxy: diff,
                val_oxy: ''
            })
        }
    }


    decrementOxy = () => {
        if (parseInt(this.state.val_oxy) <= parseInt(this.state.oxygen_occupied)) {
            this.setState({
                oxygen_unoccupied: parseInt(this.state.oxygen_unoccupied) + parseInt(this.state.val_oxy),
                oxygen_occupied: parseInt(this.state.oxygen_occupied) - parseInt(this.state.val_oxy),
                val_oxy: ''

            })
        }
        else {
            this.setState({
                oxygen_occupied: 0,
                oxygen_unoccupied: parseInt(this.state.oxygen_total),
                val_oxy: ''
            })
        }
    }

    resetOxy = () => {
        this.setState({
            oxygen_occupied: this.state.oxy_occ_init,
            oxygen_unoccupied: this.state.oxy_unocc_init,
            val_oxy: ''
        })

    }


    //NON-OXYGEN BEDS

    incrementNonoxy = () => {

        if (parseInt(this.state.val_nonoxy) <= parseInt(this.state.non_oxygen_unoccupied)) {
            this.setState({
                non_oxygen_occupied: parseInt(this.state.non_oxygen_occupied) + parseInt(this.state.val_nonoxy),
                non_oxygen_unoccupied: parseInt(this.state.non_oxygen_unoccupied) - parseInt(this.state.val_nonoxy),
                val_nonoxy: ''
            })
        }
        else {
            let diff = parseInt(this.state.val_nonoxy) - parseInt(this.state.non_oxygen_unoccupied)
            //alert('Falling short of ' + diff + ' beds')
            console.log(typeof(diff))
            this.setState({
                visible_nonoxy: true,
                non_oxygen_occupied: parseInt(this.state.non_oxygen_total),
                non_oxygen_unoccupied: 0,
                short_of_nonoxy: diff,
                val_nonoxy: ''
            })
        }
    }


    decrementNonoxy = () => {
        if (parseInt(this.state.val_nonoxy) <= parseInt(this.state.non_oxygen_occupied)) {
            this.setState({
                non_oxygen_unoccupied: parseInt(this.state.non_oxygen_unoccupied) + parseInt(this.state.val_nonoxy),
                non_oxygen_occupied: parseInt(this.state.non_oxygen_occupied) - parseInt(this.state.val_nonoxy),
                val_nonoxy: ''

            })
        }
        else {
            this.setState({
                non_oxygen_occupied: 0,
                non_oxygen_unoccupied: parseInt(this.state.non_oxygen_total),
                val_nonoxy: ''
            })
        }
    }

    resetNonoxy = () => {
        this.setState({
            non_oxygen_occupied: this.state.nonoxy_occ_init,
            non_oxygen_unoccupied: this.state.nonoxy_unocc_init,
            val_nonoxy: ''
        })

    }

  // SAVING PROGRESS

    changeStatus = async () => {
        firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(this.state.ward).update({
           
                ventilator_occupied: this.state.ventilator_occupied,
                ventilator_unoccupied: this.state.ventilator_unoccupied,

               
                oxygen_occupied: this.state.oxygen_occupied,
                oxygen_unoccupied: this.state.oxygen_unoccupied,

                non_oxygen_occupied: this.state.non_oxygen_occupied,
                non_oxygen_unoccupied: this.state.non_oxygen_unoccupied,


        })
            .then(this.setState({ visible1: true }))
            .catch((error) => {
                console.log("Error changing status ", error)
            })
    }

    goToNearest = () => {
        this.setState({ visible_vent: false,visible_oxy: false,visible_nonoxy: false }),
            this.props.navigation.navigate("NearestHosp", {
                hospital: this.state.hospital,
                ward_no: this.state.ward_no
            })

    }


    signout = async () => {
        await auth().signOut()
        this.props.navigation.navigate('LoginScreen')
    }

    render() {
        console.disableYellowBox = true
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                    </View>

                    <Text style={styles.heading}>WARD {this.state.ward_no}</Text>
            



                    <View style={styles.box}>
                        <View style = {{flexDirection: 'row'}}>
                        <Icon style={{}}
                            name="bed"
                            size={25}
                            color="#ffab91"

                        />
                    <Text style={styles.boxHead}>  VENTILATORS  </Text>
                    
                    </View>
                        <Text style={styles.info}>Occupied : {this.state.ventilator_occupied}/{this.state.ventilator_total}</Text>
                        <Text style={styles.info}>Unoccupied : {this.state.ventilator_unoccupied}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center',padding: 5}}>
                        
                        <TextInput
                            style={styles.input}
                            placeholder='Change by no.'
                            placeholderTextColor = '#ff7043'
                            keyboardType='numeric'
                            onChangeText={(val) => {
                                this.setState({
                                    val_vent: val

                                })
                            }}
                            value={this.state.val_vent}

                        />

                        <TouchableOpacity
                            style={styles.buttonleft}
                            onPress={() => this.incrementVent()}
                        >
                            <Text style={styles.sign}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonright}
                            onPress={() => this.decrementVent()}
                        >
                            <Text style={styles.sign}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.resetVent()}>
                        <Icon style={styles.reset}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="undo"
                            size={25}
                            color="#757575"

                        />
                    </TouchableOpacity>

                    </View>
                    </View>




                    <View style={styles.box}>
                    <View style = {{flexDirection: 'row'}}>
                    <Icon style={{}}
                            name="bed"
                            size={25}
                            color="#ffab91"

                        />
                    <Text style={styles.boxHead}>  OXYGEN BEDS  </Text>
                    
                    </View>
                        <Text style={styles.info}>Occupied : {this.state.oxygen_occupied}/{this.state.oxygen_total}</Text>
                        <Text style={styles.info}>Unoccupied : {this.state.oxygen_unoccupied}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5}}>
                        
                        <TextInput
                            style={styles.input}
                            placeholder='Change by no.'
                            placeholderTextColor = '#ff7043'
                            keyboardType='numeric'
                            onChangeText={(val) => {
                                this.setState({
                                    val_oxy: val

                                })
                            }}
                            value={this.state.val_oxy}

                        />

                        <TouchableOpacity
                            style={styles.buttonleft}
                            onPress={() => this.incrementOxy()}
                        >
                            <Text style={styles.sign}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonright}
                            onPress={() => this.decrementOxy()}
                        >
                            <Text style={styles.sign}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.resetOxy()}>
                        <Icon style={styles.reset}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="undo"
                            size={25}
                            color="#757575"

                        />
                    </TouchableOpacity>

                    </View>
                    </View>

                    <View style={styles.box}>
                    <View style = {{flexDirection: 'row'}}>
                    <Icon style={{}}
                            name="bed"
                            size={25}
                            color="#ffab91"

                        />
                    <Text style={styles.boxHead}>  NON-OXYGEN BEDS  </Text>
                    
                    </View>
                        <Text style={styles.info}>Occupied : {this.state.non_oxygen_occupied}/{this.state.non_oxygen_total}</Text>
                        <Text style={styles.info}>Unoccupied : {this.state.non_oxygen_unoccupied}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center',padding: 5}}>
                        
                        <TextInput
                            style={styles.input}
                            placeholder='Change by no.'
                            placeholderTextColor = '#ff7043'
                            keyboardType='numeric'
                            onChangeText={(val) => {
                                this.setState({
                                    val_nonoxy: val

                                })
                            }}
                            value={this.state.val_nonoxy}

                        />

                        <TouchableOpacity
                            style={styles.buttonleft}
                            onPress={() => this.incrementNonoxy()}
                        >
                            <Text style={styles.sign}>+</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonright}
                            onPress={() => this.decrementNonoxy()}
                        >
                            <Text style={styles.sign}>-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.resetNonoxy()}>
                        <Icon style={styles.reset}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="undo"
                            size={25}
                            color="#757575"

                        />
                    </TouchableOpacity>

                    </View>
                    </View>

                    

                    <Text style={styles.info3}>Click DONE to save status</Text>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => this.changeStatus()}
                    >
                        <Text style={{ fontSize: 20, color: '#fbe9e7', fontWeight: 'bold' }}>DONE</Text>
                    </TouchableOpacity>
                </View>
                


                <Dialog
                    visible={this.state.visible_vent}
                    dialogTitle={<DialogTitle title="NOTICE" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Cancel"
                                onPress={() => this.setState({ visible_vent: false })}
                            />
                            <DialogButton

                                text="OK"
                                onPress={() => this.goToNearest()}
                            />
                        </DialogFooter>
                    }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Falling short of {this.state.short_of_vent} ventilators .</Text>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Check availability in other hospitals ?</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visible_oxy}
                    dialogTitle={<DialogTitle title="NOTICE" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Cancel"
                                onPress={() => this.setState({ visible_oxy: false })}
                            />
                            <DialogButton

                                text="OK"
                                onPress={() => this.goToNearest()}
                            />
                        </DialogFooter>
                    }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Falling short of {this.state.short_of_oxy} oxgen beds .</Text>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Check availability in other hospitals ?</Text>
                    </DialogContent>
                </Dialog>

                <Dialog
                    visible={this.state.visible_nonoxy}
                    dialogTitle={<DialogTitle title="NOTICE" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Cancel"
                                onPress={() => this.setState({ visible_nonoxy: false })}
                            />
                            <DialogButton

                                text="OK"
                                onPress={() => this.goToNearest()}
                            />
                        </DialogFooter>
                    }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Falling short of {this.state.short_of_nonoxy} non-oygen beds .</Text>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Check availability in other hospitals ?</Text>
                    </DialogContent>
                </Dialog>
                
                <View style = {{margin: 20}}>
                    <View style = {{flexDirection: 'row'}}>
                    <Icon style={{marginLeft:10}}//borderWidth:1, padding:8, borderRadius:8,backgroundColor:'#e0e0e0', borderColor:'#757575'}}//height:28, width:28}}
                            name="exclamation-triangle"
                            size={22}
                            color="red"

                        />
                        <Text style = {{marginLeft: 10, fontSize: 20, color: '#ffab91'}}>Falling short of </Text>
                    </View>
                    <View style = {{marginLeft: 30}}>
                    
                <Text style = {styles.note}> {this.state.short_of_vent} ventilators</Text>
                
                <Text style = {styles.note}> {this.state.short_of_oxy} oxygen beds</Text>
                <Text style = {styles.note}> {this.state.short_of_nonoxy} non-oxygen beds</Text>
                </View>
                </View>
                <View>
                    <View style={{ marginTop: 50, marginHorizontal: 10, justifyContent: 'space-between', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>

                            <TouchableOpacity
                                style={styles.button4}
                                onPress={() => this.props.navigation.navigate("NearestHosp", {
                                    hospital: this.state.hospital,
                                    ward_no: this.state.ward_no
                                })}
                            >
                                <Text style={{ fontSize: 18, color: '#757575', textAlign: 'center' }}>Check availability in other hospitals</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.signout()}
                        >
                            <Text style={styles.signOut}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </View>






                <Dialog
                    visible={this.state.visible1}
                    //dialogTitle = {<DialogTitle title="NOTICE"/>}
                    footer={
                        <DialogFooter>
                            <DialogButton

                                text="OK"
                                onPress={() => this.setState({ visible1: false })}
                            />
                        </DialogFooter>
                    }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Status changed successfully !</Text>

                    </DialogContent>
                </Dialog>


            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'space-between'

    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        margin: 8,
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderColor: '#ff8a65'
        
        
    },
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
    info: {
        fontSize: 19,
        margin: 5,
        marginLeft:35
    },
    info2: {
        fontSize: 20,
        marginTop: 70,
        fontWeight: 'bold',
        color: 'red',
        alignSelf: 'center'
    },
    info3: {
        fontSize: 15,
        marginTop: 25,
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
        //margin: 90,
        elevation: 2
    },
    buttonleft: {
        width: 40,
        height: 40,
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
        width: 40,
        height: 40,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffccbc',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 8,
        marginRight: 20

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
        fontSize: 17,
        borderWidth: 2,
        textAlign: 'center',
        borderColor: '#e0e0e0',
        borderRadius: 8,
        height: 40, 
        width: 130,
        color: '#ff8a65'
        


    },

    button3: {

        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        elevation: 5,
        height: 42,
        padding: 10
    },
    button4: {
        //width: 1,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        alignSelf: 'center',
        //margin: 90,
        elevation: 2,
        padding: 5
    },
    box: {
        marginLeft: 10,
        marginRight: 10,
       // margin: 20,
        borderColor: '#e0e0e0',
        borderBottomWidth: 1,
        padding: 15
        
    },
    boxHead: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },

    sign : { fontWeight: 'bold', fontSize: 30, textAlign: 'center' },

    reset : {
          marginTop: 8,
          marginLeft: 5
    },
    note: {
        fontSize: 18,
        color:'#ffab91',
        marginLeft:5
    }




})

/* <View>
                    <View style={{ marginTop: 50, marginHorizontal: 10, justifyContent: 'space-between', marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>

                            <TouchableOpacity
                                style={styles.button4}
                                onPress={() => this.props.navigation.navigate("NearestHosp", {
                                    hospital: this.state.hospital,
                                    ward_no: this.state.ward_no
                                })}
                            >
                                <Text style={{ fontSize: 18, color: '#757575', textAlign: 'center' }}>Check availability in other hospitals</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.signout()}
                        >
                            <Text style={styles.signOut}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
 */