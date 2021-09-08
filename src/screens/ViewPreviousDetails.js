import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'



export default class ViewPreviousDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            hospital: '',
            click: false,
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

    onFocusFunction = () => {
        const { state } = this.props.navigation;

        let hospital = state.params.hospital
        let ward = 'Ward ' + state.params.item.ward_no
        console.log(hospital, ward, state.params.click)
        this.setState({
            click: state.params.click,
            hospital: state.params.hospital
        })
        let item = state.params.item
        console.log(item)
        //console.log(this.state.click, 'on bkaahah')
        
        if (!this.state.click)
            this.props.navigation.navigate('Approvals');

    }

    retrieveData = async (hospital, ward) => {
        
        console.log(hospital, ward)
        try {
            console.log('fetching..')
            await firestore().collection('Hospitals').doc(hospital).collection(hospital).doc(ward)
                .onSnapshot(documentSnapshot => {
                    console.log('User data: ', documentSnapshot.data());
                    this.setState({
                        //ward_no: documentSnapshot.data().ward_no,

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


    componentDidMount() {
        const { state } = this.props.navigation;

        let hospital = state.params.hospital
        let ward = 'Ward ' + state.params.item.ward_no
        this.retrieveData(hospital,ward)

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction()
        })






    }

    componentWillUnmount() {
        this.focusListener.remove()
        this.setState({ click: false })

    }

    render() {

        
        const { state } = this.props.navigation;
        let hospital = state.params.hospital
        let item = state.params.item
   
  

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{hospital.toUpperCase()}</Text>

                </View>
                <Text style={styles.title}>DETAILS</Text>
                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginBottom: 20 ,flexWrap: 'wrap', marginTop: 25}}>
                    <View style={{ borderRightWidth: 1,borderColor:'#9e9e9e' }}>
                        <Text style={styles.headingLeft}>BEFORE</Text>
                        <Text style={styles.boxText6}>Ventilators  </Text>
                        <Text style={styles.boxText5}> Occupied: {this.state.ventilator_occupied}/{this.state.ventilator_total} </Text>
                        <Text style={styles.boxText4}> Unoccupied: {this.state.ventilator_unoccupied} </Text>
                        <Text style={styles.boxText6}>Oxygen beds  </Text>
                        <Text style={styles.boxText5}> Occupied: {this.state.oxygen_occupied}/{this.state.oxygen_total}</Text>
                        <Text style={styles.boxText4}> Unoccupied: {this.state.oxygen_unoccupied} </Text>
                        <Text style={styles.boxText6}>Non-oxygen beds  </Text>
                        
                        <Text style={styles.boxText5}> Occupied: {this.state.non_oxygen_occupied}/{this.state.non_oxygen_total}</Text>
                        <Text style={styles.boxText4}> Unoccupied: {this.state.non_oxygen_unoccupied} </Text>
                    </View>
                    <View>
                        <Text style={styles.headingRight}>AFTER</Text>
                        <Text style={styles.boxText3}>Ventilators  </Text>
                        <Text style={styles.boxText2}> Occupied: {item.ventilator_occupied}/{item.ventilator_total} </Text>
                        <Text style={styles.boxText1}> Unoccupied: {item.ventilator_unoccupied} </Text>
                        <Text style={styles.boxText3}>Oxygen beds  </Text>
                        <Text style={styles.boxText2}> Occupied: {item.oxygen_occupied}/{item.oxygen_total}</Text>
                        <Text style={styles.boxText1}> Unoccupied: {item.oxygen_unoccupied} </Text>
                        <Text style={styles.boxText3}>Non-oxygen beds</Text>
                        
                        <Text style={styles.boxText2}> Occupied: {item.non_oxygen_occupied}/{item.non_oxygen_total}</Text>
                        <Text style={styles.boxText1}> Unoccupied: {item.non_oxygen_unoccupied} </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => this.props.navigation.navigate('Approvals')}
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
    title: {
        fontSize: 22,
        margin: 10,
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    headingLeft: {
        textAlign: 'center',
        paddingRight: 60,
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 10,
        color: '#ff7043',
        paddingLeft: 30

    },
    headingRight: {
        textAlign: 'center',
        paddingLeft: 40,
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginBottom: 10,
        color: '#ff7043'

    },
    boxText2: {
        fontSize: 20,
        color: '#ff8a65',
        marginLeft: 30,
        marginBottom:10
    },
    boxText3: {
        fontSize: 23,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 5
        //color: '#9e9e9e'
    },
    boxText1: {
        fontSize: 20,
        color: '#ff8a65',
        marginLeft: 30,
        marginBottom:20
    },
    boxText5: {
        fontSize: 20,
        color: '#ff8a65',
        marginLeft: 20,
        marginBottom:10
    },
    boxText6: {
        fontSize: 23,
        fontWeight: 'bold',
        //marginLeft: 20,
        marginBottom: 5
        //color: '#9e9e9e'
    },
    boxText4: {
        fontSize: 20,
        color: '#ff8a65',
        marginLeft: 20,
        marginBottom:20
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