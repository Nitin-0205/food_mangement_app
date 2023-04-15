import React, { useContext, useState } from 'react'
import { View, Image, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LogHome from "../assets/Donet.png";
import peek from "../assets/peek.png";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../components/CredentialContext'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


function Login({ navigation }) {
    const [userdetail, setuserdetail] = useState({ email: "", password: "" });
    const [errmsg, seterrormsg] = useState(null);
    const [passVisible, setpassVisible] = useState(true);

    const contextCall = useContext(CredentialContext);


    axios.defaults.baseURL = `https://fwm-backend.onrender.com`;
    // axios.defaults.baseURL = `http://192.168.31.203:8000`;

    
    const Url = `/login`;
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

    const persistLogin = (credentials) => {
        AsyncStorage.setItem("UserLoginCredentials", JSON.stringify(credentials))
            .then(() => {
                contextCall.setstoredCredential(credentials);
            })
            .catch((err) => {
                console.log(err);

            })
    }


    return (

        <View style={styles.contain}>
        <View style = {{position:"absolute",bottom:0,left:1,width:160,height:190}}>
        <Image source={peek} style = {{width:160,height:190,resizeMode:"contain"}}></Image>
        </View>
            <LinearGradient
                colors={["#003399","#79a7d2", "#4d88ff"]}
                style={styles.LogMain}
            >
                <View style = {styles.logImg}>
                <Image source={LogHome} style={{width:"100%",height:270,resizeMode:"contain"}}></Image>
        </View>

                <View style={styles.logContainer}>
                    <Text style={styles.logTitle}>Welcome to Log In</Text>
                    <View>
                        <Text style={{ color: "#004d99", letterSpacing: 1, marginBottom: 2 }}>User Id</Text>
                        {/* <TextInput style={styles.fields} placeholder="" value={userdetail.email} onChangeText={(txt) => { setuserdetail({ ...userdetail, email: txt }) }}></TextInput> */}
                        <View style={{ height: 40, marginBottom: 25, flexDirection: "row", backgroundColor: "white", width: 250, borderColor: "#4488D8", borderWidth: 2, borderRadius: 3 }}>
                            <View style={{ width: 30, height: "100%", justifyContent: "center", alignItems: "center" }}><FontAwesomeIcon color="gray" size={16} icon={faEnvelope}></FontAwesomeIcon></View>
                            <TextInput inputMode="email" style={{ width: 200, paddingHorizontal: 2, paddingVertical: 6, fontSize: 15, backgroundColor: "white", borderRadius: 5, overflow: "scroll" }} placeholder="" value={userdetail.email} onChangeText={(txt) => { setuserdetail({ ...userdetail, email: txt }) }}></TextInput>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: "#004d99", letterSpacing: 1, marginBottom: 2 }}>Password</Text>
                        {/* <TextInput style={styles.fields} placeholde="" value={userdetail.password} onChangeText={(txt) => { setuserdetail({ ...userdetail, password: txt }) }}></TextInput> */}
                        <View style={{ height: 40, marginBottom: 25, flexDirection: "row", backgroundColor: "white", width: 250, borderColor: "#4488D8", borderWidth: 2, borderRadius: 3 }}>
                            <TextInput style={{ width: 200, paddingHorizontal: 10, paddingVertical: 6, fontSize: 15, flexGrow: 1, backgroundColor: "white", borderRadius: 5 }} placeholder="" secureTextEntry={passVisible} value={userdetail.password} onChangeText={(txt) => { setuserdetail({ ...userdetail, password: txt }) }}></TextInput>
                            <TouchableOpacity onPress={() => { setpassVisible(!passVisible) }} style={{ width: 35, height: "100%", justifyContent: "center", alignItems: "center" }}><FontAwesomeIcon color="gray" size={16} icon={passVisible ? faEyeSlash : faEye}></FontAwesomeIcon></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={HandleLogin}>
                            <LinearGradient
                                colors={["#4687C2", "#79a7d2"]}
                                style={styles.logBtn}>
                                <Text style={{ fontSize: 18, color: "white" }}>Log In</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={HandleLo}>
                            <LinearGradient
                                colors={["#4687C2", "#79a7d2"]}
                                style={styles.logBtn}>
                                <Text style={{ fontSize: 18, color: "white" }}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity ><Text style={{ color: "#cc0000", marginTop:2}}>Forget Password?</Text></TouchableOpacity> */}

                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    contain: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#79a7d2"

    },
    LogMain: {
        width: "100%",
        flex: 1,
        // alignItems:"center",
        justifyContent: "center",
        borderBottomLeftRadius: 400,
        borderBottomRightRadius: 100,
        borderBottomWidth: 5,
        marginBottom: 40,
        backgroundColor: "#D6E1FC",
        borderColor: "#D6E1FC",
        borderWidth: 3,
    },
    logImg: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 270,
        backgroundColor: "#79a7d2",
        borderBottomLeftRadius: 120,
        borderBottomRightRadius: 300,
        borderColor: "#D6E1FC",
        borderWidth: 2,
        flex: 0.3,
        paddingTop:20,
        overflow:"hidden",

    },
    logContainer: {
        marginTop:120,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logTitle: {
        color: "white",
        letterSpacing: 1,
        fontSize: 30,
        // backgroundColor: "tomato",
        width: "80%",
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "500",
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
        alignItems: 'center',
        justifyContent: "center",
        borderColor: "#336899",
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: 15,
    }
})

export default Login;