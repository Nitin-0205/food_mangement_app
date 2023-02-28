import React, { useContext, useState } from 'react'
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LogHome from "../assets/log.webp";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import  {CredentialContext} from '../components/CredentialContext'

function Login({ navigation }) {
    const [userdetail, setuserdetail] = useState({ email: "", password: "" });
    const [errmsg, seterrormsg] = useState(null);
    const [passVisible, setpassVisible] = useState(true);

    const contextCall= useContext(CredentialContext);

    const Url = `http://192.168.31.203:8000/login`;
    const HandleLogin = async () => {
        if (userdetail.email == "" || userdetail.password == "") {
            alert("All fields are required !!!");

        } else {
            if (userdetail.password.length >= 8) {
                const header = {
                    email: userdetail.email,
                    password: userdetail.password
                };

                console.log(header);
                try {
                    await axios.post(Url, header)
                        .then((response) => {
                            const data = response.data;
                            if (response.status == 200) {
                                console.log(data);
                                persistLogin(data);
                            } else {
                                seterrormsg(response.data.err);
                                alert(errmsg);
                                setuserdetail({ email: "", password: "" })
                            }
                        })
                } catch (err) {
                    console.log("failed to connect database", err);
                }
            } else {
                alert("password must contain minimum 8 characters !!!");
            }


        }
    }
    const HandleLo = () => {
        navigation.push("SignUp");
    }

    const persistLogin = (credentials) =>{
        AsyncStorage.setItem("UserLoginCredentials",JSON.stringify(credentials))
        .then(()=>{
            contextCall.setstoredCredential(credentials);
        })
        .catch((err)=>{
            console.log(err);
        
        })
    }


    return (
        
        <View style={styles.LogMain}>
            <Image source={LogHome} style={styles.logImg}></Image>

            <View style={styles.logContainer}>
                <Text style={styles.logTitle}>Welcome to Log In</Text>
                <View>
                    <Text style={{ color: "royalblue", letterSpacing: 1, marginBottom: 2 }}>User Id</Text>
                    {/* <TextInput style={styles.fields} placeholder="" value={userdetail.email} onChangeText={(txt) => { setuserdetail({ ...userdetail, email: txt }) }}></TextInput> */}
                    <View style={{ height: 40, marginBottom: 25, flexDirection: "row", backgroundColor: "white", width: 250, borderColor: "#4488D8", borderWidth: 2, borderRadius: 3 }}>
                    <View style={{ width: 30, height: "100%", justifyContent: "center", alignItems: "center" }}><FontAwesomeIcon color="gray" size={16} icon={faEnvelope}></FontAwesomeIcon></View>
                        <TextInput inputMode="email" style={{ width: 200, paddingHorizontal: 2, paddingVertical: 6, fontSize: 15, backgroundColor: "white", borderRadius: 5 ,overflow:"scroll"}} placeholder=""  value={userdetail.email} onChangeText={(txt) => { setuserdetail({ ...userdetail, email: txt }) }}></TextInput>
                    </View>
                </View>
                <View>
                    <Text style={{ color: "royalblue", letterSpacing: 1, marginBottom: 2 }}>Password</Text>
                    {/* <TextInput style={styles.fields} placeholde="" value={userdetail.password} onChangeText={(txt) => { setuserdetail({ ...userdetail, password: txt }) }}></TextInput> */}
                    <View style={{ height: 40, marginBottom: 25, flexDirection: "row", backgroundColor: "white", width: 250, borderColor: "#4488D8", borderWidth: 2, borderRadius: 3 }}>
                        <TextInput style={{width: 200, paddingHorizontal: 10, paddingVertical: 6, fontSize: 15, flexGrow: 1, backgroundColor: "white", borderRadius: 5 }} placeholder="" secureTextEntry={passVisible} value={userdetail.password} onChangeText={(txt) => { setuserdetail({ ...userdetail, password: txt }) }}></TextInput>
                        <TouchableOpacity onPress={() => { setpassVisible(!passVisible) }} style={{ width: 35, height: "100%", justifyContent: "center", alignItems: "center" }}><FontAwesomeIcon color="gray" size={16} icon={passVisible ? faEye : faEyeSlash}></FontAwesomeIcon></TouchableOpacity>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={HandleLogin}><Text style={styles.logBtn} >Log In</Text></TouchableOpacity>
                    <TouchableOpacity onPress={HandleLo}><Text style={styles.logBtn}>Sign Up</Text></TouchableOpacity>
                </View>

                <TouchableOpacity ><Text style={{ color: "red", letterSpacing: 1, }}>Forget Password?</Text></TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    LogMain: {
        width: "100%",
        flex: 1,
        // alignItems:"center",
        justifyContent: "center",
        backgroundColor: "#D6E1FC",
    },
    logImg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 280,
        backgroundColor: "white",
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 300,
        borderColor: "white",
        borderWidth: 5,
        flex: 0.3,

    },
    logContainer: {
        marginTop: 250,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D6E1FC",
    },
    logTitle: {
        color: "gray",
        letterSpacing: 1,
        fontSize: 30,
        // backgroundColor: "tomato",
        width: "80%",
        textAlign: "center",
        marginBottom: 20,
        fontWeight:"500",
        paddingVertical: 5,
        borderRadius: 5,
    },
    fields: {
        fontSize: 15,
        width: 250,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderColor: "#4488D8",
        borderRadius: 3,
        borderWidth: 0.5,
        backgroundColor: 'white',
        marginBottom: 40,
    },
    btnContainer: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'

    },
    logBtn: {
        backgroundColor: "#4687C2",
        padding: 5,
        width: 100,
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        borderColor: "royalblue",
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: 15,
    }
})

export default Login;