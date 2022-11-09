import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Head from './components/Head';
import Home from './components/Home';
import Employee from "./components/Employee"
import AddEmp from './components/AddEmp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState } from 'react';
import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

export default function App() {
  const [NgoId,setNgoId] = useState("")

  const UserContext = createContext();
  return (
    <UserContext.Provider value={NgoId}>
    <NavigationContainer>
      {/* <View style={styles.container}> */}
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Navbar" component={Navbar} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}></Stack.Screen> 
          <Stack.Screen name="Employees" component={Employee} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="AddEmp" component={AddEmp}options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="Head" component = {Head} options={{headerShown:false}}></Stack.Screen>
        </Stack.Navigator>
        <StatusBar style="auto" />
      {/* </View> */}
    </NavigationContainer>
    </UserContext.Provider>
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
