import React, { useState } from 'react'
import { View ,Image, TextInput,StyleSheet,Text, TouchableOpacity} from 'react-native';
import LogHome from "../assets/log.webp";


function Login({navigation}) {
    const [userName, setuserName] = useState("")
    const [userPass, setuserPass] = useState("");

    const HandleLogin = ()=>{
        navigation.push("Home");
    }

  return (
    <View style = {styles.LogMain}>
                <Image source={LogHome} style ={styles.logImg}></Image>
        <View  style= {styles.logContainer}>

        <TextInput style = {styles.fields} placeholder="username" value = {userName} onChangeText = {(txt)=>{setuserName(txt)}}></TextInput>
        <TextInput style = {styles.fields} placeholder="password" value = {userPass} onChangeText = {(txt)=>{setuserPass(txt)}}></TextInput>
        <View style = {styles.btnContainer}>
            <TouchableOpacity onPress={HandleLogin}><Text style = {styles.logBtn} >Log In</Text></TouchableOpacity>
            <TouchableOpacity ><Text style = {styles.logBtn}>Sign Up</Text></TouchableOpacity>
        </View>
        <TouchableOpacity ><Text style = {{color:"red",letterSpacing:1,}}>forget password</Text></TouchableOpacity>

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    LogMain:{
        width:"100%",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#D6E1FC",
    },
    logImg:{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:280,
        backgroundColor:"white",
        borderBottomLeftRadius:120,
        borderBottomRightRadius:300,
        borderColor:"white",
        borderWidth:5,
        flex:0.3,

    },
    logContainer:{
        marginTop:250,
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#D6E1FC",
    },
    fields:{
        fontSize:15,
        width:250,
        paddingVertical:5,
        paddingHorizontal:10,
        borderColor:"#4488D8",
        borderRadius:3,
        borderWidth:2,
        backgroundColor:'white',
        marginVertical:20,
    },
    btnContainer:{
        marginVertical:50,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center'

    },
    logBtn:{
        backgroundColor:"#4687C2",
        padding:5,
        width:100,
        color:"white",
        textAlign:'center',
        fontSize:15,
        borderColor:"blue",
        borderRadius:5,
        borderWidth:2,
        marginHorizontal:15,
    }
})

export default Login;