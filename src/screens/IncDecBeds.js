import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, StyleSheet , ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

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
            occupied: 0

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

                    })
                });


        }
        catch {
            console.log(error)
        }
    }

    increment = () => {
        this.setState({
            occupied: parseInt(this.state.occupied) + 1,
            unoccupied: parseInt(this.state.unoccupied) - 1
        })
    }

    decrement = () => {
        this.setState({
            unoccupied: parseInt(this.state.unoccupied) + 1,
            occupied: parseInt(this.state.occupied) - 1
        })
    }

    changeStatus = async() => {
        firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(this.state.ward).update({
            //total: this.state.total,
            occupied: this.state.occupied,
            unoccupied: this.state.unoccupied,
            //ward_no: this.state.ward_no,
            
        })
        .then(alert('done'),console.log('Bed status changed successfully'))
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
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
                <Text style={styles.heading}>WARD {this.state.ward_no}</Text>
                <Text style={styles.info}>Beds occupied : {this.state.occupied}/{this.state.total}</Text>
                <Text style={styles.info}>Beds unoccupied : {this.state.unoccupied}</Text>

                <Text style={styles.info2}>Change current occupied bed status</Text>
<View style = {{flexDirection: 'row', justifyContent:'center', marginTop: 20}}>
                <TouchableOpacity
                    style = {styles.buttonleft}
                    onPress = {() => this.increment()}
                    >
                        <Text style = {{ fontWeight: 'bold', fontSize: 40, textAlign:'center'}}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {styles.buttonright}
                    onPress = {() => this.decrement()}
                    >
                        <Text style = {{ fontWeight: 'bold', fontSize: 40, textAlign:'center'}}>-</Text>
                    </TouchableOpacity>
                    </View>

                    <Text style={styles.info3}>Click DONE to save status</Text>

                <TouchableOpacity
               style = {styles.button2}
               onPress = {() => this.changeStatus()}
               >
                   <Text style = {{fontSize: 20, color: 'white', fontWeight: 'bold'}}>DONE</Text>
               </TouchableOpacity>

               <TouchableOpacity
               style = {styles.button3}
               onPress = {() => this.changeStatus()}
               >
                   <Text style = {{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Find Nearest Hospital</Text>
               </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                onPress ={() => this.signout()}
                >
                    <Text style={styles.signOut}>Sign out</Text>
                </TouchableOpacity>
            </ScrollView>
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
        marginTop: 70,
        fontWeight: 'bold',
        color: 'red',
        alignSelf: 'center'
    },
    info3: {
        fontSize: 15,
        marginTop: 70,
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
        elevation:2
    },
    buttonleft: {
        width: 60,
        height: 60,
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        borderTopLeftRadius:10,
        borderBottomLeftRadius: 10,
        borderRightWidth:1,
        borderColor: 'white',
        elevation:10
    },
    buttonright: {
        width: 60,
        height: 60,
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        elevation:10

    },
    button2: {
        
        backgroundColor: 'black', 
        height: 42, 
        justifyContent:'center', 
        alignItems: 'center', 
        width: 120, 
        alignSelf:'center',
        marginTop: 20,
        borderRadius: 8,
        elevation:5
    },

    button3: {
        
        backgroundColor: 'black', 
        justifyContent:'center', 
        alignItems: 'center', 
        alignSelf:'center',
        marginTop: 20,
        borderRadius: 8,
        elevation:5,
        height : 42  ,
        padding:10  
    }


})