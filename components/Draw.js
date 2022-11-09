import React from 'react'
import {createDrawerNavigator} from "@react-navigation/drawer"
import Home from './Home'

const Drawer = createDrawerNavigator()
function Draw() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name = "Home" component = {Home}></Drawer.Screen>
        <Drawer.Screen name = "Login" component = {Home}></Drawer.Screen>
        <Drawer.Screen name = "Head" component = {Home}></Drawer.Screen>

    </Drawer.Navigator>
  )
}

export default Draw;