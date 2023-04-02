import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Button ,ActivityIndicator} from 'react-native'
import React, { useContext, useEffect, useRef } from 'react';
import Head from "./Head"
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faBars, faBowlFood, faCheckSquare, faClipboardList, faCodePullRequest, faFaceGrin, faFaceSadTear, faFilter, faFilterCircleDollar, faFilterCircleXmark, faIdBadge, faLocationPin, faNoteSticky, faRefresh, faSadTear, faSquareCheck, faStepBackward, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faCheckCircle, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default function RestoHistory() {
  const [filter, setfilter] = useState(false);
  const [errmsg, seterrmsg] = useState();
  const [showOther, setShowOther] = useState(false);
  const [reqfoodData, setreqfoodData] = useState([]);
  const [status, setStatus] = useState(0);
  const [ReqDetail, showReqDetail] = useState(false)
  const [userCredential,setuserCredential] = useState([]);
  const [userFoodDetail ,setuserFoodeDetail] = useState({showReqDetail :ReqDetail});
  const  navigation = useNavigation()

  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  console.log("Main Resto Function ")
  
  axios.defaults.baseURL = `https://fwm-backend.onrender.com`;

  const getReqData = async () => {
    const Url = `/getfood`;
    try {
      const uId = userCredential._id;
      const bd = { userId: uId, showOth: showOther }
      console.log("cred",userCredential._id);
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

  const getData = async ()=>{
    try{
      await AsyncStorage.getItem("UserLoginCredentials")
      .then(value =>{
        if(value != null){
          var datavalue = JSON.parse(value);
          setuserCredential(datavalue);
          console.log("Credential",value)
        }
      })
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
    getReqData();
    startLoading();
  }, [])


  return (
    <View style={styles.container}>
      <View style={[styles.butCont, styles.shadow,]}>
        <TouchableOpacity style={{ width: "50%" }} onPress={() => { setShowOther(true) }}><Text style={[styles.btn, showOther ? { borderBottomColor: "white", color: "royalblue", fontWeight: "500", backgroundColor: "white", borderTopRightRadius: 12} : {}]}>Other NGO's</Text></TouchableOpacity>
        <TouchableOpacity style={{ width: "50%" }} onPress={() => { setShowOther(false) }}><Text style={[styles.btn, showOther ? {} : { borderBottomColor: "white", color: "royalblue", fontWeight: "500", backgroundColor: "white", borderTopLeftRadius: 12 }]}>My Request</Text></TouchableOpacity>


      </View>
      <View style={styles.stsbutCont}>
        <TouchableOpacity style={{ width: 105 }} onPressIn={() => { setStatus(0) }}><Text style={[styles.statusBtn, { borderColor: "#2eb82e", color: "#2eb82e" }, status == 0 ? { color: "white", backgroundColor: "#009933", borderRadius: 5 } : {}]}>
          <FontAwesomeIcon size={13} icon={faCheckCircle} color={status == 0 ? "white" : "#2eb82e"}></FontAwesomeIcon>  APPROVE</Text></TouchableOpacity>

        <TouchableOpacity style={{ width: 105 }} onPressIn={() => { setStatus(1) }}><Text style={[styles.statusBtn, { color: "tomato", borderColor: "tomato" }, status == 1 ? { color: "white", backgroundColor: "tomato", borderRadius: 5 } : {}]}>
          <FontAwesomeIcon size={13} icon={faCheckCircle} color={status == 1 ? "white" : "tomato"}></FontAwesomeIcon>  PENDING</Text></TouchableOpacity>

        <TouchableOpacity style={{ width: 105 }} onPressIn={() => { setStatus(2) }}><Text style={[styles.statusBtn, { color: "royalblue", borderColor: "royalblue" }, status == 2 ? { color: "white", backgroundColor: "royalblue", borderRadius: 5 } : {}]}>
          <FontAwesomeIcon size={13} icon={faCheckCircle} color={status == 2 ? "white" : "royalblue"}></FontAwesomeIcon>  DELIVERED</Text></TouchableOpacity>

      </View>

      {
        filter && <View style={styles.filtercontainer}>
          <View style={[styles.filterBox, styles.shadow]}>
            <TouchableOpacity><Text style={styles.filterBtn}><FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon> Recent</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.filterBtn}><FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> Date</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.filterBtn}><FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon> Location</Text></TouchableOpacity>

          </View>

        </View>
      }
      {loading ? (
              <View style={{flexGrow:1,fontSize:30,justifyContent:"center",alignItems:"center"}}>

          <ActivityIndicator
            visible={loading}
            size = {50}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          </View>
        ) :
      (reqfoodData.length >0 ? (
      <ScrollView style={styles.requestCont}>
        {
          reqfoodData.map((data) => {
          return (<TouchableOpacity onPress={() => { navigation.navigate("CheckInfo",{params:data})}} style={[styles.reqBox, styles.shadow]} key={data._id} >
              <View style={styles.box1}>
                <Text style={styles.reqId}>RequestId: {data.UserId}</Text>
                <Text style={styles.reqDetail}><Text style={{ color: "royalblue", fontWeight: "700" }}>Name: </Text>{data.Name}</Text>
                <Text style={styles.reqDetail}><Text style={{ color: "royalblue", fontWeight: "700" }}>FeedCount: </Text> {data.Feedcount}</Text>
                <Text style={styles.reqDetail}><Text style={{ color: "royalblue", fontWeight: "700" }}>City: </Text> {data.City}</Text>
              </View>
              <View style={styles.box2}>
                <TouchableOpacity><Text style={[styles.reqStateBtn, { color: data.Status == "Pending" ? "red" : "green" }]}>{data.Status}</Text></TouchableOpacity>
                <Text style={styles.date}>{data.Date}  {data.Time}</Text>
              </View>
            </TouchableOpacity>
          )
        })
        }
      </ScrollView>):
      <View style={{flexGrow:1,fontSize:30,justifyContent:"center",alignItems:"center"}}>
          <FontAwesomeIcon color = "#ffcc00" size = {50} icon = {faFaceGrin}></FontAwesomeIcon>
        <Text style={{fontSize:30,color:"slateblue" ,flexDirection:"row"}}> No request Yet !!!</Text>
        </View>)
        }
      <TouchableOpacity style={styles.foodReqBtnCont} onPress={() => {navigation.navigate("RestoHome") }}><FontAwesomeIcon style={styles.ReqBtn} size={30} color="white" icon={faArrowLeftLong}></FontAwesomeIcon></TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    flex:1,
    justifyContent:"center",
    color: 'royalblue',
  },
  container: {
    flex:1,
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
    backgroundColor: "#2374D3",

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
  btn: {
    paddingVertical: 10,
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 18,
    color: "white",
    borderBottomColor: "#2374D3",
    borderBottomWidth: 3,
    borderColor: "white",
    backgroundColor: "#2374D3",
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
    alignSelf: "center",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightblue",
  },
  reqId: {
    color: "gray",
    fontSize: 10,
    paddingLeft: 5,
  },
  reqDetail: {
    fontSize: 15,
    color: "#220",
    paddingVertical: 5,
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

