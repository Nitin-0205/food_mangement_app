import { faBowlFood, faDonate, faDoorOpen, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CredentialContext } from '../components/CredentialContext'
import { LinearGradient } from 'expo-linear-gradient';


export default function RestoHome() {
  const navigation = useNavigation()
  const contextCall = useContext(CredentialContext);

  function HandleLogOut() {
    AsyncStorage.removeItem("UserLoginCredentials")
      .then(() => {
        contextCall.setstoredCredential(null);
      })
      .catch((err) => {
        console.log(err);

      })
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.upper}> */}
        
        <LinearGradient
              colors={['#E57373','#EF9A9A','#B71C1C']}
              style={styles.upper}>
                <LinearGradient
              colors={['#E57373','#EF9A9A','#B71C1C']}
              style={[styles.logo, styles.shadow]}>
          <Image style={styles.limg} source={require('../assets/Man.png')} />
          </LinearGradient>
        <View><Text style={styles.wlc}>Welcome</Text></View>
        <View><Text style={styles.txt}>DONATION MAN</Text></View>
        <View><Text style={styles.line}>Help End World Hunger</Text></View>
            </LinearGradient>
      {/* </View> */}

      <View style={styles.lowerbtns}>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate("RestoReq") }} style={[styles.donationbtn, styles.shadow]}>
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={['tomato','red']}
              style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
              <FontAwesomeIcon color="white" size={30} icon={faBowlFood}></FontAwesomeIcon>

            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>Donate</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate("RestoMap") }} style={[styles.donationbtn, styles.shadow]}>
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={['tomato','red']}
              style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
              <FontAwesomeIcon color="white" size={30} icon={faBowlFood}></FontAwesomeIcon>

            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>Current</Text>
          <Text style={[styles.lowertxt,{marginTop:0}]}>Location</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => { navigation.navigate("RestoHistory") }} style={[styles.donationbtn, styles.shadow]}>
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={['tomato','red']}
              style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            <FontAwesomeIcon color="white" size={30} icon={faHistory}></FontAwesomeIcon>

            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>History</Text>
        </View>
        <View>
          <TouchableOpacity onPress={HandleLogOut} style={[styles.donationbtn, styles.shadow]}>
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={['tomato','red']}
              style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            <FontAwesomeIcon color="white" size={30} icon={faDoorOpen}></FontAwesomeIcon>

            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>Logout</Text>
        </View>

      </View>

      <LinearGradient
        colors={['#e65c00','#ffa366','#ffad33']}
       style={[styles.loweroptions, styles.shadow]}>
        <View style={[styles.opbtn]}>
          <Image style={styles.opimg} source={require('../assets/icon.png')} />
        </View>
        <Text style={styles.optxt}>Donation History</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#e65c00','#ffa366','#ffad33']}
       style={[styles.loweroptions, styles.shadow]}>
        <View style={[styles.opbtn]}>
          <Image style={styles.opimg} source={require('../assets/icon.png')} />
        </View>
        <Text style={styles.optxt}>Update profile</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#e65c00','#ffa366','#ffad33']}
       style={[styles.loweroptions, styles.shadow]}>
        <View style={[styles.opbtn]}>
          <Image style={styles.opimg} source={require('../assets/icon.png')} />
        </View>
        <Text style={styles.optxt}>Current Location</Text>
      </LinearGradient>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  upper: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 135,
    height: 135,
    backgroundColor: 'white',
    borderRadius: 100,
    marginBottom: 23,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 3

  },
  limg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,

  },
  wlc: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 21
  },
  line: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white'
  },

  lowerbtns: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    justifyContent: "space-evenly",
    paddingTop: 15
  },
  donationbtn: {
    width: 55,
    height: 55,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  }
  ,
  lowertxt: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    textAlign:"center",

  },
  lowerimg: {
    width: 30,
    height: 30,

  },
  loweroptions: {
    width: 310,
    height: 80,
    backgroundColor: "tomato",
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    
    borderColor:"#ff6600",
    borderWidth:2
  },
  opbtn: {
    width: 45,
    height: 45,
    // backgroundColor: '#99ffeb',
    marginLeft: 20,
    borderRadius: 10,
  },
  opimg: {
    width: 30,
    height: 30,
    marginLeft: 6,
    marginTop: 7
  },
  optxt: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 30
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.45,
    elevation: 3,

  },
});