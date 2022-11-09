import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Button, } from 'react-native'
import React from 'react'
import employee from "../assets/employee.png"
const AddEmp = ({navigation}) => {

  const HandlePress = ()=>{
    navigation.push("Employees")

  }
  return (
    <View style={styles.container}>
      <Image source={employee} style={styles.image}></Image>
      <View style={styles.butCont}>
        <TextInput style={styles.field} placeholder="Employee Id"></TextInput>
        <TextInput style={styles.field} placeholder="Name"></TextInput>
        <TextInput style={styles.field} placeholder="Contact"></TextInput>

      </View>
      <Button style = {styles.fltr} title = "Save Detail" onPress={HandlePress}></Button>
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
  image: {
    marginVertical: 30,
  },
  butCont: {
    marginTop: 20,
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
    borderBottomColor:"gray",
    borderBottomWidth:3,
  },
  fltr:{
    marginTop:20,
    width:300,
    paddingHorizontal:50,
  },
})

export default AddEmp;
