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
            <View style = {{flex:1,zIndex:2,position:"absolute",left:0,right:0,top:0,bottom:0,opacity:0.5,backgroundColor:"black"}}>

            </View>
            <LinearGradient 
            colors = {["#006699","#2597f4","#1ab2ff"]}
            useAngle={true}
            angle={95}
            angleCenter= {{ x: 0.5, y: 0.5 }}
            style ={{zIndex:1,position:"absolute",left:-3,top:-3,width:"90%",borderBottomRightRadius:600,height:300,borderColor:"#80bfff",borderWidth:3}}>

            </LinearGradient>
            <LinearGradient 
            colors = {["#2597f4","#0a6fc2",'#0044cc']}
            style ={{zIndex:1,position:"absolute",right:-3,bottom:-3,width:"80%",borderTopLeftRadius:600,height:300,borderColor:"#80bfff",borderWidth:3}}>

            </LinearGradient>
        
            <TouchableOpacity  onPress = {()=>{navigation.navigate("AppIntegrated")}} style={{zIndex:100}}><FontAwesomeIcon style = {styles.closeTabBtn} color = "#e6f9ff"  size = {32} icon ={faXmark}></FontAwesomeIcon></TouchableOpacity>
            
            <View style={[styles.Infocontainer,styles.shadow]}>
            <LinearGradient
            colors ={["#35af75","#35AF75"]}
            style={{borderRadius: 10}}
            >
                <View style={styles.Information}>
                    <TouchableOpacity  onPress = {()=>{navigation.navigate("Map",{params:foodInfoDetail?.Location})}}>
                    <LinearGradient
                        colors = {["#0a6fc2","#2597f4","#2196F3"]}
                        style={styles.infoStatus}>
                        <Text style={styles.location}>LOCATION</Text>
                        <FontAwesomeIcon style = {styles.limg} color = "white"  size = {32} icon ={faMapMarkedAlt}></FontAwesomeIcon>
                        </LinearGradient>
                    </TouchableOpacity>

                    <ScrollView  style={styles.InfotxtContainer}>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Name</Text>      :{foodInfoDetail?.Name}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Address</Text>   : {foodInfoDetail?.Address}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>City</Text>      : {foodInfoDetail?.City}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Type</Text>      : {foodInfoDetail?.Type}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Vehicle</Text>   : {foodInfoDetail?.Vehicle}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Date</Text>      : {foodInfoDetail?.Date}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Time</Text>      : {foodInfoDetail?.Time}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Req ID</Text>    : {foodInfoDetail?._id}</Text>
                        <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Mobile</Text>    : {foodInfoDetail?.Contact}</Text>

                        {
                           foodInfoDetail?.AssignVolunteer  && <>
                            <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Employee Name</Text>  : {foodInfoDetail?.AssignVolunteer?.Name}</Text>
                            <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Employee Phone</Text>  : {foodInfoDetail?.AssignVolunteer?.Contact}</Text>
                            <Text style={styles.options}><Text style = {{color:"#0a6fc2"}}>Employee Email</Text>  : {foodInfoDetail?.AssignVolunteer?.EmpId}</Text>

                            </>
                        }

                    </ScrollView>
                    {
                       foodInfoDetail.Status == "Pending" && <TouchableOpacity onPress={()=>{navigation.navigate("AssignEmp",{params:foodInfoDetail})}} style = {styles.Infobtn}>
                        <LinearGradient
                        colors = {["#2196F3","#0a6fc2"]}
                        style={styles.InfoTxtbtn}>
                        <Text style={{fontSize: 20,fontWeight: 'bold',color: 'white'}}>Accept Donation</Text>

                        </LinearGradient>
                        </TouchableOpacity>
                    }

                </View>
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#ccccff',
        position:"relative",
        overflow:"hidden",
    },
    closeTabBtn: {
        position: "absolute",
        right: 15,
        top: 15,
        width: 40,
        height: 40,
        zIndex: 10,
    },
    Infocontainer: {
        position:"relative",
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 10,

    },
    Information: {
        borderWidth: 2,
        width: 350,
        height: 600,
        borderColor: 'lightgray',
        flexDirection: 'column',
        // backgroundColor: '#35AF75',
        justifyContent:"space-between",
        borderRadius: 10,
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
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
      elevation: 5,
  
    },
})