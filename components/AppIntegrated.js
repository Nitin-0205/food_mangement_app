import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login';
import Navbar from './Navbar';
import Head from './Head';
import Home from './Home';
import Employee from "./Employee"
import AddEmp from './AddEmp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState } from 'react';
import 'react-native-gesture-handler';
import Draw from './Draw';

export default function AppIntegrated() {
  const [NgoId,setNgoId] = useState("")

  const UserContext = createContext();
  return (
    // <UserContext.Provider value={NgoId}>
        <View style={styles.MainContainer}>
        <Navbar></Navbar>
        <Home></Home>
        </View>
    // </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // paddingTop: 30,
    backgroundColor: '#faf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

