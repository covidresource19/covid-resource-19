import React from 'react';
import { View, Text, ImageBackground, TextInput, StyleSheet, ScrollView, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth'

export default class Approvals extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hospital: '',
            email: '',
            documentData: [],
            loading: false,
            direct: false,
            refreshing: false


        }
    }



    componentDidMount(){
        const user = auth().currentUser
        this.setState({email : user.email})
       // console.log("On Approvals ...")
        console.log(user.email)
        this.retrieveData(user.email)
        

        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        
        
      }


      retrieveApprovals = async(email,hospital) => {
        try {
            // Set State: Loading
            this.setState({
                loading: true,
                direct: false
            });
            console.log('Retrieving Admins for ', hospital);
            // Cloud Firestore: Query
            let initialQuery = await firestore().collection('Permissions').doc(hospital).collection('Admins').doc(email).collection('Approvals')


            firestore.setLogLevel('debug')
            firestore()
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await initialQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            //let lastVisible = documentData[documentData.length - 1].id;
            // Set State
            console.log(documentData)
            this.setState({
                documentData: documentData,
                //lastVisible: lastVisible,
                loading: false,
            })
        

          
            
            //this.lowestQuote()
        }
        catch (error) {
            console.log('error isss : ', error);
            this.setState({ loading: false, direct: true })

        }
      }



      retrieveData = async(email) => {
          try {
              console.log('fetching on Approvals')
              await firestore().collection("Users").doc(email)
              .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                this.setState({
                    hospital:documentSnapshot.data().hospital
                })
                this.retrieveApprovals(email,documentSnapshot.data().hospital)
              });
        
             
          }
          catch {
              console.log(error)
          }
      }

      handleRefresh = () => {
        try {
          this.setState({refreshing:true})
          this.retrieveData(this.state.email).then
          //this.handleChange('')
          (this.setState({
              
              refreshing:false
          }))
      }
      catch (error) {
        console.log(error);
      }
      }

      isAccepted = (item) => {
          let ward = 'Ward ' + item.ward_no
        firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(ward).update({
            ventilator_occupied: item.ventilator_occupied,
                    ventilator_unoccupied: item.ventilator_unoccupied,
    
                   
                    oxygen_occupied: item.oxygen_occupied,
                    oxygen_unoccupied: item.oxygen_unoccupied,
    
                    non_oxygen_occupied: item.non_oxygen_occupied,
                    non_oxygen_unoccupied: item.non_oxygen_unoccupied,


                    ward_no: item.ward_no,

                        ventilator_total: item.ventilator_total,
                        

                        oxygen_total: item.oxygen_total,
                        

                        non_oxygen_total: item.non_oxygen_total,
                        approved: true,
                        rejected: false

        })
        .then(
            firestore().collection('Permissions').doc(this.state.hospital).collection('Admins').doc(this.state.email).collection('Approvals').doc(ward).delete()
            .then(console.log('request deleted'),this.handleRefresh())
            .catch((error) => {
                console.log('error deleting ', error)
            })
        )
        .catch((error) => {
            console.log('error approving ', error)
        })
        
      }

      isRejected = (item) => {
        let ward = 'Ward ' + item.ward_no
        firestore().collection('Hospitals').doc(this.state.hospital).collection(this.state.hospital).doc(ward).update({
            
                        approved: false,
                        rejected: true

        })
        .then(
            firestore().collection('Permissions').doc(this.state.hospital).collection('Admins').doc(this.state.email).collection('Approvals').doc(ward).delete()
            .then(console.log('request deleted'),this.handleRefresh())
            .catch((error) => {
                console.log('error deleting ', error)
            })
        )
        .catch((error) => {
            console.log('error approving ', error)
        })
      }

      render() {
          return(
              <View style = {{flex: 1}}>
                  <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.hospital.toUpperCase()}</Text>

                    </View>
                    <Text style = {styles.title}>APPROVALS  REQUESTED</Text>
                    <TouchableOpacity
                                style={styles.button4}
                                onPress={() => this.props.navigation.navigate("NearestHosp", {
                                    hospital: this.state.hospital,
                                    ward_no: this.state.ward_no
                                })}
                            >
                                <Text style={{ fontSize: 18, color: '#757575', textAlign: 'center' }}>Check availability in other hospitals</Text>
                            </TouchableOpacity>
                    <FlatList
                    // Data
                    data={this.state.documentData}

                    // Render Items
                    renderItem={({ item, index, }) => (

                        //this.checkDate(item.day,item.event_name),

                        <View style={styles.box}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginEnd: 10 }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ff8a65'}}>  WARD {item.ward_no} </Text>
                                    <Text style={styles.boxText3}>Ventilators  </Text>
                                    <Text style={styles.boxText3}>Oxygen beds  </Text>
                                    <Text style={styles.boxText3}>Non-oxygen  </Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}> </Text>
                                    <Text style={styles.boxText2}> Occupied: {item.ventilator_occupied}/{item.ventilator_total} </Text>
                                    <Text style={styles.boxText2}> Occupied: {item.oxygen_occupied}/{item.oxygen_total}</Text>
                                    <Text style={styles.boxText2}> Occupied: {item.non_oxygen_occupied}/{item.non_oxygen_total}</Text>
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}> </Text>
                                    <Text style={styles.boxText1}> Short of: {item.short_of_vent}</Text>
                                    <Text style={styles.boxText1}> Short of: {item.short_of_oxy}</Text>
                                    <Text style={styles.boxText1}> Short of: {item.short_of_nonoxy}</Text>
                                </View>
                                


                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'space-evenly' , marginBottom: 10}}>
                                
                                    <TouchableOpacity

                                        style={styles.button2}
                                        onPress={() => this.isAccepted(item)}


                                    >
                                        <Text style={{ textAlign: 'center', color: '#fbe9e7', fontWeight: 'bold' }}>APPROVE</Text>
                                    </TouchableOpacity> 
                                    
                                    <TouchableOpacity
                                    style={styles.button2}
                                onPress = {() => this.isRejected(item)}


                                >
                                    <Text style={{ textAlign: 'center', color: '#fbe9e7' ,fontWeight: 'bold'}}>REJECT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )}

                    // Item Key
                    keyExtractor={(item, index) => String(index)}
                    // Header (Title)
                    ListHeaderComponent={this.renderHeader}
                    // Footer (Activity Indicator)
                    //ListFooterComponent={this.renderFooter}
                    // On End Reached (Takes a function)
                    //onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    onEndReachedThreshold={0}
                    // Refreshing (Set To True When End Reached)
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
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
        margin:10,
        borderBottomWidth: 1,
        textAlign:'center'
    },
    box: {
        margin:10,
        borderWidth: 1,
        borderColor: '#ffab91'
    },
    boxText2: {
        fontSize: 17,
        color: '#9e9e9e'
        //marginLeft: 10
    },
    boxText3: {
        fontSize: 17,
         fontWeight: 'bold',
         marginLeft: 10,
         //color: '#9e9e9e'
    },
    boxText1: {
        fontSize: 17,
        color: '#e53935'
        //marginLeft: 10
    },
    button2: {

        backgroundColor: 'black',
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8,
        elevation: 5,
        textAlign: 'center'

    },
    button4: {
        backgroundColor: '#ffccbc',
        marginTop: 5,
        width: 300,
        height: 30,
        justifyContent: 'center',
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 5
    }
})