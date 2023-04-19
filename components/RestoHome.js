import {
  faBowlFood,
  faDonate,
  faDoorOpen,
  faHistory,
  faMapLocation,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CredentialContext } from "../components/CredentialContext";
import { LinearGradient } from "expo-linear-gradient";

export default function RestoHome() {
  const navigation = useNavigation();
  const contextCall = useContext(CredentialContext);
  const [userCredential, setuserCredential] = useState([]);

  const getData = async () => {
    try {
      await AsyncStorage.getItem("UserLoginCredentials").then((value) => {
        if (value != null) {
          var datavalue = JSON.parse(value);
          setuserCredential(datavalue);
          console.log("Credential", value);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  function HandleLogOut() {
    AsyncStorage.removeItem("UserLoginCredentials")
      .then(() => {
        contextCall.setstoredCredential(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      {/* <View style={styles.upper}> */}
      <LinearGradient
        colors={["#004d99", "#2597f4", "#004d99"]}
        style={styles.upper}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient
            colors={["#004d99", "#2597f4", "#004d99"]}
            style={[styles.logo, styles.shadow]}
          >
            <Image style={styles.limg} source={require("../assets/Man.png")} />
          </LinearGradient>
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.line}>"Can you imagine </Text>
            <Text style={styles.line}>a world without hunger?"</Text>
          </View>
        </View>
        <View>
          <Text style={styles.wlc}>WELCOME</Text>
        </View>
        <View>
          <Text style={styles.txt}>{userCredential.name}</Text>
        </View>
      </LinearGradient>
      {/* </View> */}

      <View style={styles.lowerbtns}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RestoReq");
            }}
            style={[styles.donationbtn, styles.shadow]}
          >
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={["tomato", "#e60000"]}
              style={{
                width: "100%",
                height: "100%",
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <FontAwesomeIcon
                color="white"
                size={40}
                icon={faBowlFood}
              ></FontAwesomeIcon>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>Donate</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RestoMap");
            }}
            style={[styles.donationbtn, styles.shadow]}
          >
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={["tomato", "#e60000"]}
              style={{
                width: "100%",
                height: "100%",
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <FontAwesomeIcon
                color="white"
                size={40}
                icon={faMapLocationDot}
              ></FontAwesomeIcon>
            </LinearGradient>
          </TouchableOpacity>
          <View>
            <Text style={styles.lowertxt}>Current</Text>
            <Text style={[styles.lowertxt, { marginTop: 0 }]}>Location</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RestoHistory");
            }}
            style={[styles.donationbtn, styles.shadow]}
          >
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={["tomato", "#e60000"]}
              style={{
                width: "100%",
                height: "100%",
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <FontAwesomeIcon
                color="white"
                size={40}
                icon={faHistory}
              ></FontAwesomeIcon>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>History</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={HandleLogOut}
            style={[styles.donationbtn, styles.shadow]}
          >
            {/* <Image style={styles.lowerimg} source={require('../assets/icon.png')} /> */}
            <LinearGradient
              colors={["tomato", "#e60000"]}
              style={{
                width: "100%",
                height: "100%",
                padding: 15,
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <FontAwesomeIcon
                color="white"
                size={40}
                icon={faDoorOpen}
              ></FontAwesomeIcon>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={styles.lowertxt}>Logout</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {
              navigation.navigate("NGOS");
            }}>
      <LinearGradient
        colors={["#e65c00", "#ffa366", "#ffad33"]}
        style={[styles.loweroptions, styles.shadow]}
      >
        <View style={[styles.opbtn]}>
          <Image style={styles.opimg} source={require("../assets/ngolg.png")} />
        </View>
        <Text style={styles.optxt}>NGO's</Text>
      </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
              navigation.navigate("Profile");
            }}>
      <LinearGradient
        colors={["#e65c00", "#ffa366", "#ffad33"]}
        style={[styles.loweroptions, styles.shadow]}
      >
        <View style={[styles.opbtn]}>
          <Image
            style={styles.opimg}
            source={require("../assets/profile.png")}
          />
        </View>
        <Text style={styles.optxt}>Update profile</Text>
      </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  upper: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 135,
    height: 135,
    backgroundColor: "white",
    borderRadius: 100,
    marginBottom: 23,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 3,
  },
  limg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  wlc: {
    fontWeight: "bold",
    fontSize: 18,
  },
  txt: {
    fontWeight: "bold",
    color: "white",
    fontSize: 23,
  },
  line: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },

  lowerbtns: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: 15,
  },
  donationbtn: {
    width: 100,
    height: 100,
    marginHorizontal: 30,
    backgroundColor: "chocolate",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "tomato",
    borderWidth: 2,
  },
  lowertxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  lowerimg: {
    width: 30,
    height: 30,
  },
  loweroptions: {
    width: 250,
    height: 80,
    backgroundColor: "tomato",
    marginTop: 20,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    borderColor: "#ff6600",
    borderWidth: 2,
  },
  opbtn: {
    width: 60,
    height: 60,
    // backgroundColor: '#99ffeb',
    marginLeft: 20,
    borderRadius: 10,
  },
  opimg: {
    width: 60,
    height: 60,
  },
  optxt: {
    fontWeight: "600",
    fontSize: 22,
    color: "white",
    marginRight: 30,
    marginTop:10,
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
