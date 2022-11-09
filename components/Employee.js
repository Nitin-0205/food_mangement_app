import { View, Text, TouchableOpacity ,StyleSheet, ScrollView, Image} from 'react-native'
import React from 'react'
import newEmp from "../assets/newEmp.png";



const Employee = ({navigation}) => {
  const HandlePress = ()=>{
    navigation.push("AddEmp")

  }
  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.butCont}>
        <View style = {styles.EmpBox}>
        <Text><Text style = {{color:"blue"}}>Employee ID:</Text></Text>
          <Text><Text style = {{color:"blue"}}>Name:</Text></Text>
          <Text><Text style = {{color:"blue"}}>Contact:</Text></Text>
        </View>

        <View style = {styles.EmpBox}>
        <Text><Text style = {{color:"blue"}}>Employee ID:</Text></Text>
          <Text><Text style = {{color:"blue"}}>Name:</Text></Text>
          <Text><Text style = {{color:"blue"}}>Contact:</Text></Text>
        </View>

        <View style = {styles.EmpBox}>
        <Text><Text style = {{color:"blue"}}>Employee ID:</Text></Text>
          <Text><Text style = {{color:"blue"}}>Name:</Text></Text>
          <Text><Text style = {{color:"blue"}}>Contact:</Text></Text>
        </View>
      </ScrollView>
      <TouchableOpacity style = {styles.addEmpCont} onPress={HandlePress}><Image source = {newEmp} style = {styles.addEmp}></Image></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  EmpBox:{
    width:"98%",
    alignSelf:"center",
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor:"azure",
    borderBottomColor:"lightgray",
    borderBottomWidth:3,
  },
  addEmpCont:{width:60,
    height:60,
    position:"absolute",
    bottom:20,
    right:20,
    backgroundColor:"royalblue",
    borderRadius:30,
    borderColor:"royalblue",
    borderWidth:1,
    padding:5,
  },
  addEmp:{
    width:"100%",
    height:"100%",
  }
})

export default Employee;
