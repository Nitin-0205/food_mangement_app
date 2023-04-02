import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Head from './components/Head';
import Resto from './components/Resto';
import Map from "./components/Map"
import AddEmp from './components/AddEmp';
import AppIntegrated from './components/AppIntegrated'
import Home2 from './components/Home2'

import FoodReqRaise from './components/FoodReqRaise'
import AssignEmp from './components/AssignEmp'
import CheckInfo from './components/CheckInfo'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState,useEffect } from 'react';
import 'react-native-gesture-handler';
import Signup from './components/Signup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import  {CredentialContext} from './components/CredentialContext'

const Stack = createNativeStackNavigator();

export default function App() {
  const [storedCredential , setstoredCredential] =useState([]);


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
            storedCredential.role === "NGO" ?(<>
            <Stack.Screen name="AppIntegrated" component={AppIntegrated} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="FoodReqRaise" component={FoodReqRaise} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="CheckInfo" component={CheckInfo} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AssignEmp" component={AssignEmp} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="AddEmp" component={AddEmp}options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="Map" component={Map}options={{headerShown:false}}></Stack.Screen>

             </>):(
              <>
                <Stack.Screen name="Resto" component={Resto} options={{headerShown:false}}></Stack.Screen>
              </>
             )
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
    // paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
