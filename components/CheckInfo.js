import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { faMapMarkedAlt, faMapMarker, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


export default function CheckInfo({route}) {
    const navigation = useNavigation();

    const foodInfoDetail = route?.params?.params;
    // console.log(foodInfoDetail)
    return (
        <View style = {styles.container}>
        
            <TouchableOpacity  onPress = {()=>{navigation.navigate("AppIntegrated")}}><FontAwesomeIcon style = {styles.closeTabBtn} color = "royalblue"  size = {32} icon ={faXmark}></FontAwesomeIcon></TouchableOpacity>
            
            <View style={styles.Infocontainer}>
            <LinearGradient
            colors ={["#35af75","#35AF75"]}>
                <View style={styles.Information}>
                    <TouchableOpacity  onPress = {()=>{navigation.navigate("Map",{params:foodInfoDetail?.Location})}}>
                    <LinearGradient
                        colors = {["#0a6fc2","#2597f4","#2196F3"]}
                        style={styles.infoStatus}>
                        <Text style={styles.location}>LOCATION</Text>
                        <FontAwesomeIcon style = {styles.limg} color = "white"  size = {32} icon ={faMapMarkedAlt}></FontAwesomeIcon>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.InfotxtContainer}>
                        <Text style={styles.options}>Name      : {foodInfoDetail?.Name}</Text>
                        <Text style={styles.options}>Address   : {foodInfoDetail?.Address}</Text>
                        <Text style={styles.options}>City      : {foodInfoDetail?.City}</Text>
                        <Text style={styles.options}>Type      : {foodInfoDetail?.Type}</Text>
                        <Text style={styles.options}>Vehicle   : {foodInfoDetail?.Vehicle}</Text>
                        <Text style={styles.options}>Date      : {foodInfoDetail?.Date}</Text>
                        <Text style={styles.options}>Time      : {foodInfoDetail?.Time}</Text>
                        <Text style={styles.options}>Request ID: {foodInfoDetail?._id}</Text>
                        <Text style={styles.options}>Mobile    : {foodInfoDetail?.Contact}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{navigation.navigate("AssignEmp",{params:foodInfoDetail})}} style = {styles.Infobtn}>
                        <LinearGradient
                        colors = {["#2196F3","#0a6fc2"]}
                        style={styles.InfoTxtbtn}>
                        <Text style={{fontSize: 20,fontWeight: 'bold',color: 'white'}}>Accept Donation</Text>

                        </LinearGradient>
                        </TouchableOpacity>

                </View>
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#bfbfbf',
        position:"relative",
    },
    closeTabBtn: {
        position: "absolute",
        right: 15,
        top: 15,
        width: 40,
        height: 40,
        zIndex: 5,
    },
    Infocontainer: {
        position:"relative",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    Information: {
        borderWidth: 1,
        width: 350,
        height: 600,
        borderColor: 'lightgray',
        flexDirection: 'column',
        // backgroundColor: '#35AF75',
        justifyContent:"space-between",
        borderRadius: 4,
        padding:10,


    },
    infoStatus: {
        width: '100%',
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingHorizontal:10,
        borderColor:"white",
        borderWidth :1,
    },
    location: {
        color: 'white',
        fontSize: 19,
        marginVertical: 13,
        fontWeight: 'bold'

    },
    limg: {
        width: 33,
        height: 33,
        marginTop: 8,
    },
    InfotxtContainer:{
        padding:5,
        flex:1,

    },
    options: {
        paddingLeft: 7,
        paddingTop: 8,
        fontSize: 18,
        marginTop: 3,
        color: '#e6ffff',
        //position: 'absolute',
    },
    Infobtn: {
        marginTop: 30,
        width: 250,
        // height: 42,
        marginLeft: 30,
        marginBottom:10
    },
    InfoTxtbtn: {
        alignItems:"center",
        borderRadius: 3,
        justifyContent:"center",
        paddingVertical:6,
        borderColor: '#9ed1fa',
        backgroundColor: '#9ed1fa',
        borderWidth: 2,


    },
})