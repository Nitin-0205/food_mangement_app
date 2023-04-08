import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, } from 'react-native'
import React, { useEffect } from 'react'
import employee from "../assets/employee.png";
import { useState } from 'react';
import axios from 'axios';
import newEmp from "../assets/newEmp.png";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faArrowsLeftRightToLine, faBackward } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";



const GOOGLE_API_KEY = "AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs";

const AddEmp = ({ navigation }) => {
  const [empDetail, setEmpdetail] = useState({OrgId:"", EmpId: "", Name: "", Contact: null, Address: "" });
  const [errmsg, seterrormsg] = useState(null)
  const [userCredential, setuserCredential] = useState({});
  

  function resetFunc() {
    setEmpdetail({ EmpId: "", Name: "", Contact: null, Address: "" });
  }

  axios.defaults.baseURL = `https://fwm-backend.onrender.com`;

  const url = `/addEmployee`;
  const HandlePress = async () => {
    console.log(userCredential._id,empDetail );
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
  const getData = () => {
    try {
      AsyncStorage.getItem("UserLoginCredentials")
        .then(value => {
          if (value != null) {
            var datavalue = JSON.parse(value);
            setuserCredential(datavalue);
            // console.log(datavalue)
          }
        })
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData()

  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.addEmpTitle}>New Employee</Text>
      <Image source={employee} style={styles.image}></Image>
      <View style={styles.butCont}>
      <View style={{position:"relative",width:"100%",height:65}}>
      <GooglePlacesAutocomplete
        placeholder="Address"
        // minLength={2}
        // currentLocation={true}
        fetchDetails={true}
        textInputProps ={{
          onChangeText: (text) => {              
               if (text === "")  setEmpdetail({...empDetail,Address:""})
          }}
        }
        onPress={(data, details = null) => {
          setEmpdetail({...empDetail,Address:data.description})
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          components: "country:in",
          types: "establishment",
        }}
        styles={{
          textInput:{borderBottomColor: "gray",borderBottomWidth: 3},
          container: {minWidth: 280 ,position:"absolute",maxWidth:"100%",top:0,left:20,right:20,borderRadius: 5,zIndex:10 },
          listView: { backgroundColor: "gray"},
        }}
      />
      </View>
        <TextInput style={styles.field} placeholder="Employee Id" value={empDetail.EmpId} onChangeText={(id) => { setEmpdetail({ ...empDetail, EmpId: id }) }}></TextInput>
        <TextInput style={styles.field} placeholder="Name" value={empDetail.Name} onChangeText={(name) => { setEmpdetail({ ...empDetail, Name: name }) }}></TextInput>
        <TextInput style={styles.field} placeholder="Contact" value={empDetail.Contact} keyboardType="phone-pad" onChangeText={(con) => { setEmpdetail({ ...empDetail, Contact: con }) }}></TextInput>
        {/* <TextInput style={[styles.field, { textAlignVertical: "top", paddingTop: 10 }]} multiline={true} placeholder="Address" numberOfLines={5} value={empDetail.Address} onChangeText={(add) => { setEmpdetail({ ...empDetail, Address: add }) }}></TextInput> */}

      </View>
      
      <View style = {styles.btnContainer}>
      <TouchableOpacity onPress={HandlePress}>
            <LinearGradient
              colors={["#4687C2", "#79a7d2"]}
              style={styles.savbtn}>
              <Text style={{ fontSize: 18, color: "white" }}>Save Detail</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetFunc}>
            <LinearGradient
              colors={["#4687C2", "#79a7d2"]}
              style={styles.savbtn}>
              <Text style={{ fontSize: 18, color: "white" }}>Reset</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate("AppIntegrated")}} style={styles.backCont}>
            <LinearGradient
              colors={["#4687C2", "#79a7d2"]}
              style={{width:60,height:40,justifyContent:"center",
              alignItems:"center",
              borderRadius: 10,
              backgroundColor:"#336899",
              borderColor: "#336899",
              borderWidth: 2,
              padding: 5,}}>
              <FontAwesomeIcon  style={styles.backEmp} size = {30} color = "white" icon = {faArrowLeftLong}></FontAwesomeIcon>
            </LinearGradient>
          </TouchableOpacity>

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
    width: "95%",
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
    marginVertical:30,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:'center',

},
savbtn: {
  backgroundColor: "#4687C2",
  padding: 5,
  width: 100,
  alignItems: 'center',
  justifyContent: "center",
  borderColor: "#336899",
  borderRadius: 5,
  borderWidth: 2,
  marginHorizontal: 15,
},
  backCont: {
    width: 60,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,

    
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
