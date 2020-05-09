import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList ,ActivityIndicator , TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class FindNearestHospital extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hospital: this.props.navigation.getParam('hospital', ''),
            visible: false,
            longlat: "",
            data: [],
        }
    }
    componentDidMount = async () => {
        console.log(this.state.hospital)
        const cur = await firestore().collection('AllHospital').doc(this.state.hospital).get()
        const longlat = cur.data().longlat
        this.setState({
            longlat: longlat
        })
        let articlesToDisplay = await firestore()
            .collection('AllHospital').get()
        await articlesToDisplay.docs.map(async (doc) => {
            if (doc.data().name !== this.state.hospital) {
                let vacant_non_oxygen = 0
                let vacant_oxygen = 0
                let vacant_ventilator = 0
                const test = await firestore().collection("Hospitals").doc(doc.data().name).collection(doc.data().name).get()
                test.docs.map(doc => {
                    vacant_non_oxygen = vacant_non_oxygen + doc.data().non_oxygen_unoccupied
                    vacant_oxygen = vacant_oxygen + doc.data().oxygen_unoccupied
                    vacant_ventilator = vacant_ventilator + doc.data().ventilator_unoccupied
                })
                const response = await fetch("https://router.hereapi.com/v8/routes?transportMode=car&origin=" + this.state.longlat + "&destination=" + doc.data().longlat + "&return=summary&apiKey=iWo3ZGXAqfhmzCYZ_WLxnBJ-e4aRs3hrQ17iwvv6c0E")
                const result = await response.json()
                this.state.data.push({
                    name: doc.data().name,
                    vacant_non_oxygen: vacant_non_oxygen,
                    vacant_oxygen: vacant_oxygen,
                    vacant_ventilator : vacant_ventilator,
                    ETA: Math.floor(result.routes[0].sections[0].summary.baseDuration / 60)
                })
                const sorteddata = this.state.data.sort(function (a, b) {
                    return a.ETA - b.ETA
                })
                this.setState({
                    data: sorteddata
                })
            }
        }
        )
            this.setState({
            visible: true
        })
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                </View>
                <Text style = {styles.title}>NEAREST HOSPITALS WITH AVAILABILITY</Text>
                {this.state.visible ?
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) =>
                            <View >
                                <View style={{ padding: 10, borderBottomWidth:1, margin: 8,borderColor:'#e0e0e0' }} >
                                    <View style = {{flexDirection: 'row'}}>
                                    <Icon style={{  flexDirection: 'column' ,marginRight:10}}//height:28, width:28}}
                        name="stethoscope"
                        size={25}
                        color="#ffab91"
                    
                    />
                                        <View>
                                    <Text style={{ fontSize: 22 ,fontWeight:'bold'}}>{item.name}</Text>
                                    <Text style={{ fontSize: 18 }}>{"Non Oxygen Beds : " + item.vacant_non_oxygen}</Text>
                                    <Text style={{ fontSize: 18 }}>{"Oxygen Beds : " + item.vacant_oxygen}</Text>
                                    <Text style={{ fontSize: 18 }}>{"Ventilators : " + item.vacant_ventilator}</Text>
                                    <Text style={{ fontSize: 18, color: '#ff7043', fontWeight: 'bold' }}>{"ETA : " + item.ETA + " mins"}</Text>
                                    </View>
                                    </View>
                                </View>
                            </View>

                        }
                        keyExtractor={(item, index) => index.toString()
                        }
                    /> :
                    <ActivityIndicator />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        //marginVertical: 8,
        //marginHorizontal: 16,
    },
    title: {
        fontSize: 22,
        margin:10,
        borderBottomWidth: 1,
        textAlign:'center'
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
});