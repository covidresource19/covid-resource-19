import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'

export default class AllWardsStaff extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: auth().currentUser.email,
            hospital: '',
            data: [],
            visible : false,
            sortednon : true,
            sortedoxy : true,
            sortventilator : true,
            sortwardno : true,
        }
    }

    componentDidMount = async () => {
        console.log(this.state.user)
        await firestore().collection('Users').doc(this.state.user).onSnapshot(async (data) => {
            console.log(data.data().hospital)
            this.setState({
                hospital: data.data().hospital
            })
            const test = await firestore().collection("Hospitals").doc(data.data().hospital).collection(data.data().hospital).get()
            test.docs.map(doc => {
                this.state.data.push(doc.data())
            })
            this.setState({
                data: this.state.data
            })
        })

        this.setState({
            visible:true
        })
    }
    sortwardno = () => {
        if (this.state.sortwardno){
        const sorteddata = this.state.data.sort(function (a, b) {
            return a.ward_no - b.ward_no
        })
        this.setState({
            data: sorteddata,
            sortwardno: false
        })
        }
        else{
            const sorteddata = this.state.data.sort(function (a, b) {
                return b.ward_no - a.ward_no
            })
            this.setState({
                data: sorteddata,
                sortwardno: true
            })
        }
    }
    sortnonoxygen = () => {
        if(this.state.sortednon){
        const sorteddata = this.state.data.sort(function (a, b) {
            return a.non_oxygen_unoccupied - b.non_oxygen_unoccupied
        })
        this.setState({
            data: sorteddata,
            sortednon:false
        })
    }
    else{
        const sorteddata = this.state.data.sort(function (a, b) {
            return b.non_oxygen_unoccupied - a.non_oxygen_unoccupied
        })
        this.setState({
            data: sorteddata,
            sortednon:true
        })
    }
}
    sortoxygen = () => {
        if(this.state.sortedoxy){
        const sorteddata = this.state.data.sort(function (a, b) {
            return a.oxygen_unoccupied - b.oxygen_unoccupied
        })
        this.setState({
            data: sorteddata,
            sortedoxy : false
        })
    }
    else{
        const sorteddata = this.state.data.sort(function (a, b) {
            return b.oxygen_unoccupied - a.oxygen_unoccupied
        })
        this.setState({
            data: sorteddata,
            sortedoxy : true
        })
    }
    }
    sortventilator = () => {
        if(this.state.sortventilator){
        const sorteddata = this.state.data.sort(function (a, b) {
            return a.ventilator_unoccupied - b.ventilator_unoccupied
        })
        this.setState({
            data: sorteddata,
            sortventilator : false,
        })
    }
    else{
        const sorteddata = this.state.data.sort(function (a, b) {
            return b.ventilator_unoccupied - a.ventilator_unoccupied
        })
        this.setState({
            data: sorteddata,
            sortventilator : true,
        })
    }
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
                
                <Text style = {styles.title}>AVAILABILITY STATUS IN OTHER WARDS</Text>
                
                {this.state.visible ?
                    <View style={ {}}>
                    <View style={{flexDirection:'row' ,  justifyContent:'center' , alignItems:'center'}}>
                    <TouchableOpacity
                        onPress ={() => this.sortwardno()}
                    >
                    <Text style={{fontSize:20 , fontWeight:'bold' ,
                    borderRightWidth: 1 , borderBottomWidth:2, 
                     textAlign: 'center', 
                    padding: 3, borderTopWidth: 2,borderColor:'#ffab91'
                    }}>Ward No </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress ={ () => this.sortnonoxygen()}
                    >
                    <Text style={{fontSize:20, fontWeight:'bold',borderRightWidth: 1 ,borderBottomWidth:2,textAlign: 'center', padding: 3, borderTopWidth: 2,borderColor:'#ffab91'}}>Non Oxygen </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.sortoxygen()}
                    >
                    <Text style={{fontSize:20 , fontWeight:'bold',borderRightWidth: 1 ,borderBottomWidth:2,textAlign: 'center', padding: 3, borderTopWidth: 2,borderColor:'#ffab91'}}>Oxygen </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.sortventilator()}
                    >
                    <Text style={{fontSize:20 , fontWeight:'bold',borderBottomWidth:2,textAlign: 'center', padding: 3, borderTopWidth: 2, borderColor:'#ffab91' }}>Ventilator</Text>
                    </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            <View >
                                <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#e0e0e0', borderRightWidth: 1, borderLeftWidth:1}} >
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{flexDirection:'row', flex:1,}}>
                                            <View style={{ flex:1 , alignContent:'center', justifyContent: 'center', borderRightWidth: 1,borderColor: '#e0e0e0', paddingRight: 14,paddingLeft: 10}}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf:'center',}}>{item.ward_no}</Text>
                                            </View>
                                            <View style={{justifyContent:'center' , alignItems:'center', flex:1,borderRightWidth: 1,borderColor: '#e0e0e0', alignContent:'center', paddingLeft: 24, paddingRight: 27}}>
                                            <Text style={{ alignSelf:'center',fontSize: 18  }}>{item.non_oxygen_unoccupied}</Text>
                                            </View>
                                            <View style={{justifyContent:'center' , alignItems:'center' , flex:1,borderRightWidth: 1,borderColor: '#e0e0e0', alignContent:'center',paddingLeft: 8, paddingRight: 10}}>
                                            <Text style={{ fontSize: 18 ,alignSelf:'center' }}>{item.oxygen_unoccupied}</Text>
                                            </View>
                                            <View style={{justifyContent:'center' , alignItems:'center' , marginLeft:10 , flex:1, paddingLeft: 10, paddingRight: 10}}>
                                            <Text style={{ fontSize: 18 ,alignSelf:'center'}}>{item.ventilator_unoccupied}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        }
                        keyExtractor={(item, index) => index.toString()
                        }
                        numColumns = {1}

                    />
                    </View> :
                    <ActivityIndicator />
                }

            </ScrollView>
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
        margin:20,
        borderBottomWidth: 1,
        textAlign:'center',
        
    },
    button4: {
        backgroundColor: '#ffccbc',
        marginTop: 10,
        width: 300,
        height: 30,
        justifyContent: 'center',
        borderRadius: 8,
        alignSelf: 'center'
    }
})