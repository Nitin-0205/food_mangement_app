import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faFaceGrin, faXmark,faUser, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Emp from "../assets/ngos_default.jpg"
import axios from 'axios';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';
import api from "./url"

export default function NGOS() {

  const [ngoDetail, setngosDetail] = useState([]);
  const [errmsg, seterrmsg] = useState([]);
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);

  // axios.defaults.baseURL = `http://192.168.31.80:8000`;
axios.defaults.baseURL = api.defaults.baseURL;
  const HandleNgoList = async () => {
    const url = `/ngos`;
    try {
      await axios.get(url).then((res) => {
        if (res.status == 200) {
          setngosDetail(res.data);
        } else {
          console.log(res.error);
        }
      });
    } catch (error) {
      console.log("Something Went Wrong ", error);
    }
  };

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };  


  useEffect(() => {
    HandleNgoList();
    startLoading();

  }, [])

  const HandlePress = () => {
    navigation.navigate("AddEmp")
  }


  return (
    <View style={styles.container}>
      {loading ? (
              <Loading loading = {loading}></Loading>
        ):(ngoDetail.length > 0 ? <ScrollView style={styles.detailContainer}>
            
        {
          ngoDetail.map((ngo,ind) => {
            console.log(ngo)
            return (
            <TouchableOpacity style={[styles.EmpBox]} key={ind} onPress = {()=>{console.log(ngo)}}>
              <View style={{width:80,height:80,marginRight:30,overflow:"hidden",borderRadius:50,borderColor:"#e67300",borderWidth:3,justifyContent:"center",alignItems:"center",marginBottom:10}}>
                {/* <FontAwesomeIcon color= "white" size = {50} icon = {faUser}> </FontAwesomeIcon> */}
                <Image style = {{width:80,height:80}} source={Emp}></Image>
              </View>
              <View>
              <Text style={{ color: "white", marginVertical: 1 }}><Text style ={{color:"lightgray"}}>NGO ID: </Text>{ngo.email}</Text>
              <Text style={{ color: "white" ,fontWeight:"500", fontSize: 18, marginVertical: 1 }}><Text style={{ color: "lightgray" , fontSize: 14}}>Name: </Text>{ngo.name}</Text>
              <Text style={{ color: "white" ,fontWeight:"500", fontSize: 18, marginVertical: 1 }}><Text style={{ color: "lightgray", fontSize: 14 }}>Contact: </Text>{ngo.contact}</Text>
              <Text style={{ color: "white" ,fontWeight:"500", fontSize: 18, marginVertical: 1 }}><Text style={{ color: "lightgray",fontWeight:"600", fontSize: 15}}>City: </Text>{ngo.city}</Text>

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
      {/* <TouchableOpacity style={styles.addEmpCont} onPress={() => { navigation.navigate("RestoHome") }}>
      <FontAwesomeIcon  color={"tomato"} size={35} icon={faArrowLeftLong}></FontAwesomeIcon>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.addEmpCont} onPress={() => { navigation.navigate("RestoHome") }}><FontAwesomeIcon size={30} color="white" icon={faArrowLeftLong}></FontAwesomeIcon></TouchableOpacity>

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
    backgroundColor: "#ff8c1a",
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