import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from 'react-native'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faFaceGrin, faXmark,faUser, faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';
import Emp from "../assets/emp.gif"
import Loading from './Loading';
import api from "./url"


export default function({route}){
  const [empDetail, setEmpdetail] = useState([]);
  const [userCredential, setuserCredential] = useState({});
  const [errmsg, seterrmsg] = useState([]);
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);

  const foodInfoDetail = route?.params?.params;

  console.log(foodInfoDetail);

axios.defaults.baseURL = api.defaults.baseURL;

    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };  
  const getEmployeeDetail = (usrCredential) => {
    const url = `/Employees`;
    try {
      console.log(uId)
      const uId = usrCredential._id;
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
  const getData =()=>{
    try{
      AsyncStorage.getItem("UserLoginCredentials")
      .then(value =>{
        if(value != null){
          var datavalue = JSON.parse(value);
          setuserCredential(datavalue);
          // console.log(value)
          getEmployeeDetail(datavalue)
        }
      })
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getData()
    getEmployeeDetail(userCredential);
    startLoading();
  },[])

  const HandlePress = (empDetail) => {
    const url = `/UpdEmployee`;
    try {
      const uId = userCredential._id;
      console.log(uId)

      axios.post(url, { EmpDetail: empDetail,foodReqId :foodInfoDetail._id })
        .then((res) => {
          if (res.status == 200) {
            setEmpdetail(res.data)
            console,log(res.data);
          } else {
            seterrmsg("HELLO",res.error);
          }
        })
    } catch (error) {
      console.log("Something Went Wrong ", error)
    }
    navigation.push("AppIntegrated")
  }


  return (
    <View style={styles.container}>
      {loading ? (
              <Loading loading = {loading}></Loading>
        ):(empDetail.length > 0 ? <ScrollView style={styles.detailContainer}>
            
        {
          empDetail.map((emp) => {
            return (
            <TouchableOpacity disabled = {emp.Status == "A" ?false:true} onPress ={()=>{HandlePress(emp)}} style={[styles.EmpBox,{ backgroundColor: emp.Status == "A" ? "#00b359" : "tomato",alignItems:"center"}]} key={emp.Contact} >
              <View style={{width:80,height:80,marginRight:30,overflow:"hidden",borderRadius:50,borderColor:"white",borderWidth:3,justifyContent:"center",alignItems:"center",marginBottom:10}}>
                {/* <FontAwesomeIcon color= "white" size = {50} icon = {faUser}> </FontAwesomeIcon> */}
                <Image style = {{width:80,height:80}} source={Emp}></Image>
              </View>
              <View>
              <Text style={{ color: "white", marginVertical: 1 }}><Text style ={{color:"lightgray"}}>Emp ID: </Text>{emp.EmpId}</Text>
              <Text style={{ color: "white" ,fontWeight:"500", fontSize: 18, marginVertical: 1 }}><Text style={{ color: "lightgray" , fontSize: 14}}>Name: </Text>{emp.Name}</Text>
              <Text style={{ color: "white" ,fontWeight:"500", fontSize: 18, marginVertical: 1 }}><Text style={{ color: "lightgray", fontSize: 14 }}>Contact: </Text>{emp.Contact}</Text>
              <Text style={{ color: "white" ,fontWeight:"500", fontSize: 18, marginVertical: 1 }}><Text style={{ color: "lightgray",fontWeight:"600", fontSize: 15}}>Status: </Text>{emp.Status == "A" ?"Available":"Not Available"}</Text>

              </View>
            </TouchableOpacity>
            )
          })
        }
        
      </ScrollView>:<View style={{flexGrow:1,fontSize:30,justifyContent:"center",alignItems:"center"}}>
          <FontAwesomeIcon color = "#ffcc00" size = {50} icon = {faFaceGrin}></FontAwesomeIcon>
        <Text style={{fontSize:30,color:"slateblue" ,flexDirection:"row"}}> No Employee Yet !!!</Text>
        </View>)
      }
      <TouchableOpacity style={styles.addEmpCont} onPress={() => {navigation.navigate("AppIntegrated") }}><FontAwesomeIcon size={30} color="white" icon={faArrowLeftLong}></FontAwesomeIcon></TouchableOpacity>

    </View >
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
    marginTop:30,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    flex:1,
    // flexDirection:"row",
    // flexWrap:"wrap",
  },
  EmpBox: {
    width: "100%",
    marginTop:5,
    minWidth:170,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "azure",
    borderBottomColor: "lightgray",
    borderBottomWidth: 3,
    borderRadius: 5,
    flexDirection:"row"
  },
  addEmpCont: {
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 20,
    right: 20,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgreen",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  addEmp: {
    width: "100%",
    height: "100%",
  }
})