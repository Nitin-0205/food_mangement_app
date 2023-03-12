import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Head from './components/Head';
import Home from './components/Home';
import Employee from "./components/Employee"
import AddEmp from './components/AddEmp';
import AppIntegrated from './components/AppIntegrated'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState,useEffect } from 'react';
import 'react-native-gesture-handler';
import Draw from './components/Draw';
import Signup from './components/Signup';
// import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';
import  {CredentialContext} from './components/CredentialContext'

const Stack = createNativeStackNavigator();

export default function App() {
  const [storedCredential , setstoredCredential] =useState({});


const checkLoginCredentials = () =>{
  AsyncStorage.getItem("UserLoginCredentials")
  .then((result)=>{
    if(result != null){
      setstoredCredential(JSON.parse(result));
    }else{
      setstoredCredential(null);
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}
useEffect(()=>{
  checkLoginCredentials();
},[])


  // const [NgoId,setNgoId] = useState("")
  // const UserContext = createContext();

  return (
    <CredentialContext.Provider value={{storedCredential,setstoredCredential}}>
    <NavigationContainer>
      {/* <View style={styles.container}> */}   
        <Stack.Navigator initialRouteName={Login}>
          {storedCredential !== null ? ( 
            <>
            <Stack.Screen name="AppIntegrated" component={AppIntegrated} options={{headerShown:false}}></Stack.Screen>
            {/* <Stack.Screen name="Home" component={Home} options={{headerShown:false}}></Stack.Screen> 
            <Stack.Screen name="Employees" component={Employee} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AddEmp" component={AddEmp}options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Head" component = {Head} options={{headerShown:false}}></Stack.Screen> */}
            </>
          ):<>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="SignUp" component={Signup} options={{headerShown:false}}></Stack.Screen></>
          }
          
        </Stack.Navigator>
      {/* </View> */}
    </NavigationContainer>
    </CredentialContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
