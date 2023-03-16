import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, } from 'react-native'
import React from 'react'
import employee from "../assets/employee.png";
import { useState } from 'react';
import axios from 'axios';
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faArrowsLeftRightToLine, faBackward } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddEmp = ({ navigation }) => {
  const [empDetail, setEmpdetail] = useState({OrgId:"", EmpId: "", Name: "", Contact: null, Address: "" });
  const [errmsg, seterrormsg] = useState(null)
  const [userCredential, setuserCredential] = useState({});

  function resetFunc() {
    setEmpdetail({ EmpId: "", Name: "", Contact: null, Address: "" });
  }

  const url = `http://192.168.31.203:8000/addEmployee`;
  const HandlePress = async () => {
    console.log(userCredential._id );
    if (userCredential._id == "" || empDetail.EmpId == "" || empDetail.Name == "" || empDetail.Contact == "" || empDetail.Address == "") {
      alert("All Fields are Required !!!")
    } else if (empDetail.Contact.length != 10) {
      alert("Contact must be 10 digits !!!")

    } else {

      try {
        await axios.post(url, {
          OrgId: userCredential._id,
          EmpId: empDetail.EmpId,
          Name: empDetail.Name,
          Contact: empDetail.Contact
        })
          .then((res) => {
            if (res.status == 200) {
              alert("Employee Add Sucessfull !!!")
              navigation.navigate("AppIntegrated")
              setEmpdetail({ EmpId: "", Name: "", Contact: "" ,Address:""});

            } else {
              seterrormsg(res.data.error);
              alert(res.data.error);
              setEmpdetail({ EmpId: "", Name: "", Contact: "" ,Address:""});


            }
          })
      } catch (err) {
        console.log("Failed To add Data : ", err)
      }
    }

  }
  AsyncStorage.getItem("UserLoginCredentials").then((result) => { setuserCredential(JSON.parse(result)) }).catch((err) => { console.log(err) })

  return (
    <View style={styles.container}>
      <Text style={styles.addEmpTitle}>New Employee</Text>
      <Image source={employee} style={styles.image}></Image>
      <View style={styles.butCont}>
        <TextInput style={styles.field} placeholder="Employee Id" value={empDetail.EmpId} onChangeText={(id) => { setEmpdetail({ ...empDetail, EmpId: id }) }}></TextInput>
        <TextInput style={styles.field} placeholder="Name" value={empDetail.Name} onChangeText={(name) => { setEmpdetail({ ...empDetail, Name: name }) }}></TextInput>
        <TextInput style={styles.field} placeholder="Contact" value={empDetail.Contact} keyboardType="phone-pad" onChangeText={(con) => { setEmpdetail({ ...empDetail, Contact: con }) }}></TextInput>
        <TextInput style={[styles.field, { textAlignVertical: "top", paddingTop: 10 }]} multiline={true} placeholder="Address" numberOfLines={5} value={empDetail.Address} onChangeText={(add) => { setEmpdetail({ ...empDetail, Address: add }) }}></TextInput>

      </View>
      <View style = {styles.btnContainer}>
            <TouchableOpacity onPress={HandlePress}><Text style = {styles.savbtn} >Save Detail</Text></TouchableOpacity>
            <TouchableOpacity onPress={resetFunc}><Text style = {styles.savbtn}>Reset</Text></TouchableOpacity>
        </View>
      <TouchableOpacity style={styles.backCont} onPress={()=>{navigation.navigate("AppIntegrated")}}><FontAwesomeIcon  style={styles.backEmp} size = {30} color = "white" icon = {faArrowLeftLong}></FontAwesomeIcon></TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
  },
  addEmpTitle: {
    marginTop: 80,
    color: "white",
    letterSpacing: 1,
    fontSize: 30,
    backgroundColor: "royalblue",
    width: "80%",
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 5,
  },
  image: {
    marginVertical: 50,
  },
  butCont: {
    marginBottom: 50,

  },
  field: {
    minWidth: 280,
    width: "90%",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomColor: "#5B5B5B",
    borderBottomColor: "gray",
    borderBottomWidth: 3,
    borderRadius: 5,
  },
  btnContainer:{
    marginVertical:10,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'center'

},
savbtn:{
    backgroundColor:"#4687C2",
    padding:8,
    width:110,
    color:"white",
    textAlign:'center',
    fontSize:16,
    borderColor:"lightgray",
    borderRadius:5,
    borderWidth:2,
    marginHorizontal:15,
},
  backCont: {
    width: 60,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,

    justifyContent:"center",
    alignItems:"center",
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
})

export default AddEmp;
