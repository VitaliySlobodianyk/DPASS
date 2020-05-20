
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Icon from 'react-native-vector-icons/Fontisto';

const Header = ({title}) => {
return (
<View style= {styles.header}>
 <View> 
   <Icon name ="metro" size={35} color="#FFFFFF"></Icon>
 </View>
  <Text style={styles.font}>
        {title}
  </Text>
</View>
);

};

const styles = StyleSheet.create({
 header:{
    marginTop:5,
     height: 45,
     display: 'flex',
     justifyContent: "center",
     alignItems: 'center',
     flexDirection: "row"
 },
    font:{
     color: "#FFFFFF",
     fontSize: RFValue(25),
     textAlign: "center",
     fontWeight: "bold",
      paddingLeft: 5
 }
});

export default Header;
