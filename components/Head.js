import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import Navbar from './Navbar';


const Head = (prop)=>{
    return (
      <View style = {styles.container}>
        <TouchableOpacity><Text style = {styles.headNav}>--</Text></TouchableOpacity>
        <Text style = {styles.title}>{prop.title}</Text>
      </View>
    )

}

const styles = StyleSheet.create({
    container:{
        zIndex:1,
        // position:"absolute",
        // top:30,
        // left:0,
        width:"100%",
        padding :5,
        backgroundColor:"#2374D3",
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:13,
    },
    headNav:{
        color:"white",
        padding:5,
        width:40,
        height:40,
        backgroundColor:"#2374D3",
        borderColor:"white",
        borderWidth:1,
        borderRadius:5,
        marginLeft:5,
    },
    title:{
        color:"white",
        fontSize:25,
        marginLeft:15,
    }

})

export default Head;