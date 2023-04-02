import React, { useState } from 'react'
import { TouchableOpacity ,View,Text,StyleSheet} from 'react-native'
import axios from 'axios'

const Home2 = () => {
  const [resData ,setResData] = useState([])

  axios.defaults.baseURL = `https://fwm-backend.onrender.com`;

  
  const HandlePress = ()=>{
    const url = `https://jsonplaceholder.typicode.com/posts`;
    axios.post(url)
    .then((res)=>{
      console.log(res)
      // setResData(res)

    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <View style = {styles.container}>
      <TouchableOpacity onPress = {HandlePress}>
        <Text>Fetch</Text>
      </TouchableOpacity>
      <View style = {styles.cardContainer}>

      </View>
    </View>
  )
}
const styles =  StyleSheet.create({
  container:{
    flex:1,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  cardContainer:{
    flex:1,
    width:"100%",
    justifyContent:"center",
    alignItems:"center",

  }
})

export default Home2