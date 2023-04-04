import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faCity, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { Dropdown } from 'react-native-element-dropdown';
import { LinearGradient } from 'expo-linear-gradient';




function Signup() {
  const navigation = useNavigation()

  const [detail, setDetail] = useState({ contact: "" });
  const [cityChoose, setCity] = useState(undefined);
  const [roleChoose, setRole] = useState(undefined);
  const [passVisible, setpassVisible] = useState(true);
  const [conpassVisible, setconpassVisible] = useState(true);

  // const [Role, setAvailableRoles] = useState([]);
  const [Cities, setCityDetails] = useState([]);


  const [isFocus, setIsFocus] = useState(false);
  const [isroleFocus, setIsRoleFocus] = useState(false);


  // const [value, setValue] = useState(null);

  const renderLabel = (val) => {
    if (Cities || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'royalblue' }]}>
          {val}
        </Text>
      );
    }
    return null;
  };


  const Role = [
    { label: 'NGO', value: 'NGO' },
    { label: 'Restaurents/ Others', value: 'OTH' },
  ];


  // const InsertCity = () => {
  //   cit = []
  //   var index = 1;
  //   cit.map((cityName) => {
  //     const detailBody = {
  //       key: index,
  //       value: cityName,
  //     }
  //     axios.post(`/AddCity`, detailBody)
  //       .then((res) => {
  //         console.log(res.data)
  //       })
  //     index = index + 1;

  //   })
  // }
  axios.defaults.baseURL = `https://fwm-backend.onrender.com`;

  useEffect(() => {
    axios.get(`/City`)
      .then((response) => {
        setCityDetails(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const handleSubmit = async () => {
    const URL = `/signup`;
    if (detail.email == "" || detail.name == "" || detail.contact == "" || detail.address == "") {
      alert("All fields are required !!!");
    } else if (roleChoose == undefined ||
      cityChoose == undefined) {
      if (roleChoose == undefined) {
        alert("Please Select Role !!!")
      } else {
        alert("Please Select City !!!")
      }
    } else {
      if (detail.password !== detail.conPassword) {
        alert("Password Must be Same !!!");
      } else if (detail.password.length < 8) {
        alert("Password must atleast 8 digit !!!")
      } else {
        const signUpbody = {
          email: detail.email,
          name: detail.name,
          contact: detail.contact,
          role: roleChoose,
          city: cityChoose,
          address: detail.address,
          password: detail.password,

        }
        console.log(signUpbody)
        await axios.post(URL, signUpbody)
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              setRole(undefined);
              setCity(undefined);
              setDetail({ contact: "" });
              navigation.navigate("Login")
            } else {
              setDetail({ ...detail, email: "" });
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }


  return (
    <View style={styles.container} >
      <Text style={styles.logTitle}>Sign Up</Text>
    
      <ScrollView contentContainerStyle={styles.scroolCon} keyboardShouldPersistTaps={'handled'}>

        <View>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput style={styles.fields} placeholder="" value={detail.email} onChangeText={(txt) => { setDetail({ ...detail, email: txt }) }}></TextInput>

        </View>
        <View>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput style={styles.fields} placeholder="" value={detail.name} onChangeText={(txt) => { setDetail({ ...detail, name: txt }) }}></TextInput>

        </View>

        <View style={styles.dropcontainer}>
          {renderLabel("Role")}
          <Dropdown
            style={[styles.dropdown, isroleFocus && { borderColor: 'royalblue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Role}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isroleFocus ? 'Select Role' : '...'}
            searchPlaceholder="Search..."
            value={roleChoose}
            onFocus={() => setIsRoleFocus(true)}
            onBlur={() => setIsRoleFocus(false)}
            onChange={item => {
              setRole(item.value);
              console.log(roleChoose)
              setIsRoleFocus(false);
            }}
            renderLeftIcon={() => (
              <FontAwesomeIcon style={styles.icon} icon={faIdCard} size={12} color={isroleFocus ? 'royalblue' : 'black'} />
            )}
          />
        </View>
        <View>
          <Text style={styles.fieldLabel} >Contact</Text>
          <TextInput keyboardType='phone-pad' style={styles.fields} placeholder="" value={detail.contact} onChangeText={(txt) => { if (detail.contact.length < 10) { setDetail({ ...detail, contact: txt }) } }}></TextInput>

        </View>

        {/* <SelectList

          onSelect={() => { console.log(cityChoose) }}
          setSelected={(val) => { setCity(val) }}
          // fontFamily='lato'
          arrowicon={<FontAwesomeIcon icon={faCity} size={12} color={'black'} />}
          // searchicon={<FontAwesomeIcon name="search" size={12} color={'black'} />} 
          search={true}
          boxStyles={[styles.fields, { marginBottom: 20 }]} //override default styles
          defaultOption={Cities[0]}
          checkBoxStyles={{ color: "green", backgroundColor: "red" }}
          placeholder="City"
          maxHeight={200}
          maxWidth = {250}
          data={Cities} /> */}

        <View style={styles.dropcontainer}>
          {renderLabel("City")}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'royalblue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={Cities}
            search
            maxHeight={300}
            labelField="value"
            valueField="value"
            placeholder={!isFocus ? 'Select City' : '...'}
            searchPlaceholder="Search..."
            value={cityChoose}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCity(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <FontAwesomeIcon style={styles.icon} icon={faCity} size={12} color={isFocus ? 'royalblue' : 'black'} />
            )}
          />
        </View>

        <View style ={{width:"80%"}}>
        
        </View>
    
        <View>
          <Text style={styles.fieldLabel}>Address</Text>
          <TextInput style={[styles.fields, { textAlignVertical: "top", maxHeight: 120 }]} multiline={true} numberOfLines={3} placeholder="" value={detail.address} onChangeText={(txt) => { setDetail({ ...detail, address: txt }) }}></TextInput>

        </View>
        <View>
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={{ marginBottom: 25, flexDirection: "row", height: 48, backgroundColor: "white", width: 250, borderColor: "lightgray", borderWidth: 2, borderRadius: 5 }}>
            <TextInput style={{ padding: 8, fontSize: 17, flexGrow: 1, backgroundColor: "white", borderRadius: 5 }} placeholder="" secureTextEntry={passVisible} value={detail.password} onChangeText={(txt) => { setDetail({ ...detail, password: txt }) }}></TextInput>
            <TouchableOpacity onPress={() => { setpassVisible(!passVisible) }} style={{ width: 35, height: "100%", justifyContent: "center", alignItems: "center" }}><FontAwesomeIcon color="gray" size={16} icon={passVisible ? faEyeSlash:faEye}></FontAwesomeIcon></TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Confirm Password</Text>
          <View style={{ marginBottom: 25, flexDirection: "row", height: 48, backgroundColor: "white", width: 250, borderColor: "lightgray", borderWidth: 2, borderRadius: 5 }}>
            <TextInput style={{ padding: 8, fontSize: 17, flexGrow: 1, backgroundColor: "white", borderRadius: 5 }} placeholder="" secureTextEntry={conpassVisible} value={detail.conPassword} onChangeText={(txt) => { setDetail({ ...detail, conPassword: txt }) }}></TextInput>
            <TouchableOpacity onPress={() => { setconpassVisible(!conpassVisible) }} style={{ width: 35, height: "100%", justifyContent: "center", alignItems: "center" }}><FontAwesomeIcon color="gray" size={16} icon={conpassVisible ?  faEyeSlash:faEye}></FontAwesomeIcon></TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleSubmit}>
            <LinearGradient
              colors={["#4687C2", "#79a7d2"]}
              style={styles.subBtn}>
              <Text style={{ fontSize: 18, color: "white" }}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setDetail({ contact: "" }) }}>
            <LinearGradient
              colors={["#4687C2", "#79a7d2"]}
              style={styles.subBtn}>
              <Text style={{ fontSize: 18, color: "white" }}>Reset</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
        <TouchableOpacity onPress={() => { navigation.navigate("Login") }} ><Text style={{ fontWeight: "600", color: "tomato", wordSpacing: 2 }}>Back To Login !</Text></TouchableOpacity>


      </ScrollView>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flexGrow: 1,
    backgroundColor: "azure",
    justifyContent: "center",

  },
  scroolCon: {
    flexGrow: 1,
    width: "100%",
    // backgroundColor: "azure",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,


  },
  logContainer: {
    marginTop: 250,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D6E1FC",
  },
  logTitle: {
    color: "tomato",
    letterSpacing: 1,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  fieldLabel: {
    color: "gray",
    letterSpacing: 1,
    marginBottom: 2
  },
  fields: {
    fontSize: 15,
    width: 250,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: "lightgray",
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  btnContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'

  },
  subBtn: {
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
  dropcontainer: {
    backgroundColor: 'azure',
    paddingVertical: 16,
    width: 250,
  },
  dropdown: {
    backgroundColor: 'white',

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
export default Signup