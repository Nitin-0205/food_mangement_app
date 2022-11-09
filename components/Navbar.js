import { Text, View,StyleSheet, TouchableOpacity,Image } from 'react-native'
import React, { Component ,useState} from 'react';
import LogHome from  "../assets/LogHome.png";
// import FontAwesome,{Geolocation} from  "react-native-fontawesome";



function Navbar ({navigation}) {
    // const HandleNav = ()=>{
    //     navigation.push("Login");
    // }

    return (
      <View style = {styles.container}>
        <TouchableOpacity ><Text style = {styles.closeTabBtn}>X</Text></TouchableOpacity>
        <Image source = {LogHome} style = {styles.NavImage}></Image>
        <View style = {styles.NavBtnContainer}>
            <TouchableOpacity ><Text style = {styles.NavBtn}>Restaurant Request</Text></TouchableOpacity>
            <TouchableOpacity ><Text style = {styles.NavBtn}>NGO'S</Text></TouchableOpacity>
            <TouchableOpacity ><Text style = {styles.NavBtn}>Employees</Text></TouchableOpacity>
            <TouchableOpacity ><Text style = {styles.NavBtn}>Logout</Text></TouchableOpacity>
        </View>
      </View>
    )
}
const styles = StyleSheet.create({
    container:{
        position:"absolute",
        zIndex:10,
        // left:"-50%",
        width:"80%",
        // height:"100%",
        alignSelf:"flex-start",
        backgroundColor:"#CCFCE2",
        borderColor:"lightgray",
        borderWidth:1,
        // justifyContent:"center",
        // alignItems:"center"
    },
    closeTabBtn:{
        position:"absolute",
        right :10,
        top:10,
        backgroundColor:"#A0E1BE",
        width:40,
        height:40,
        borderRadius:5,
        color:"white",
        fontSize:25,
        textAlign:"center",
        textAlignVertical:"center",
        borderColor:"#A4A4A4",
        borderWidth:2,
        zIndex:5,
    },
    NavImage:{
        marginTop:50,
        alignSelf:"center",
        height:200,
        width:200,
    },
    NavBtnContainer:{
        marginTop:60,
    },
    NavBtn:{
        fontSize:20,
        color:"white",
        backgroundColor:"#35AF75",
        zIndex:1,
        textAlignVertical:"center",
        paddingHorizontal:10,
        paddingVertical:5,
        margin:5,
        borderColor:"gray",
        borderWidth:2,


    },

})

export default Navbar;