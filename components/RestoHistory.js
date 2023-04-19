import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Button, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react';
import Head from "./Head"
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faBars, faBowlFood, faCalendarAlt, faCheckSquare, faCity, faClipboardList, faCodePullRequest, faFaceGrin, faFaceSadTear, faFilter, faFilterCircleDollar, faFilterCircleXmark, faHistory, faIdBadge, faList, faListNumeric, faLocationPin, faNoteSticky, faRefresh, faSadTear, faSquareCheck, faStepBackward, faStopwatch, faUserAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCheckCircle, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ribbion from '../assets/rbnLabel.png'
import api from "./url"



export default function RestoHistory() {
  const [filter, setfilter] = useState(false);
  const [errmsg, seterrmsg] = useState();
  const [showTab, setShowTab] = useState({status:"Pending",current: 0 });
  const [reqfoodData, setreqfoodData] = useState([]);
  const [status, setStatus] = useState(0);
  const [ReqDetail, showReqDetail] = useState(false)
  const [userCredential, setuserCredential] = useState([]);
  const [userFoodDetail, setuserFoodeDetail] = useState({ showReqDetail: ReqDetail });
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  console.log("Main Resto Function ")

axios.defaults.baseURL = api.defaults.baseURL;

  const getReqData = async (usrCredential) => {
    const Url = `/getfood`;
    try {
      const uId = usrCredential._id;
      const bd = { userId: uId, role: "OTH",status:showTab.status }
      console.log("cred", userCredential._id);
      return await axios.post(Url, bd)
        .then((res) => {
          if (res.status == 200) {
            setreqfoodData(res.data)
            console.log(res.data)
          } else {
            seterrmsg(res.error);
          }
        })
    } catch (error) {
      console.log("Something Went Wrong ", error)
    }
  }

  const getData = async () => {
    try {
      await AsyncStorage.getItem("UserLoginCredentials")
        .then(value => {
          if (value != null) {
            var datavalue = JSON.parse(value);
            setuserCredential(datavalue);
            getReqData(datavalue);
            console.log("Credential", value)
          }
        })
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
    getReqData(userCredential);
    startLoading();
  }, [showTab])


  return (
    <View style={styles.container}>

      {/* <View style={styles.stsbutCont}>
        <TouchableOpacity style={{ width: 105 }} onPressIn={() => { setStatus(0) }}><Text style={[styles.statusBtn, { borderColor: "#2eb82e", color: "#2eb82e" }, status == 0 ? { color: "white", backgroundColor: "#009933", borderRadius: 5 } : {}]}>
          <FontAwesomeIcon size={13} icon={faCheckCircle} color={status == 0 ? "white" : "#2eb82e"}></FontAwesomeIcon>  APPROVE</Text></TouchableOpacity>

        <TouchableOpacity style={{ width: 105 }} onPressIn={() => { setStatus(1) }}><Text style={[styles.statusBtn, { color: "tomato", borderColor: "tomato" }, status == 1 ? { color: "white", backgroundColor: "tomato", borderRadius: 5 } : {}]}>
          <FontAwesomeIcon size={13} icon={faCheckCircle} color={status == 1 ? "white" : "tomato"}></FontAwesomeIcon>  PENDING</Text></TouchableOpacity>

        <TouchableOpacity style={{ width: 105 }} onPressIn={() => { setStatus(2) }}><Text style={[styles.statusBtn, { color: "royalblue", borderColor: "royalblue" }, status == 2 ? { color: "white", backgroundColor: "royalblue", borderRadius: 5 } : {}]}>
          <FontAwesomeIcon size={13} icon={faCheckCircle} color={status == 2 ? "white" : "royalblue"}></FontAwesomeIcon>  DELIVERED</Text></TouchableOpacity>

      </View> */}

      {loading ? (
        <View style={{ flexGrow: 1, fontSize: 30, justifyContent: "center", alignItems: "center" }}>

          <ActivityIndicator
            visible={loading}
            size={50}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) :
        (reqfoodData.length > 0 ? (
          <ScrollView style={styles.requestCont}>
            {
          reqfoodData.map((data) => {
            console.log(data)
          return (<TouchableOpacity onPress={() => { navigation.navigate("RestoCheckInfo",{params:data,deliveryStatus:false})}} style={[styles.reqBox, styles.shadow,data.Status == "Delivered" && {borderColor:"#00e6e6",backgroundColor: "#008080"},styles.shadow,data.Status == "Accept" && {borderColor:"lightgreen",backgroundColor: "#39ac73"}]} key={data._id} >
                    <View style = {styles.label}>
                    <ImageBackground source={Ribbion} style={styles.Ribbionimage}>
                      <Text style ={{color:"white",fontWeight:'600',transform:[{rotateZ:"45deg"},{translateX:5},{translateY:-13}]}} >{data.Role}</Text>
                    </ImageBackground>
                    </View>
              <View style={styles.box1}>
                <Text style={styles.reqId}>RequestId: {data._id}</Text>
                <Text style={styles.reqDetail}><Text style={[data.Status == "Pending"&&{color:'#e60000'},data.Status == "Accept"&&{color:'lightgreen'},data.Status == "Delivered"&&{color:'#00e6e6'},{ fontWeight: "700" }]}><FontAwesomeIcon color='#e6f2ff' size={11} icon = {faUserAlt}></FontAwesomeIcon> Name : </Text>{data.Name}</Text>
                <Text style={styles.reqDetail}><Text style={[data.Status == "Pending"&&{color:'#e60000'},data.Status == "Accept"&&{color:'lightgreen'},data.Status == "Delivered"&&{color:'#00e6e6'},{ fontWeight: "700" }]}><FontAwesomeIcon color='#e6f2ff' size={11} icon = {faListNumeric}></FontAwesomeIcon> FeedCount : </Text> {data.Feedcount}</Text>
                <Text style={styles.reqDetail}><Text style={[data.Status == "Pending"&&{color:'#e60000'},data.Status == "Accept"&&{color:'lightgreen'},data.Status == "Delivered"&&{color:'#00e6e6'},{ fontWeight: "700" }]}><FontAwesomeIcon color='#e6f2ff' size={11} icon = {faCity}></FontAwesomeIcon> City : </Text> {data.City}</Text>
              </View>
              <View style={styles.box2}>
                {/* <TouchableOpacity><Text style={[styles.reqStateBtn, { color: data.Status == "Pending" ? "red" : "green" }]}>{data.Status}</Text></TouchableOpacity> */}
                <Text style={[styles.date,data.Status == "Accept" && {color:"lightgreen"},styles.date,data.Status == "Delivered" && {color:"#00e6e6"}]}><FontAwesomeIcon color={data.Status == "Pending"?'tomato':"white"} size={10} icon = {faCalendarAlt}></FontAwesomeIcon> {data.Date}  <FontAwesomeIcon color={data.Status == "Pending"?'tomato':"white"} size={10} icon = {faStopwatch}></FontAwesomeIcon>{data.Time}</Text>
              </View>
            </TouchableOpacity>
          )
        })
        }
          </ScrollView>) :
          <View style={{ flexGrow: 1, fontSize: 30, justifyContent: "center", alignItems: "center" }}>
            <FontAwesomeIcon color="#ffcc00" size={50} icon={faFaceGrin}></FontAwesomeIcon>
            <Text style={{ fontSize: 30, color: "slateblue", flexDirection: "row" }}> No request Yet !!!</Text>
          </View>)
      }


      <View style={[styles.butCont, styles.shadow,]}>
        <TouchableOpacity style = {{width:65}}  onPress={() => { setShowTab({status:"Pending",current :0}) }}>
          <Text style={[styles.btn,showTab.current == 0 && styles.btnActive]}>
            <FontAwesomeIcon color={showTab.current == 0?"white":"tomato"} size={25} icon={faList}></FontAwesomeIcon>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{width:65}}  onPress={() => {setShowTab({status:"Accept",current :1}) }}>
          <Text style={[styles.btn,showTab.current == 1 && styles.btnActive]}>
            <FontAwesomeIcon color={showTab.current == 1?"white":"tomato"} size={28} icon={faCheckCircle}></FontAwesomeIcon>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{width:65}}  onPress={() => {setShowTab({status:"Delivered",current :2}) }}>
          <Text style={[styles.btn,showTab.current == 2 && styles.btnActive]}>
            <FontAwesomeIcon color={showTab.current == 2?"white":"tomato"} size={25} icon={faHistory}></FontAwesomeIcon>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {{width:65}}  onPress={() => { navigation.navigate("RestoHome") }}>
          <Text style={[styles.btn,showTab.current == 3 && styles.btnActive]}>
            <FontAwesomeIcon color={showTab.current == 3?"white":"tomato"} size={25} icon={faArrowLeftLong}></FontAwesomeIcon>
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity  onPress={() => { setShowOther(false) }}><Text style={[styles.btn, showTab.current === 1 ? { borderBottomColor: "white", color: "royalblue", fontWeight: "500", backgroundColor: "white", borderTopLeftRadius: 12 } : {}]}>My Request</Text></TouchableOpacity> */}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    flex: 1,
    justifyContent: "center",
    color: 'royalblue',
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",

  },
  Head: {
    zIndex: 1,
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

    // marginLeft: 5,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginLeft: 15,
  },
  butCont: {
    width: "100%",
    flexDirection: "row",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    justifyContent:"space-between",
    paddingHorizontal:20,
    paddingTop:5,
    borderTopColor:"tomato",
    borderTopWidth:2,
    paddingBottom:10,


  },
  btnActive:{
      fontWeight: "500",
       backgroundColor: "tomato",
       top:-30,
       margin:2,
       borderColor:"white",
       borderWidth:2
  
  },
  stsbutCont: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between"

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
  Ribbionimage:{
    flexGrow:1,
    justifyContent:"center",
    alignItems:"center",
  },
  label:{
    position:"absolute",
    // backgroundColor:"white",
    top:-13,
    right:-8,
    width:70,
    height:70,
    zIndex:50,

  },
  btn: {
    paddingVertical: 16,
    textAlign: "center",
    paddingHorizontal: 12,
    fontSize: 18,
    color: "tomato",
    backgroundColor: "white",
    borderRadius:60,
  },
  statusBtn: {
    fontSize: 13,
    padding: 7,
    flexDirection: "row",
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 2,
    borderRadius: 5
  },
  fltr: {
    borderWidth: 1,
    borderColor: "gray",
    width: 80,
    textAlign: "center",
    paddingVertical: 6,
    marginTop: 20,
    borderRadius: 5,
  },
  filtercontainer: {
    position: 'absolute',
    top: '50%',
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  filterBox: {
    backgroundColor: "#e6fff2",
    padding: 10,
    borderRadius: 10,
    width: 200,
    height: 150,
    position: 'relative',
    justifyContent: "space-evenly",
  },
  filterBtn: {
    fontSize: 15,
    borderBottomColor: "lightblue",
    borderBottomWidth: 1,
    padding: 6,


  },
  requestCont: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
    marginTop: 5,
  },
  reqBox: {
    position:"relative",
    alignSelf: "center",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor:"tomato",
    borderWidth:2,
    backgroundColor: "#ff9999",
    marginTop:3,
  },
  reqId: {
    color: "lightgray",
    fontSize: 10,
    paddingLeft: 5,
  },
  reqDetail: {
    fontSize: 15,
    color: "#220",
    paddingVertical: 5,
    color:"white",
  },
  box2: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  reqStateBtn: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    // backgroundColor:"white",
    color: "red",
    textTransform: "uppercase",
  },
  date: {
    marginTop: 10,
    color: 'green',
    fontSize: 12,

  },
  foodReqBtnCont: {
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 20,
    right: 20,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9966ff",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  ReqBtn: {
    width: "100%",
    height: "100%",
  },


})

