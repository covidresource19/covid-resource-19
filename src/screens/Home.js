import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';



export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            db: firestore(),
            hospital: '',
            ventilator_total: 0,
            ventilator_occupied: 0,
            ventilator_unoccupied: 0,
            ward: '',
            ward_no: '',
            visible1: false,
            oxygen_total: 0,
            oxygen_occupied: 0,
            oxygen_unoccupied: 0,
            non_oxygen_total: 0,
            non_oxygen_occupied: 0,
            non_oxygen_unoccupied: 0,
        }
    }


    componentDidMount() {
        const user = auth().currentUser
        this.setState({ email: user.email })
        console.log("success kinda")
        console.log(user.email)

        const { state } = this.props.navigation;

        this.setState({

            ward: state.params.ward,
            hospital: state.params.hospital,
            ward_no: state.params.ward_no

        })



    }


    addWardToDb = async (vent_diff,oxy_diff,nonoxy_diff) => {
        //let ward = 'Ward '+this.state.ward_no
        //console.log(ward)
        try {
            firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(this.state.ward).set({

                ventilator_total: this.state.ventilator_total,
                ventilator_occupied: this.state.ventilator_occupied,
                ventilator_unoccupied: vent_diff,

                oxygen_total: this.state.oxygen_total,
                oxygen_occupied: this.state.oxygen_occupied,
                oxygen_unoccupied: oxy_diff,

                non_oxygen_total: this.state.non_oxygen_total,
                non_oxygen_occupied: this.state.non_oxygen_occupied,
                non_oxygen_unoccupied: nonoxy_diff,

                ward_no: this.state.ward_no,

            })
                .then(console.log('ward successfully added in Hospitals collection'))

            firestore().collection('Users').doc(this.state.email).collection('Wards').doc(this.state.ward_no).set({
                ward_no: this.state.ward_no,
                
                vent_total_init: this.state.ventilator_total,
                vent_occ_init: this.state.ventilator_occupied,
                vent_unocc_init: vent_diff,

                oxy_total_init: this.state.oxygen_total,
                oxy_occ_init: this.state.oxygen_occupied,
                oxy_unocc_init: oxy_diff,

                nonoxy_total_init: this.state.non_oxygen_total,
                nonoxy_occ_init: this.state.non_oxygen_occupied,
                nonoxy_unocc_init: nonoxy_diff
            })
                .then(console.log('initial details added to user successfully'), this.props.navigation.navigate('IncDecBedss', { hospital: this.state.hospital, ward: this.state.ward }))






        }
        catch {
            console.log('Error adding ', error)

        }
    }

    ventDiffCal = () => {
        if (parseInt(this.state.ventilator_total) >= parseInt(this.state.ventilator_occupied) && parseInt(this.state.ventilator_occupied) >= 0 && parseInt(this.state.ventilator_total) > 0) {
            let diff = this.state.ventilator_total - this.state.ventilator_occupied;
            this.setState({ ventilator_unoccupied: diff })
            return diff
            
        }
        else {
           // this.setState({ visible1: true })
            return 'error'
        }

    }

    oxyDiffCalc = () => {
        if (parseInt(this.state.oxygen_total) >= parseInt(this.state.oxygen_occupied) && parseInt(this.state.oxygen_occupied) >= 0 && parseInt(this.state.oxygen_total) > 0) {
            let diff = this.state.oxygen_total - this.state.oxygen_occupied;
            this.setState({ oxygen_unoccupied: diff })
            return diff
            
        }
        else {
           // this.setState({ visible1: true })
            return 'error'
        }

    }

    nonoxyDiffCalc = () => {
        if (parseInt(this.state.non_oxygen_total) >= parseInt(this.state.non_oxygen_occupied) && parseInt(this.state.non_oxygen_occupied) >= 0 && parseInt(this.state.non_oxygen_total) > 0) {
            let diff = this.state.non_oxygen_total - this.state.non_oxygen_occupied;
            this.setState({ non_oxygen_unoccupied: diff })
            return diff
            
        }
        else {
           // this.setState({ visible1: true })
            return 'error'
        }

    }

    proceed = () => {
        console.log(this.state.ward_no)

        let vent_diff = this.ventDiffCal()
        let oxy_diff = this.oxyDiffCalc()
        let nonoxy_diff = this.nonoxyDiffCalc()

        console.log(vent_diff, oxy_diff, nonoxy_diff)
        if(vent_diff === 'error' || oxy_diff === 'error'|| nonoxy_diff === 'error')
            this.setState({ visible1: true })
        else
            this.addWardToDb(vent_diff,oxy_diff,nonoxy_diff)


        
         



    }


    render() {
        console.disableYellowBox = true
        let ward = this.state.ward.toUpperCase()


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
                <Text style={styles.ward}>{ward}</Text>
                <View style={styles.box}>
                    <Text style={styles.boxHead}>VENTILATORS</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.inputText}>Total : </Text>
                        <TextInput

                            style={{ borderBottomWidth: 1, fontSize: 20, width: 80, textAlign: 'center' }}

                            //placeholder='100'
                            keyboardType='numeric'
                            onChangeText={(ventilator_total) => this.setState({ ventilator_total: ventilator_total })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={styles.inputText}>Occupied currently : </Text>
                        <TextInput

                            style={{ borderBottomWidth: 1, fontSize: 20, width: 80, textAlign: 'center' }}

                            //placeholder='57'
                            keyboardType='numeric'
                            onChangeText={(ventilator_occupied) => this.setState({ ventilator_occupied: ventilator_occupied })}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxHead}>OXYGEN BEDS</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.inputText}>Total : </Text>
                        <TextInput

                            style={{ borderBottomWidth: 1, fontSize: 20, width: 80, textAlign: 'center' }}

                            //placeholder='100'
                            keyboardType='numeric'
                            onChangeText={(oxygen_total) => this.setState({ oxygen_total: oxygen_total })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={styles.inputText}>Occupied currently : </Text>
                        <TextInput

                            style={{ borderBottomWidth: 1, fontSize: 20, width: 80, textAlign: 'center' }}

                            //placeholder='57'
                            keyboardType='numeric'
                            onChangeText={(oxygen_occupied) => this.setState({ oxygen_occupied: oxygen_occupied })}
                        />
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxHead}>NON-OXYGEN BEDS</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.inputText}>Total : </Text>
                        <TextInput

                            style={{ borderBottomWidth: 1, fontSize: 20, width: 80, textAlign: 'center' }}

                            //placeholder='100'
                            keyboardType='numeric'
                            onChangeText={(non_oxygen_total) => this.setState({ non_oxygen_total: non_oxygen_total })}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={styles.inputText}>Occupied currently : </Text>
                        <TextInput

                            style={{ borderBottomWidth: 1, fontSize: 20, width: 80, textAlign: 'center' }}

                            //placeholder='57'
                            keyboardType='numeric'
                            onChangeText={(non_oxygen_occupied) => this.setState({ non_oxygen_occupied: non_oxygen_occupied })}
                        />
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.proceed()}
                >
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>PROCEED</Text>
                </TouchableOpacity>
                <Dialog
                    visible={this.state.visible1}
                    dialogTitle={<DialogTitle title="CAUTION" />}
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
                        <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Invalid entry!</Text>

                    </DialogContent>
                </Dialog>




            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'space-between'

    },
    button: {
        //alignSelf: 'flex-end',
        width: 100
    },
    row: {
        margin: 10,
        flexDirection: 'row'

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
    inputText: {
        fontSize: 20,
        marginTop: 17
        //fontWeight: 'bold',
        //margin:13

    },
    button2: {

        backgroundColor: 'black',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 8
    },
    ward: {
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 30
    },
    box: {
        marginLeft: 10,
        margin: 20
    },
    boxHead: {
        fontWeight: 'bold',
        fontSize: 20
    }

})