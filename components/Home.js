import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView ,Animated} from 'react-native'
import React, { useEffect, useRef } from 'react';
import Head from "./Head"
import { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
// import Animated from 'react-native-reanimated';

const Home = (navigation) => {
  const [filter, setfilter] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [errmsg,seterrmsg] = useState();
  const [reqfoodData,setreqfoodData] = useState([]);
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
  
  const getReqData = async()=>{
    const Url = `http://192.168.31.203:8000/getfood`;
    try{
      await axios.get(url)
      .then((res)=>{
        if(res.status == 200){
          setreqfoodData(res.data)
        }else{
          seterrmsg(res.error);
        }
      })
    }catch(error){
      console.log("Something Went Wrong ",error)
    }
  }
  useEffect(()=>{

  },[])

  return (
    <View style={styles.MainContainer}>
      <Navbar ></Navbar>
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
          <TouchableOpacity onPress={MenuBtnFunc}><Text style={styles.headNav}>_____</Text></TouchableOpacity>
          <Text style={styles.title}>NGO's Request</Text>
        </View>
        <View style={[styles.butCont,styles.shadow]}>
        <TouchableOpacity><Text style={styles.btn}>Other NGO's</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.btn}>My Request</Text></TouchableOpacity>
        </View>
        <TouchableOpacity><Text style={[styles.fltr]} onPress={() => { setfilter(!filter) }}>Filter </Text></TouchableOpacity>

        {
          filter ? <View style={styles.filtercontainer}>
            <View style={[styles.filterBox,styles.shadow]}>
              <TouchableOpacity><Text style={styles.filterBtn}>Recent</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.filterBtn}>Date</Text></TouchableOpacity>
              <TouchableOpacity><Text style={styles.filterBtn}>Location</Text></TouchableOpacity>

            </View>

          </View> : <></>
        }
        <ScrollView style={styles.requestCont}>
          <View style={styles.reqBox}>
            <View style={styles.box1}>
              <Text style={styles.reqId}>RequestId:</Text>
              <Text style={styles.reqDetail}><Text style={{ color: "tomato" }}>Name: </Text>Ngo name</Text>
              <Text style={styles.reqDetail}><Text style={{ color: "tomato" }}>FeedCount: </Text> 2</Text>
            </View>
            <View style={styles.box2}>
              <TouchableOpacity><Text style={styles.reqStateBtn}>Pending</Text></TouchableOpacity>
              <Text style={styles.date}>02/05/2022</Text>
            </View>
          </View>
        </ScrollView>
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
  container: {
    paddingTop: 30,
    // position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexGrow: 1,
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
    width: 40,
    height: 40,
    backgroundColor: "#2374D3",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
  },
  title: {
    color: "white",
    fontSize: 25,
    marginLeft: 15,
  },
  butCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    
  },
  shadow:{
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.5,
    shadowRadius:3.84,
    elevation:5,

  },
  btn: {
    backgroundColor: "white",
    paddingVertical: 7,
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 18,
    color: "gray",
    borderBottomColor: "lightblue",
    borderBottomWidth: 3,
    borderColor: "white",
  },
  fltr: {
    borderWidth: 1,
    borderColor: "gray",
    width: 80,
    textAlign: "center",
    paddingVertical: 6,
    marginTop: 20,
    borderRadius:5,
  },
  filtercontainer: {
    position: 'absolute',
    top:'50%',
    justifyContent: "center",
    alignItems: "center",
    zIndex:5,
  },
  filterBox:{
    backgroundColor:"#e6fff2",
    padding:10,
    borderRadius:10,
    width:200,
    height:150,
    position:'relative',
    justifyContent:"space-evenly",
  },
  filterBtn:{
    fontSize:15,
    borderBottomColor:"lightblue",
    borderBottomWidth:1,
    padding:6,

  
  },
  requestCont: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
  },
  reqBox: {
    alignSelf: "center",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: "90%",
    borderRadius: 10,
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
    borderColor: "tomato",
    borderRadius: 5,
    borderWidth: 2,
    color: "red",
    textTransform: "uppercase",
  },
  date: {
    marginTop: 10,
    color: 'green',
    fontSize: 12,

  }


})

export default Home