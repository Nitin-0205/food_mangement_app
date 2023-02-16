import React, { useContext, useState } from 'react'
import { View ,Image, TextInput,StyleSheet,Text, TouchableOpacity} from 'react-native';
import LogHome from "../assets/log.webp";
import axios from  "axios";


function Login({navigation}) {
    const [userdetail, setuserdetail] = useState({email :"",password:""});
    const [errmsg, seterrormsg] = useState(null);

    const Url = `http://192.168.31.203:8000/login`;
    const HandleLogin = async ()=>{
        if(userdetail.email == "" || userdetail.password == ""){
            alert("All fields are required !!!");
            
        }else{
            if(userdetail.password.length >= 8){
                const header = {
                    email:userdetail.email,
                    password:userdetail.password
                };

                console.log(header);
                try{
                   await axios.post(Url,header)
                .then((response)=>{
                    if(response.status == 200){
                        navigation.push("Home");
                    }else{
                        seterrormsg(response.data.err);
                        alert(errmsg);
                        setuserdetail({email :"",password:""})
                    }
                })
            }catch(err){
                console.log("failed to connect database", err);
            }
            }else{
                alert("password must contain minimum 8 characters !!!");
            }
            

        }
    }
    const HandleLo = ()=>{
        navigation.push("Employees");
    }


  return (
    <View style = {styles.LogMain}>
                <Image source={LogHome} style ={styles.logImg}></Image>
        
        <View  style= {styles.logContainer}>
        <Text style = {styles.logTitle}>Log In</Text>
        <View>
        <Text style = {{color:"blue",letterSpacing:1,marginBottom:2}}>User Id</Text>
        <TextInput style = {styles.fields} placeholder="" value = {userdetail.email} onChangeText = {(txt)=>{setuserdetail({...userdetail,email :txt})}}></TextInput>
        
        </View>
        <View>
        <Text style = {{color:"blue",letterSpacing:1,marginBottom:2}}>Password</Text>
        <TextInput style = {styles.fields} placeholder="" value = {userdetail.password} onChangeText = {(txt)=>{setuserdetail({...userdetail,password:txt})}}></TextInput>
        </View>
        <View style = {styles.btnContainer}>
            <TouchableOpacity onPress={HandleLogin}><Text style = {styles.logBtn} >Log In</Text></TouchableOpacity>
            <TouchableOpacity onPress={HandleLo}><Text style = {styles.logBtn}>Sign Up</Text></TouchableOpacity>
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
        // alignItems:"center",
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
    logTitle:{
        color:"white",
        letterSpacing:1,
        fontSize:30,
        backgroundColor:"tomato",
        width:"80%",
        textAlign:"center",
        marginBottom:60,
        paddingVertical:5,
        borderRadius:5,
    },
    fields:{
        fontSize:15,
        width:250,
        paddingVertical:6,
        paddingHorizontal:10,
        borderColor:"#4488D8",
        borderRadius:3,
        borderWidth:2,
        backgroundColor:'white',
        marginBottom:40,
    },
    btnContainer:{
        marginVertical:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'center'

    },
    logBtn:{
        backgroundColor:"#4687C2",
        padding:10,
        width:110,
        color:"white",
        textAlign:'center',
        fontSize:20,
        borderColor:"gray",
        borderRadius:5,
        borderWidth:2,
        marginHorizontal:15,
    }
})

export default Login;