import { View, Text, TouchableOpacity ,StyleSheet, ScrollView, Image,Animated} from 'react-native'
import React, { useState ,useEffect,useRef} from 'react'
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import Navbar from './Navbar';


const Employee = ({navigation}) => {
  const [empDetail ,setEmpdetail] = useState([]);
  const [errmsg,seterrmsg] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeBtnOffset = useRef(new Animated.Value(0)).current;


  const MenuBtnFunc= (navigation) => {

    Animated.timing(scaleValue, {
      toValue: showMenu ? 1:0.88,
      duration: 300,
      useNativeDriver:true,
    })
    .start()
    Animated.timing(offsetValue, {
      toValue: showMenu ? 0:290,
      duration: 300,
      useNativeDriver:true,
    })
      .start()
      setShowMenu(!showMenu)
  }
  const getEmployeeDetail = async ()=>{
    const url = `http://192.168.31.203:8000/Employees`;
    try{
      await axios.get(url)
      .then((res)=>{
        if(res.status == 200){
          setEmpdetail(res.data)
        }else{
          seterrmsg(res.error);
        }
      })
    }catch(error){
      console.log("Something Went Wrong ",error)
    }

  }
  useEffect(()=>{
    getEmployeeDetail();
  },[])
  const HandlePress = ()=>{
    navigation.push("AddEmp")
  }
  return (
    <View style={styles.MainContainer}>
      <Navbar key = {3}></Navbar>

    <Animated.View style={{
      paddingTop: 30,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flexGrow: 1,
      backgroundColor: "white",
      alignItems: "center",
      borderRadius: showMenu ? 15:0,
      transform:[
        {scale:scaleValue},
        {translateX:offsetValue}
      ],
    }}>
      <View style={styles.Head}>
      <TouchableOpacity onPress={MenuBtnFunc}><View style={styles.headNav}><FontAwesomeIcon color = "white"  size = {32} icon ={showMenu?faXmark: faBars}></FontAwesomeIcon></View></TouchableOpacity>
          <Text style={styles.title}>Employee's Detail</Text>
        </View>
      <ScrollView style = {styles.detailContainer}>
        {
          empDetail.map((emp)=>{
            return <View style = {styles.EmpBox} key = {emp.Contact}>
          <Text><Text style = {{color:"gray"}}>Employee ID: {emp.EmpId}</Text></Text>
            <Text><Text style = {{color:"blue",fontSize:18,marginVertical:10}}>Name: {emp.Name}</Text></Text>
            <Text><Text style = {{color:"red",fontSize:15,marginVertical:10}}>Contact: {emp.Contact}</Text></Text>
          </View>
          })
        }
      </ScrollView>
      <TouchableOpacity style = {styles.addEmpCont} onPress={HandlePress}><Image source = {newEmp} style = {styles.addEmp}></Image></TouchableOpacity>
    </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    flexGrow: 1,
    paddingTop: 30,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

  },
  container:{
    flexGrow:1,
    position:"relative",
    backgroundColor:"blue",
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
    borderWidth:2 ,
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
  detailContainer:{
    backgroundColor:"white",
    width:"100%",
    padding:10,
  },
  EmpBox:{
    width:"98%",
    alignSelf:"center",
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor:"azure",
    borderBottomColor:"lightgray",
    borderBottomWidth:3,
    borderRadius:5,
  },
  addEmpCont:{
    width:60,
    height:60,
    position:"absolute",
    bottom:20,
    right:20,
    backgroundColor:"royalblue",
    borderRadius:30,
    borderColor:"royalblue",
    borderWidth:1,
    padding:5,
  },
  addEmp:{
    width:"100%",
    height:"100%",
  }
})

export default Employee;
