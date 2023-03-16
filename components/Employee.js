import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Employee = () => {

  const [empDetail, setEmpdetail] = useState([]);
  const [errmsg, seterrmsg] = useState([]);
  const navigation = useNavigation()
  const [userCredential, setuserCredential] = useState({});


  const getEmployeeDetail = () => {
    const url = `http://192.168.31.203:8000/Employees`;
    try {
      const oId = userCredential._id;

      // console.log(oId);
      axios.post(url,
        { OrgId: oId ,wil:"ftyfv"})
        .then((res) => {
          if (res.status == 200) {
            setEmpdetail(res.data)
          } else {
            seterrmsg(res.error);
            console.log(res.error)
          }
        })

    } catch (error) {
      console.log("Something Went Wrong ", error)
    }

  }
  getEmployeeDetail();
  AsyncStorage.getItem("UserLoginCredentials").then((result) => { setuserCredential(JSON.parse(result)) }).catch((err) => { console.log(err) })

  useEffect(() => {
    getEmployeeDetail();
  },[])
  const HandlePress = () => {
    navigation.navigate("AddEmp")
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.detailContainer}>
        {
          empDetail.map((emp) => {
            return <View style={styles.EmpBox} key={emp.Contact}>
              <Text><Text style={{ color: "gray" }}>Employee ID: {emp.EmpId}</Text></Text>
              <Text><Text style={{ color: "blue", fontSize: 18, marginVertical: 10 }}>Name: {emp.Name}</Text></Text>
              <Text><Text style={{ color: "red", fontSize: 15, marginVertical: 10 }}>Contact: {emp.Contact}</Text></Text>
            </View>
          })
        }
      </ScrollView>
      <TouchableOpacity style={styles.addEmpCont} onPress={HandlePress}><Image source={newEmp} style={styles.addEmp}></Image></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",

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
    backgroundColor: "azure",
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
    borderRadius: 5,
  },
  addEmpCont: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "royalblue",
    borderRadius: 30,
    borderColor: "royalblue",
    borderWidth: 1,
    padding: 5,
  },
  addEmp: {
    width: "100%",
    height: "100%",
  }
})

export default Employee;
