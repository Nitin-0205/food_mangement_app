import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
import ProfPic from "../assets/emp.gif"

import {
  faMapMarkedAlt,
  faMapMarker,
  faUser,
  faPerson,
  faPersonBiking,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./url";

export default function Profile() {
  const navigation = useNavigation();
  const [use, setAcceptShow] = useState(false);
  const [userCredential, setuserCredential] = useState([]);

  axios.defaults.baseURL = api.defaults.baseURL;

  // const userCredential = route?.params?.params;
  // // console.log(userCredential?.Address?.formatted_address)
  // const AcceptSet = ()=>{
  //     if(userCredential.Status == "Pending"){
  //             if(route?.params?.othShow){
  //                 setAcceptShow(true)
  //             }else{
  //                 setAcceptShow(false)
  //             }
  //     }
  // }

  const getData = async () => {
    try {
      await AsyncStorage.getItem("UserLoginCredentials").then((value) => {
        if (value != null) {
          var datavalue = JSON.parse(value);
          setuserCredential(datavalue);
          console.log(datavalue)
          //   getReqData(datavalue)
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          zIndex: 2,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.4,
          backgroundColor: "black",
        }}
      ></View>
      <LinearGradient
        colors={["#aa00ff", "#c44dff", "#dd99ff"]}
        useAngle={true}
        angle={95}
        angleCenter={{ x: 0.5, y: 0.5 }}
        style={{
          zIndex: 1,
          position: "absolute",
          left: -3,
          top: -3,
          width: "90%",
          borderBottomRightRadius: 600,
          height: 300,
          borderColor: "#80bfff",
          borderWidth: 3,
        }}
      ></LinearGradient>
      <LinearGradient
        colors={["#aa00ff", "#c44dff", "#dd99ff"]}
        style={{
          zIndex: 1,
          position: "absolute",
          right: -3,
          bottom: -3,
          width: "80%",
          borderTopLeftRadius: 600,
          height: 300,
          borderColor: "#80bfff",
          borderWidth: 3,
        }}
      ></LinearGradient>

      

      <View style={[styles.Infocontainer, styles.shadow]}>
        <LinearGradient
          colors={["#ccf5ff","white", "#ccf5ff"]}
          style={{ borderRadius: 10 }}
        >
          <View style={styles.Information}>
            
              <LinearGradient
                colors={["#0a6fc2", "#2597f4", "#2196F3"]}
                style={styles.location}
              >
                <Image
                  style={styles.limg}
                  source = {ProfPic}
                ></Image>
              </LinearGradient>

              <Text style={[styles.options,{color:"#009999",marginBottom:10,fontSize:30,alignSelf:"center"}]}>
                {userCredential?.name}
              </Text>
            <ScrollView style={styles.InfotxtContainer}>
              
              <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Email</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.options}>
            {userCredential?.email}
            </Text>
          </View>
          </View>
              
              <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Address</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.options}>
            {userCredential?.address?.formatted_address}            
            </Text>
          </View>
          </View>
              
              <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>City</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.options}>
            {userCredential?.city}
            </Text>
          </View>
          </View>
              <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Date</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.options}>
            {userCredential?.Date}
            </Text>
          </View>
          </View>
              <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>User ID</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.options}>
            {userCredential?._id}</Text>
          </View>
          </View>
              
              <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Mobile</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.options}>
                {userCredential?.contact}</Text>
          </View>
          </View>
              
            </ScrollView>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.Infobtn}
              >
                <LinearGradient
                  colors={["#2196F3", "#0a6fc2"]}
                  style={styles.InfoTxtbtn}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
                  >
                    Back
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccccff",
    // marginTop: Constants.statusBarHeight,
    position: "relative",
    overflow: "hidden",
  },
  subContainer: {

    margin:6,
    padding: 8

  }, subConTitle: {
    position: "absolute",
    top: 2,
    left: 20,
    backgroundColor: "white",
    zIndex: 5,
    paddingHorizontal: 3,
    color: "gray",
    fontWeight: "600",

  }, subConBox: {
    borderColor: "#2eb8b8",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 2,
  },

  
  Infocontainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    marginTop:130,
    marginBottom:30,

  },
  Information: {
    borderWidth: 2,
    width: 400,
    height:"100%",
    maxHeight: 800,
    borderColor: "#0a6fc2",
    flexDirection: "column",
    // backgroundColor: '#35AF75',
    justifyContent: "space-between",
    borderRadius: 10,
    paddingTop:80,
    padding: 20,
  },
  location: {
    position:"absolute",
    width:150,
    height:150,
    borderRadius:80,
    top:-80,
    left:"50%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    transform:[{translateX:-60}],
    color: "white",
    borderColor:"lightgray",
    borderWidth:2,
    overflow:"hidden"

  },
  limg: {
    resizeMode:"cover",
    width: "100%",
    height: "100%",
    // marginTop: 8,
  },
  options: {
    paddingLeft: 7,
    fontSize: 20,
    marginTop: 3,
    color: "#006666",
    fontWeight:"500",

    //position: 'absolute',
  },
  Infobtn: {
    alignSelf:"center",
    width: 250,
    // height: 42,
    marginBottom: 10,
  },
  InfoTxtbtn: {
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
    paddingVertical: 6,
    borderColor: "#9ed1fa",
    backgroundColor: "#9ed1fa",
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
});
