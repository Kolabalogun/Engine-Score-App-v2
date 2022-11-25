import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from 'react'
import { useGlobalContext } from '../../../Function/Context';

const Nav = () => {
     const {
       competitionF,
       competition,
       
       
       competitionTypeF,
     } = useGlobalContext();
  return (
    <View style={styles.navMenu}>
      <TouchableOpacity
        onPress={() => {
          competitionF(4);
          competitionTypeF("Engine 4.0");
        }}
        style={{
          backgroundColor: competition === 4 ? "#ff2782" : "#fff",
          paddingHorizontal: 10,
          paddingVertical: 15,
          flex: 1,
          marginHorizontal: 5,
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: competition === 4 ? "#fff" : "#ff2782",
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Engine 4.0
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          competitionF(3);
          competitionTypeF("Engine 3.0");
        }}
        style={{
          backgroundColor: competition === 3 ? "#ff2782" : "#fff",
          paddingHorizontal: 10,
          paddingVertical: 15,
          flex: 1,
          marginHorizontal: 5,
          alignItems: "center",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: competition === 3 ? "#fff" : "#ff2782",
            fontWeight: "500",
            fontSize: 15,
          }}
        >
          Engine 3.0
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Nav

const styles = StyleSheet.create({
  navMenu: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});