import React from 'react'
import { View, StyleSheet,ActivityIndicator} from 'react-native'

const Loading = (props) => {
  return (
    <View style={{flexGrow:1,fontSize:30,justifyContent:"center",alignItems:"center"}}>

          <ActivityIndicator
            visible={props.loading}
            size = {50}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          </View>
  )
}
const styles = StyleSheet.create({
    spinnerTextStyle: {
      flex:1,
      justifyContent:"center",
      color: 'royalblue',
    },
})

export default Loading;