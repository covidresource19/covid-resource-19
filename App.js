import React from 'react';
import {createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import SignUpScreen from './src/screens/SignUpScreen'
import LoginScreen from './src/screens/LoginScreen'
import Home from './src/screens/Home'

import SplashScreen from './src/screens/SplashScreen'
import IncDecBeds from './src/screens/IncDecBeds'
import CheckWard from './src/screens/CheckWard'
import DividerWard from './src/screens/DividerWard'
import FindNearestHospital from './src/screens/FindNearestHospital'

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }


export default class App extends React.Component {
  
  render() {
    return (
          <AppContainer/> 
    );
  }
}

const Login = createSwitchNavigator(
  {
    LoginScreen: LoginScreen,
    SignUpScreen: SignUpScreen
  },
  {
    initialRouteName: 'LoginScreen',
  }

);


const HomeStack = createStackNavigator({
  CheckWard: CheckWard,
  DividerWard: DividerWard,
  
},
{
  initialRouteName: 'CheckWard',
  headerMode: 'none'
})


const Base = createSwitchNavigator(
{
    Login : Login,
    Home : HomeStack,
    IncDecBeds: IncDecBeds,
    HomeIt: Home,
    NearestHosp : FindNearestHospital
},
{
  initialRouteName : 'Home'
},{headerMode:'none'})
const SplashNav = createSwitchNavigator(
  {
    SplashScreen:SplashScreen,
    Signoutnav:Login
  },
  {
    initialRouteName:'SplashScreen'
  }
)

const Main  = createSwitchNavigator(
  {
       SplashNav : SplashNav,
       Base : Base

  },
  {headerMode:'none'}
) 

const AppContainer = createAppContainer(Main)










