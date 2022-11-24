import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InternetChecker = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>You have no Internet Connection</Text>
    </View>
  )
}

export default InternetChecker

const styles = StyleSheet.create({
      container: {
      height: 30,
    
        backgroundColor: "red",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems:'center'
      },
})