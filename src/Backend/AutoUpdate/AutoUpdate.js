import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Utils/Firebase';
import { useGlobalContext } from '../../Function/Context';
import { StatusBar } from "expo-status-bar";


const AutoUpdatee = () => {

    const {AutoUpdateState} = useGlobalContext()


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeHeader}>
        <View style={styles.headerTitleDiv}>
          <Text style={styles.headerTitle}>
            Engine<Text style={styles.headerTitleScore}>Scores</Text>
          </Text>
        </View>
      </View>

      <View>
        <Text>New Update Available</Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            paddingVertical: 18,
            backgroundColor: "#ff2782",
            flexDirection: "row",
            flex: 1,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
          onPress={() => {
            Linking.openURL(AutoUpdateState?.link);
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Click to Download
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AutoUpdatee

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeff2",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    alignItems: "center",
    justifyContent: "center",
  },

  homeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },

  headerTitle: {
    fontSize: 36,
    fontWeight: "400",
  },

  headerTitleScore: {
    color: "#ff2782",
    fontWeight: "500",
  },
});