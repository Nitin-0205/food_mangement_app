import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react';
import Head from "./Head"
import { useState } from 'react';

const Home = () => {
  const [filter, setfilter] = useState(false);
  return (
    <View style={styles.container}>
      <Head title="NGO's Request"></Head>
      <View style={styles.butCont}>
        <TouchableOpacity><Text style={styles.btn}>My Request</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.btn}>Other NGO's</Text></TouchableOpacity>
      </View>
      <TouchableOpacity><Text style={styles.fltr} onPress={() => { setfilter(!filter) }}>Filter </Text></TouchableOpacity>

      {
        filter ? <View style={styles.filtercontainer}>
          <View>
            <TouchableOpacity><Text>Recent</Text></TouchableOpacity>
            <TouchableOpacity><Text>Date</Text></TouchableOpacity>
            <TouchableOpacity><Text>Location</Text></TouchableOpacity>

          </View>

        </View> : <></>
      }
      <ScrollView style={styles.requestCont}>
        
        <View style={styles.reqBox}>
          <View style={styles.box1}>
            <Text style={styles.reqId}>RequestId:</Text>
            <Text style={styles.reqDetail}><Text style={{color:"tomato"}}>Name: </Text>Ngo name</Text>
            <Text style={styles.reqDetail}><Text style={{color:"tomato"}}>FeedCount: </Text> 2</Text>
          </View>
          <View style={styles.box2}>
            <TouchableOpacity><Text style={styles.reqStateBtn}>Pending</Text></TouchableOpacity>
            <Text style ={styles.date}>02/05/2022</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  butCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "white",
    paddingVertical: 7,
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 18,
    color: "gray",
    borderBottomColor: "lightblue",
    borderWidth: 3,
    borderColor: "white",
  },
  fltr: {
    borderWidth: 2,
    borderColor: "gray",
    width: 80,
    textAlign: "center",
    paddingVertical: 6,
    marginTop: 20,
  },
  filtercontainer: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  requestCont: {
    width: "100%",
    paddingVertical: 20,
    flexDirection:"column",
  },
  reqBox: {
    alignSelf:"center",
    marginBottom:10,
    paddingVertical:15,
    paddingHorizontal:10,
    width:"90%",
    borderRadius:10,
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
  box2:{
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
  },
  reqStateBtn: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderColor: "tomato",
    borderRadius: 5,
    borderWidth: 2,
    color:"red",
    textTransform:"uppercase",
  },
  date:{
    marginTop:10,
    color:'green',
    fontSize: 12,

  }


})

export default Home