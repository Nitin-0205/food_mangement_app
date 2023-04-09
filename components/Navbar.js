import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { Component, useContext, useState } from 'react';
import LogHome from "../assets/LogHome.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import {  faBuildingNgo, faCodeFork, faDoorOpen, faHotel, faObjectGroup, faPeopleGroup, faPlateWheat } from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import  {CredentialContext} from '../components/CredentialContext'
import {MenuContext} from './Context';
import { LinearGradient } from 'expo-linear-gradient';


function Navbar(prp) {
    const menuCall= useContext(MenuContext);

    const navigation = useNavigation()
    const HandleNav = (scrn) => {
        navigation.navigate(scrn)
    }
    const contextCall= useContext(CredentialContext);

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity ><Text style = {styles.closeTabBtn}>X</Text></TouchableOpacity> */}
            <View style={styles.NavImageCont}>
    
                <Image source={LogHome} style={styles.NavImage}></Image>
                <Text style = {styles.nameTitle}>{contextCall?contextCall.storedCredential.name:"Unknown"}</Text>
            </View>
            <View style={styles.NavBtnContainer}>
                <TouchableOpacity onPress={()=>{menuCall.setNavMenu({tab:1,val:"Home"});HandleNav("Home")}}><Text style={[styles.NavBtn,menuCall.navMenu.tab==1 &&{color:"white",backgroundColor:"#008060"}]}><FontAwesomeIcon style={[styles.NavBtn,menuCall.navMenu.tab==1 &&{backgroundColor:"#008060"}]} color = "white" size={25} icon = {faPlateWheat}></FontAwesomeIcon> NGO'S</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{menuCall.setNavMenu({tab:2,val:"Restaurent Request"});HandleNav("Home2")}}><Text style={[styles.NavBtn,menuCall.navMenu.tab==2 &&{color:"white",backgroundColor:"#008060"}]}><FontAwesomeIcon style={[styles.NavBtn,menuCall.navMenu.tab==2 &&{backgroundColor:"#008060"}]} color = "white" size={25} icon = {faBuildingNgo}></FontAwesomeIcon> Restaurant Request</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{menuCall.setNavMenu({tab:3,val:"Employees Detail"});HandleNav("Employee")}}><Text style={[styles.NavBtn,menuCall.navMenu.tab==3 &&{color:"white",backgroundColor:"#008060"}]}><FontAwesomeIcon style={[styles.NavBtn,menuCall.navMenu.tab==3 &&{backgroundColor:"#008060"}]} color = "white" size={25} icon = {faPeopleGroup}></FontAwesomeIcon> Employees</Text></TouchableOpacity>
            </View>
            <View style={{marginBottom:20}}>
                <TouchableOpacity onPress={() => { 
                    // HandleNav("Login");
                AsyncStorage.removeItem("UserLoginCredentials")
                .then(()=>{
                    contextCall.setstoredCredential(null);
                })
                .catch((err)=>{
                    console.log(err);
                
                })
            }}><Text style={styles.NavBtn}><FontAwesomeIcon style={styles.NavBtn} color = "white" size={25} icon = {faDoorOpen}></FontAwesomeIcon> Logout</Text></TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        flexGrow: 1,
        left: 0,
        top: 0,
        backgroundColor: "#CCFCE2",
        borderColor: "lightgray",
        borderWidth: 1,
    },
    // closeTabBtn: {
    //     position: "absolute",
    //     right: 10,
    //     top: 10,
    //     backgroundColor: "#A0E1BE",
    //     width: 40,
    //     height: 40,
    //     borderRadius: 5,
    //     color: "white",
    //     fontSize: 25,
    //     textAlign: "center",
    //     textAlignVertical: "center",
    //     borderColor: "#A4A4A4",
    //     borderWidth: 2,
    //     zIndex: 5,
    // },
    NavImageCont: {
        marginTop: 50,
        width: 250,
    },
    NavImage: {
        width: 150,
        height: 150,
        borderColor:"#35AF75",
        borderRadius:200,
        borderWidth:4,
        borderTopWidth:10,
        borderBottomWidth:10,
        alignSelf:"center",
        resizeMode:"center",
        backgroundColor: "#80d4ff",
        marginBottom:10,
    },
    nameTitle:{
        fontSize:25,
        color:"#0077b3",
        textAlign:"center",
        fontWeight:"500",
        width: 250,
        padding:5,


    },
    NavBtnContainer: {
        marginTop: 60,
        flexGrow:1,
    },
    NavBtn: {
        width: 250,
        fontSize: 20,
        color: "white",
        backgroundColor: "#35AF75",
        zIndex: 1,
        textAlignVertical:"top",
        alignItems:"center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        margin: 5,
        borderWidth: 0,
        borderRadius: 5,


    },

})

export default Navbar;