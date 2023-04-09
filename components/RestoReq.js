import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, ScrollView, } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faArrowsLeftRightToLine, faBackward, faBackwardStep, faBiking, faCar, faCarAlt, faCarSide, faCheckSquare, faCircleCheck, faCircleDot, faDongSign, faDoorOpen, faMinus, faMinusCircle, faMobilePhone, faMotorcycle, faPeopleGroup, faPhone, faPhoneAlt, faPhoneFlip, faPlus, faShieldDog, faTruck, faTruckDroplet, faVanShuttle, faWheatAlt } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { Dropdown } from 'react-native-element-dropdown';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_API_KEY = "AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs";

const RestoReq = () => {
  const navigation = useNavigation()

  const [foodDetail, setfoodDetail] = useState({ contact: "" });
  const [feedcount, setfeedcount] = useState(0);
  const [Address, setAddress] = useState([]);
  const [isFocus, setIsFocus] = useState({ vehicle: false, city: false });
  const [prefVehicle, setpreVehicle] = useState("");
  const [Cities, setCityDetails] = useState([]);
  const [location, setLocation] = useState(null)
  const [userCredential, setuserCredential] = useState([]);


  const [errmsg, seterrormsg] = useState(null)

  function resetFunc() {
    setEmpdetail({});
  }
  const [vehicleOpt, setVehicleOpt] = useState({ type: ["Two Wheeler", "Car", "Van", "Truck"], icon: [faMotorcycle, faCarSide, faVanShuttle, faTruck], checked: 0 })
  const [donatTypOpt, setdonatTypOpt] = useState({ type: ["People", "Animal", "Agriculture"], icon: [faPeopleGroup, faShieldDog, faWheatAlt], checked: 0 })


  axios.defaults.baseURL = `http://192.168.31.203:8000`;

  const HandlePress = async () => {
    console.log("Hello" ,JSON.parse(userCredential).name)
    if (foodDetail.type == "" || JSON.parse(userCredential).name == "" || JSON.parse(userCredential)._id == ""
      || JSON.parse(userCredential).role == "" || feedcount == "" || prefVehicle == "" || foodDetail.city == ""
      || foodDetail.contact == "" || Address == [] || location == null
    ) {

      console.log(foodDetail.type, JSON.parse(userCredential).name, JSON.parse(userCredential)._id, JSON.parse(userCredential).role, feedcount,
        prefVehicle, foodDetail.city, foodDetail.contact, Address, location
      );
      alert("All Fields are Required !!!")
    } else if (foodDetail.contact.length != 10) {
      console.log(foodDetail.contact.length)
      alert("contact must be 10 digit !!!");
      setfoodDetail({ ...foodDetail, contact: "" })
    }
    else {
      const dataBody = { Type: foodDetail.type, Name: JSON.parse(userCredential).name, UserId: JSON.parse(userCredential)._id, Role: JSON.parse(userCredential).role, Feedcount: feedcount, Vehicle: prefVehicle, City: foodDetail.city, Contact: foodDetail.contact, Address: Address, Location: location }

      try {
        await axios.post(`/food`, dataBody)
          .then((res) => {
            if (res.status == 200) {
              alert(res.data.msg)
              navigation.navigate("RestoHome")
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
  const getLocationPermission = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    // if(status !== 'granted'){
    //   // alert("Permission to access location was denied");
    //   return;
    // }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log("Longitude", location)
    console.log("Latitude", location.coords.latitude)
  }


  const getCityName = async () => {
    axios.get(`http://192.168.31.203:8000/City`)
      .then((response) => {
        setCityDetails(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const getData = async () => {
    try {
      await AsyncStorage.getItem("UserLoginCredentials")
        .then(value => {
          if (value != null) {
            setuserCredential(value);

            console.log(value)
          }
        })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData()
    let foodtype = vehicleOpt.type[vehicleOpt.checked]
    let veh = donatTypOpt.type[donatTypOpt.checked]
    setfoodDetail({ ...foodDetail, type: foodtype })
    setpreVehicle(veh)

    getCityName();
    getLocationPermission();

    // geoCodeLocation();
    // ReversegeoCodeToLocation();

  }, [])
  return (

    <View style={styles.container}>
      <LinearGradient
        colors={["red", "tomato", '#cc0000']}
        style={styles.Title}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "600" }}>DONATE</Text>

      </LinearGradient>
      <View style={{ marginTop:10,height:60, width: "100%",position:"relative", zIndex: 100 }}>

        <GooglePlacesAutocomplete
          placeholder="Address"
          // currentLocation={true}
          onChangeText ={result=>console.log(result)}
          enablePoweredByContainer ={false}
          fetchDetails={true}
          query={{
            key: GOOGLE_API_KEY,
            language: 'en',
            components: "country:in",

          }}
          onPress={(data, details = null) => {
            setAddress(details)
            setLocation({latitude :details.geometry.location.lat,longitude :details.geometry.location.lng})

          }}
          textInputProps={{
            leftIcon: { type: 'font-awesome', name: 'chevron-left' },
            errorStyle: { color: 'red' },
          }}
          styles={{
            container: { flex: 0, position: "absolute", left: 10, right: 10, top: 0, zIndex: 10, margin: 5 },
            textInput: {
              paddingVertical:5,
              color: 'red',
              borderColor:"lightgray",
              borderWidth:1,
              fontSize: 18,
            },
            
          }
          }
        />
      </View>

      <ScrollView style={styles.Scrollcontainer}>

      <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>City</Text>
          <Dropdown
            style={[styles.dropdown, isFocus.city && { borderColor: 'royalblue' }]}
            placeholderStyle={[styles.placeholderStyle, { color: "#ff8080", }]}
            selectedTextStyle={[styles.selectedTextStyle, { color: "red", }]}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Cities}
            maxHeight={300}
            labelField="value"
            valueField="value"
            search={true}
            searchPlaceholder='Search'
            placeholder={!isFocus.city ? 'Select City' : '...'}
            value={foodDetail.city}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setfoodDetail({ ...foodDetail, city: item.value });
              setIsFocus({ ...isFocus, city: false });
            }}

          />

        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Donation Type</Text>
          <View style={[styles.subConBox, { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }]}>
            {
              donatTypOpt.type.map((val, inx) => {
                return (
                  <TouchableOpacity onPress={() => { setdonatTypOpt({ ...donatTypOpt, checked: inx }); setfoodDetail({ ...foodDetail, type: val }) }} key={inx} style={{ flexDirection: "row", margin: 10, alignItems: "center", width: "40%" }}>
                    <FontAwesomeIcon color={donatTypOpt.checked == inx ? "red" : "#ff8080"} size={18} icon={donatTypOpt.icon[inx]}></FontAwesomeIcon>
                    <Text style={{ marginLeft: 5, color: donatTypOpt.checked == inx ? "red" : "#ff8080", fontSize: 20, fontWeight: donatTypOpt.checked == inx ? "500" : "300" }}>{val}</Text>
                  </TouchableOpacity>
                )

              })
            }
          </View>
        </View>

        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>FeedCount</Text>
          <View style={[styles.subConBox, { paddingVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center" }]}>
            <TextInput inputMode="numeric" placeholder='0' style={{ width: "95%", textAlign: "center", marginHorizontal: 5, backgroundColor: "#ffcccc", fontSize: 15, paddingHorizontal: 5, borderRadius: 3, color: "#b30000", fontSize: 24, paddingVertical: 8 }} keyboardType='phone-pad' value={feedcount} onChangeText={(cnt) => { setfeedcount(cnt) }} ></TextInput>
          </View>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.subConTitle}>Suggested Vehicle Type</Text>
          <View style={[styles.subConBox, { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }]}>
            {
              vehicleOpt.type.map((val, inx) => {
                return (
                  <TouchableOpacity onPress={() => { setVehicleOpt({ ...vehicleOpt, checked: inx }); setpreVehicle(val) }} key={inx} style={{ flexDirection: "row", margin: 10, alignItems: "center", width: "40%" }}>
                    <FontAwesomeIcon color={vehicleOpt.checked == inx ? "red" : "#ff8080"} size={18} icon={vehicleOpt.icon[inx]}></FontAwesomeIcon>
                    <Text style={{ marginLeft: 5, color: vehicleOpt.checked == inx ? "red" : "#ff8080", fontSize: 20, fontWeight: vehicleOpt.checked == inx ? "500" : "300" }}>{val}</Text>

                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>



       
        <View style={[styles.subContainer, { marginTop: 20 }]}>
            <Text style={styles.subConTitle}>Mobile</Text>
            <View style={[styles.subConBox, { paddingVertical: 10, alignItems: "center", justifyContent: "center" }]}>
              <View style={{ width: "100%", paddingHorizontal: 5, flexDirection: 'row', backgroundColor: "#ffcccc", borderRadius: 3 }}>
                <Text style={{ textAlignVertical: "center", marginLeft: 6, marginRight: 8 }}><FontAwesomeIcon size={14} color="#8585e0" icon={faPhone}></FontAwesomeIcon></Text>
                <TextInput inputMode="numeric" style={{ width: "80%", marginRight: 5, backgroundColor: "#ffcccc", pasddingHorizontal: 10, borderRadius: 3, color: "red", fontSize: 20, paddingVertical: 5 }} keyboardType='phone-pad' value={foodDetail.contact} onChangeText={(cnt) => { setfoodDetail({ ...foodDetail, contact: cnt }) }} ></TextInput>
              </View>
            </View>
          </View>

       

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={HandlePress}>
            <LinearGradient
              colors={['#ff6666', '#ff6666', 'red']}
              style={styles.savbtn}>
              <Text style={{ color: "white" }} >Save Detail</Text>

            </LinearGradient>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate("RestoHome") }}>
            <LinearGradient
              colors={['#ff6666', '#ff6666', 'red']}
              style={styles.savbtn}>
              <Text style={{ color: "white" }} >Back</Text>

            </LinearGradient>

          </TouchableOpacity>
        </View>

      </ScrollView>

    </View>
  )
}
const styles = StyleSheet.create({

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 0,
  },
  Title: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,

  },
  Scrollcontainer: {
    marginBottom: 20,
    marginTop:20,
    width: "100%",
    flexGrow: 1,
    // backgroundColor: "#33cc33",

  },
  subContainer: {

    margin: 6,
    padding: 11

  }, subConTitle: {
    position: "absolute",
    top: 2,
    left: 20,
    backgroundColor: "white",
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
    width: "100%",
    padding: 8,
    width: 110,
    justifyContent: 'center',
    alignItems: "center",
    fontSize: 16,
    borderColor: "#ff6600",
    backgroundColor: "#ff6600",
    borderWidth: 2,
    borderRadius: 5,
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
    color: "#f2f2f2",
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

export default RestoReq;
