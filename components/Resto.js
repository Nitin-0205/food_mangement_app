
import React, { useContext } from 'react';

import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RestoHome from './RestoHome';
import RestoHistory from './RestoHistory';
import RestoReq from './RestoReq';
import RestoMap from './RestoMap';
import  {CredentialContext} from './CredentialContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

export default function Resto() {
  const contextCall= useContext(CredentialContext);

  function HandleLogOut() {
    AsyncStorage.removeItem("UserLoginCredentials")
      .then(() => {
        contextCall.setstoredCredential(null);
      })
      .catch((err) => {
        console.log(err);

      })
  }
  return (
    <SafeAreaView style={styles.container}>
          <Tab.Navigator initialRouteName='RestoHome'>
            <Tab.Screen name="RestoHome" component={RestoHome} options={{headerShown:false}}></Tab.Screen>
            <Tab.Screen name="RestoMap" component={RestoMap} options={{headerShown:false}}></Tab.Screen>
            <Tab.Screen name="RestoReq" component={RestoReq} options={{headerShown:false}}></Tab.Screen>
            <Tab.Screen name="RestoHistory" component={RestoHistory} options={{headerShown:false}}></Tab.Screen>
            <Tab.Screen name="RestoMap" component={RestoMap} options={{headerShown:false}}></Tab.Screen>

          </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
});