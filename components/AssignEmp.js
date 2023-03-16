import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';


const AssignEmp = ({route}) => {
  const [empDetail, setEmpdetail] = useState([]);
  const [userCredential, setuserCredential] = useState({});
  const [errmsg, seterrmsg] = useState([]);
  const navigation = useNavigation()

  const foodInfoDetail = route?.params?.params;

  console.log(foodInfoDetail);
  const getEmployeeDetail = () => {
    const url = `http://192.168.31.203:8000/Employees`;
    try {
      console.log(uId)
      const uId = userCredential._id;
      axios.post(url, { OrgId: uId })
        .then((res) => {
          if (res.status == 200) {
            setEmpdetail(res.data)
          } else {
            seterrmsg(res.error);
          }
        })
    } catch (error) {
      console.log("Something Went Wrong ", error)
    }
  }

  useEffect(() => {
    getEmployeeDetail();
  },[])

  const HandlePress = (empDetail) => {
    const url = `http://192.168.31.203:8000/UpdEmployee`;
    try {
      const uId = userCredential._id;
      console.log(uId)

      axios.post(url, { EmpDetail: empDetail,foodReqId :foodInfoDetail._id })
        .then((res) => {
          if (res.status == 200) {
            setEmpdetail(res.data)
          } else {
            seterrmsg(res.error);
          }
        })
    } catch (error) {
      console.log("Something Went Wrong ", error)
    }
    navigation.push("AppIntegrated")
  }

  AsyncStorage.getItem("UserLoginCredentials").then((result) => { setuserCredential(JSON.parse(result)) }).catch((err) => { console.log(err) })

  return (
    <View style={styles.container}>
      <ScrollView style={styles.detailContainer}>
        {
          empDetail.map((emp) => {
            return (
            <TouchableOpacity onPress={()=>{HandlePress(emp)}} disabled = {emp.Status == "A"?false:true}   style={[styles.EmpBox, { backgroundColor: emp.Status == "A" ? "#47d147" : "tomato" ,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}]} key={emp.Contact}>
              <View>
              <Text><Text style={{ color: "lightgray" }}>Employee ID: {emp.EmpId}</Text></Text>
              <Text><Text style={{ color: "white", fontSize: 18, marginVertical: 10 }}>Name: {emp.Name}</Text></Text>
              <Text><Text style={{ color: "white", fontSize: 15, marginVertical: 10 }}>Contact: {emp.Contact}</Text></Text>
              </View>
              <View>
                <Text style = {{fontSize:20,color:"azure",borderColor:"lightgray",borderWidth:1,padding:8}}>{emp.Status == "A"?"Available":"Not Available"}</Text>
              </View>
            </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <TouchableOpacity style={styles.backCont} onPress={() => { navigation.navigate("AppIntegrated") }}><FontAwesomeIcon style={styles.backEmp} size={30} color="white" icon={faArrowLeftLong}></FontAwesomeIcon></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,

  },
  Head: {
    zIndex: 1,
    // position:"absolute",
    // top:30,
    // left:0,
    width: "100%",
    padding: 5,
    backgroundColor: "#2374D3",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  headNav: {
    color: "white",
    padding: 5,
    borderWidth: 2,
    backgroundColor: "#2374D3",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginLeft: 15,
  },
  detailContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  EmpBox: {
    width: "98%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "tomato",
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
    borderRadius: 5,
    marginVertical: 3,
  },
  backCont: {
    width: 60,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "royalblue",
    borderRadius: 20,
    borderColor: "royalblue",
    borderWidth: 1,
    padding: 5,
  },
  backEmp: {
    width: "100%",
    height: "100%",
  },
})

export default AssignEmp;
