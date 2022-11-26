import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";


const Header = ({navigation, functions, imgtype}) => {
  return (
   <View style={styles.homeHeader}>
        <TouchableOpacity onPress={functions ? functions :() =>{
          navigation.toggleDrawer();
        }} style={styles.profilePic}>
        <Image
            source={imgtype ?  imgtype:  require("../../../../assets/menu.png")}
            resizeMode="cover"
            style={{ height: 20, width: 20,  }}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleDiv}>
       <Text style={styles.headerTitle}>Engine <Text style={styles.headerTitleScore} >Scores</Text></Text>
        </View>
        <View style={styles.profilePic}>
        {/* <Image
            source={require("../../../../assets/pro.jpg")}
            resizeMode="cover"
            style={{ height: 30, width: 30, borderRadius: 50 }}
          /> */}
        </View>
      </View>
  );
};

export default Header;

const styles = StyleSheet.create({

  homeHeader :{
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center'
  },

  headerTitle :{
fontSize:26,
fontWeight: '400'

  },


  headerTitleScore: {
    color:'#ff2782'
    , fontWeight:'500'
  }
});
