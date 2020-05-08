import React from 'react';
import { Text, StyleSheet, ImageBackground, View} from 'react-native';
import auth from '@react-native-firebase/auth'


export default class SplashScreen extends React.Component{
    
    componentDidMount = async() =>{
        console.log("starting")
        auth().onAuthStateChanged((user) => {
            if (user) {
              setTimeout(
              () => this.props.navigation.navigate('Home'),
              1000
              )
            }else{
                setTimeout(
                () => this.props.navigation.navigate('LoginScreen'),
                1000
                )
            }
         });
    }
render(){
    console.disableYellowBox = true

    return(
        <View style = {styles.container}>
            <Text style={styles.text}>WELCOME TO</Text>
            <Text style={styles.text}>COVID RESOURCE</Text>
        </View>
)}
}
const styles = StyleSheet.create({
    text:{
        color:'black',
        fontSize:50,
        textAlign:'center',
        marginHorizontal: 10
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
})