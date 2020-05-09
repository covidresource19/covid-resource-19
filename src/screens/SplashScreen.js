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
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
            <Text style={style.text}>WELCOME TO</Text>
            <Text style={style.text}>COVID RESOURCE '19</Text>
        </View>
)}
}
const style = StyleSheet.create({
    text:{
        color:'black',
        fontSize:40,
        textAlign:'center'
    }
})