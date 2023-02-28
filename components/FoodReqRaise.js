import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, ScrollView, } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faArrowsLeftRightToLine, faBackward, faBiking, faCar, faCarAlt, faCarSide, faCheckSquare, faCircleCheck, faCircleDot, faDongSign, faMinus, faMinusCircle, faMotorcycle, faPeopleGroup, faPlus, faShieldDog, faTruck, faTruckDroplet, faVanShuttle, faWheatAlt } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { Dropdown } from 'react-native-element-dropdown';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FoodReqRaise = ({ navigation }) => {
  
  const [foodDetail, setfoodDetail] = useState({});
  const [feedcount, setfeedcount] = useState(0);
  const [Address, setAddress] = useState("");
  const [isFocus, setIsFocus] = useState({vehicle:false,city:false});
  const [prefVehicle, setpreVehicle] = useState("");
  const [city, setCity] = useState([]);
  const [location,setLocation] = useState(null)
  const [userCredential,setuserCredential] = useState({});


  const [errmsg, seterrormsg] = useState(null)

  function resetFunc() {
    setEmpdetail({});
  }

  const vehicleType = [
    { label: "Two Wheeler", value: "Two Wheeler" },
    { label: "Car", value: "Car" },
    { label: "Van", value: "Van" },
    { label: "Truck", value: "Truck" }

  ]
  const [vehicleOpt ,setVehicleOpt] = useState({type:["Two Wheeler","Car","Van","Truck"],icon:[faMotorcycle,faCarSide,faVanShuttle,faTruck],checked :0})
  const [donatTypOpt ,setdonatTypOpt] = useState({type:["People","Animal" ,"Agriculture"],icon:[faPeopleGroup,faShieldDog,faWheatAlt],checked :0})



  const url = `http://192.168.31.203:8000/food`;
  const HandlePress = async () => {

    if (foodDetail.type == "" || feedcount == "" ||prefVehicle == "" ,city =="" ||Address == "" || location == null) {
      alert("All Fields are Required !!!")
    } else {
      const body = {type : foodDetail.type , feedcount : feedcount ,vehicle :prefVehicle,city :city,address:Address,location:location}
      try {
        console.log(foodDetail)
        await axios.post(url, body)
          .then((res) => {
            if (res.status == 200) {
              alert("Req Raise Sucessfull !!!")
              navigation.push("Home")
              // setEmpdetail({ EmpId: "", Name: "", Contact: "" });

            } else {
              seterrormsg(res.data.error);
              alert(errmsg);

            }
          })
      } catch (err) {
        console.log("Failed To add Data : ", err)
      }
    }
  }

  // const [mapLocCords,setmapLocCords] = useState({
  //   pickupLocationCord:{
  //     longitude:72.842230,
  //     latitude:19.075380 ,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,

  //   },
  //   droplocationCord:{
  //     longitude:30.708,
  //     latitude:76.7179,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   }
  // })

  const getLocationPermission = async ()=>{
    let status =  await Location.requestForegroundPermissionsAsync();
    // if(status !== 'granted'){
    //   // alert("Permission to access location was denied");
    //   return;
    // }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log("Longitude",location.coords.longitude)
    console.log("Latitude",location.coords.latitude)
  }

  // const geoCodeLocation = async ()=>{
  //   let geoCodeAdd = await Location.geocodeAsync("Mumbai");
  //   console.log("myAdd",geoCodeAdd);

  // }
  // const ReversegeoCodeToLocation = async ()=>{
  //   let longLatPara = {longitude:location.coords.longitude,latitude:location.coords.latitude}
  //   let geoCodeAdd = await Location.reverseGeocodeAsync(longLatPara);
  //   console.log(geoCodeAdd);

  // }
  useEffect(()=>{
    getLocationPermission();
    // geoCodeLocation();
    // ReversegeoCodeToLocation();
  },[])
  AsyncStorage.getItem("UserLoginCredentials").then((result)=>{setuserCredential(result)}).catch((err) =>{console.log(err)})
  console.log(userCredential)
  return (
  //   <View style = {{flex:1}}>
  //       <MapView
  //       style = {StyleSheet.absoluteFill}
  //       initialRegion={{
  //         longitude:location != null?location.coords.longitude:72.842230,
  //         latitude:location != null ? location.coords.latitude:19.075380,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       }}
  //       >
  //         <Marker
  //       coordinate={mapLocCords.pickupLocationCord}
  //       // image={{uri: 'custom_pin'}}
  //     />
  //     <MapViewDirections
  //   origin={mapLocCords.pickupLocationCord}
  //   destination={mapLocCords.droplocationCord}
  //   // apikey={GOOGLE_MAPS_APIKEY}
  //   strokeWidth={3}
  //   strokeColor="hotpink"
  // />
  //     </MapView>
  //     </View>

      
    <View style={styles.container}>
      <ScrollView style={styles.Scrollcontainer}>
        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Donation Type</Text>
          <View style={[styles.subConBox, { flexDirection:"row" ,flexWrap:"wrap",alignItems: "center", justifyContent: "space-between"}]}>
          {
            donatTypOpt.type.map(( val ,inx)=>{
              return (
                <TouchableOpacity onPress={()=>{setdonatTypOpt({...donatTypOpt,checked:inx});setfoodDetail({...foodDetail,type:val})} } key = {inx} style = {{flexDirection:"row",margin:10,alignItems:"center",width:"40%"}}>
                  <FontAwesomeIcon color = {donatTypOpt.checked == inx ? "#9900ff":"#8585e0"}size={18} icon = {donatTypOpt.icon[inx]}></FontAwesomeIcon>
                  <Text style = {{marginLeft:5, color:donatTypOpt.checked == inx ? "#9900ff":"#8585e0" ,fontSize:20,fontWeight:"400"}}>{val}</Text>
                </TouchableOpacity>
              )

            })
          }
          </View>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>FeedCount</Text>
          <View style={[styles.subConBox, { paddingVertical:10,flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            {/* <TouchableOpacity onPress={() => { setfeedcount(feedcount - 1) }}><Text style={{ backgroundColor: "royalblue", padding: 7 }}><FontAwesomeIcon color="white" icon={faMinus}></FontAwesomeIcon></Text></TouchableOpacity> */}
            <TextInput inputMode="numeric" style={{width:"95%", textAlign: "center", marginHorizontal: 5, backgroundColor: "#ffe6ff", fontSize: 15, paddingHorizontal: 5, borderRadius: 3, color: "#9900ff", fontSize: 24, paddingVertical: 8 }} keyboardType='phone-pad' value={feedcount} onChange={(cnt) => { if (feedcount <= 0) { setfeedcount(0) } else { setfeedcount(cnt); } }}></TextInput>
            {/* <TouchableOpacity onPress={() => { setfeedcount(feedcount + 1) }}><Text style={{ backgroundColor: "royalblue", padding: 7 }}><FontAwesomeIcon color="white" icon={faPlus}></FontAwesomeIcon></Text></TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Suggested Vehicle Type</Text>
          <View style={[styles.subConBox, { flexDirection:"row" ,flexWrap:"wrap",alignItems: "center", justifyContent: "center"}]}>
          {
            vehicleOpt.type.map(( val ,inx)=>{
              return (
                <TouchableOpacity onPress={()=>{setVehicleOpt({...vehicleOpt,checked:inx});setpreVehicle(val)} } key = {inx} style = {{flexDirection:"row",margin:10,alignItems:"center",width:"40%"}}>
                  <FontAwesomeIcon color = {vehicleOpt.checked == inx ? "#9900ff":"#08585e0"}size={18} icon = {vehicleOpt.icon[inx]}></FontAwesomeIcon>
                  <Text style = {{marginLeft:5, color:vehicleOpt.checked == inx ? "#9900ff":"#8585e0" ,fontSize:20,fontWeight:"400"}}>{val}</Text>
                </TouchableOpacity>
              )
            })
          }
          </View>
        </View>

        
        
        {/* <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Suggested Vehicle Type </Text>

          <Dropdown
            style={[styles.dropdown, isFocus.vehicle && { borderColor: 'royalblue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={vehicleType}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus.vehicle ? 'Select Vehicle' : '...'}
            value={prefVehicle}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setpreVehicle(item.value);
              setIsFocus({...isFocus,vehicle:false});
            }}
          />

        </View> */}

        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>City</Text>
          <Dropdown
            style={[styles.dropdown, isFocus.city && { borderColor: 'royalblue' }]}
            placeholderStyle={[styles.placeholderStyle,{color:"royalblue",}]}
            selectedTextStyle={[styles.selectedTextStyle,{color:"#9900ff",}]}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={vehicleType}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus.city ? 'Select City' : '...'}
            value={foodDetail.City}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setfoodDetail({...foodDetail,City:item.value});
              setIsFocus({...isFocus,city:false});
            }}
            
          />

        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Address</Text>
          <View style={[styles.subConBox, { flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
          <TextInput multiline numberOfLines={3} style={{backgroundColor:"#ffe6ff",width:"100%",borderRadius:3,textAlignVertical:"top",padding:6,fontSize:18,color:"royalblue"}} value = {Address} onChange = {(add)=>{setAddress(add)}}></TextInput>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={HandlePress}><Text style={styles.savbtn} >Save Detail</Text></TouchableOpacity>
          {/* <TouchableOpacity onPress={resetFunc}><Text style = {styles.savbtn}>Reset</Text></TouchableOpacity> */}
        </View>

      </ScrollView>
      <TouchableOpacity style={styles.backCont} onPress={() => { navigation.push("Home") }}><FontAwesomeIcon style={styles.backEmp} size={20} color="white" icon={faArrowLeftLong}></FontAwesomeIcon></TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#e0b3ff",
    alignItems: "center",
    paddingTop: 30,
  },
  Scrollcontainer: {
    marginVertical:20,
    width: "100%",
    flexGrow: 1,
    backgroundColor: "#e0bfff",

  },
  subContainer: {

    margin: 6,
    padding: 11

  }, subConTitle: {
    position: "absolute",
    top: 2,
    left: 20,
    backgroundColor: "#e0bfff",
    zIndex: 5,
    paddingHorizontal: 3,
    color: "gray",
    fontWeight: "600",

  }, subConBox: {
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
  },

  btnContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'

  },
  savbtn: {
    backgroundColor: "#9900ff",
    padding: 8,
    width: 110,
    color: "white",
    textAlign: 'center',
    fontSize: 16,
    borderColor: "lightgray",
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 15,
  },
  backCont: {
    width: 45,
    height: 35,
    position: "absolute",
    bottom: 20,
    right: 20,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9900ff",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 3,
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

  dropcontainer: {
    backgroundColor: 'azure',
    paddingVertical: 16,
    width: 250,
  },
  dropdown: {
    // backgroundColor: 'white',

    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    color: "gray",
    backgroundColor: 'white',
    left: 5,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default FoodReqRaise;
