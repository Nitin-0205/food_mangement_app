import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer"
import Home from './Home'
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator()
function Draw() {
  return (
    
      <Drawer.Navigator >
        <Drawer.Screen name="Home" component={Home}>Home</Drawer.Screen>
        <Drawer.Screen name="Login" component={Home}>Logout</Drawer.Screen>
        <Drawer.Screen name="Head" component={Home}></Drawer.Screen>
      </Drawer.Navigator>

  
  )
}

export default Draw;