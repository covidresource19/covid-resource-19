import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'

export default class AllWards extends React.Component {
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
        await firestore().collection('Users').doc("test1@gmail.com").onSnapshot(async (data) => {
            console.log(data.data().hospital)
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
            <View style={{ flex: 1, }}>
                {this.state.visible ?
                    <View style={{margin:10 }}>
                    <View style={{flexDirection:'row' ,  justifyContent:'center' , alignItems:'center'}}>
                    <TouchableOpacity
                        onPress ={() => this.sortwardno()}
                    >
                    <Text style={{fontSize:20 , fontWeight:'bold' }}>Ward No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress ={ () => this.sortnonoxygen()}
                    >
                    <Text style={{fontSize:20, paddingLeft:10 , fontWeight:'bold'}}>Non Oxygen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.sortoxygen()}
                    >
                    <Text style={{fontSize:20 , paddingLeft:10 , fontWeight:'bold'}}>Oxygen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.sortventilator()}
                    >
                    <Text style={{fontSize:20 , paddingLeft:10 , fontWeight:'bold'}}>Ventilator</Text>
                    </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            <View >
                                <View style={{ padding: 10, borderBottomWidth: 1, margin: 8, borderColor: '#e0e0e0' }} >
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{flexDirection:'row', flex:1}}>
                                            <View style={{ flex:1 , paddingLeft:20 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>{item.ward_no}</Text>
                                            </View>
                                            <View style={{justifyContent:'center' , alignItems:'center', marginLeft:10 , flex:1}}>
                                            <Text style={{ fontSize: 18  }}>{item.non_oxygen_unoccupied}</Text>
                                            </View>
                                            <View style={{justifyContent:'center' , alignItems:'center' , marginLeft:20 , flex:1}}>
                                            <Text style={{ fontSize: 18  }}>{item.oxygen_unoccupied}</Text>
                                            </View>
                                            <View style={{justifyContent:'center' , alignItems:'center' , marginLeft:10 , flex:1}}>
                                            <Text style={{ fontSize: 18 }}>{item.ventilator_unoccupied}</Text>
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

            </View>
        )
    }
}