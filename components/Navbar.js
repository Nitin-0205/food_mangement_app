import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { Component, useState } from 'react';
import LogHome from "../assets/LogHome.png";
// import FontAwesome,{Geolocation} from  "react-native-fontawesome";
import { useNavigation } from '@react-navigation/native';




function Navbar({prop}) {
    // const [tab ,setCurrentTab] = useState("Home");
    const navigation = useNavigation()
    const HandleNav = (scrn) => {
        navigation.navigate(scrn)
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity ><Text style = {styles.closeTabBtn}>X</Text></TouchableOpacity> */}
            <View style={styles.NavImageCont}><Image source={LogHome} style={styles.NavImage}></Image></View>
            <View style={styles.NavBtnContainer}>
                <TouchableOpacity onPress={()=>{HandleNav("Home");}}><Text style={styles.NavBtn}>Restaurant Request</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{HandleNav("Home");}}><Text style={styles.NavBtn}>NGO'S</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>{HandleNav("Employees");}}><Text style={styles.NavBtn}>Employees</Text></TouchableOpacity>
            </View>
            <View style={{marginBottom:20}}>
                <TouchableOpacity onPress={() => { HandleNav }}><Text style={styles.NavBtn}>Logout</Text></TouchableOpacity>

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
    closeTabBtn: {
        position: "absolute",
        right: 10,
        top: 10,
        backgroundColor: "#A0E1BE",
        width: 40,
        height: 40,
        borderRadius: 5,
        color: "white",
        fontSize: 25,
        textAlign: "center",
        textAlignVertical: "center",
        borderColor: "#A4A4A4",
        borderWidth: 2,
        zIndex: 5,
    },
    NavImageCont: {
        marginTop: 50,
        width: 250,
    },
    NavImage: {
        // alignSelf:"center",
        resizeMode: "center",
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
        textAlignVertical: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        margin: 5,
        // borderColor:"green",
        borderWidth: 0,
        borderRadius: 5,


    },

})

export default Navbar;