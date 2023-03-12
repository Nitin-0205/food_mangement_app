import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity ,StyleSheet, ScrollView, Image,Animated} from 'react-native'
import Navbar from './Navbar';
import Home from './Home';
import Employee from './Employee';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useState,useRef } from 'react';
import {MenuContext} from './Context';
// import 'react-native-gesture-handler';
// import Draw from './Draw';

export default function AppIntegrated() {
  const [showMenu, setShowMenu] = useState(false);
  const [navMenu, setNavMenu] = useState({tab:1,val:"Home"});

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  function MenuBtnFunc(){
    
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: showMenu ? 1:0.88,
        duration: 200,
        useNativeDriver: true,

      }),
      Animated.timing(offsetValue, {
        toValue: showMenu ? 0:290,
        duration: 200,
        useNativeDriver: true,

      })
      
    ]).start()
    
      setShowMenu(!showMenu)
  }
  return (
    <MenuContext.Provider value ={{navMenu,setNavMenu}}>
    
    <View style={styles.MainContainer}>
    <Navbar></Navbar>
    <Animated.View style={{
      paddingTop: 30,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flexGrow: 1,
      backgroundColor: "white",
      alignItems: "center",
      borderRadius: showMenu ? 15:0,
      paddingBottom:10,
      transform:[
        {scale:scaleValue},
        {translateX:offsetValue}
      ],
    }}>
      <View style={styles.Head}>
         <TouchableOpacity delayPressIn={0} onPressIn={MenuBtnFunc}><View style={styles.headNav}><FontAwesomeIcon color = "white"  size = {32} icon ={showMenu?faXmark: faBars}></FontAwesomeIcon></View></TouchableOpacity>
          <Text style={styles.title}>{navMenu.val}</Text>
        </View>
        {navMenu.tab == 1 ?<Home></Home> : navMenu.tab == 2 ?<Home></Home>:<Employee></Employee>}
    </Animated.View>
    
  </View>
    </MenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    flexGrow: 1,
    paddingTop: 30,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container:{
    flexGrow:1,
    position:"relative",
    backgroundColor:"blue",
  },
  Head: {
    zIndex: 1,
    // position:"absolute",
    // top:30,
    // left:0,
    width: "100%",
    padding: 5,
    backgroundColor: "#2374D3",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  headNav: {
    color: "white",
    padding: 5,
    borderWidth:2 ,
    backgroundColor: "#2374D3",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginLeft: 15,
  },
});

