/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
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
import { RFValue } from "react-native-responsive-fontsize";



const Card = ({press}) => {
return (
    <TouchableOpacity style={styles.buttonPrimary}>
            <Text onPress={press}>Order your cards</Text>
  </TouchableOpacity>
);

};

const styles = StyleSheet.create({
 card:{
     height: 90,
     backgroundColor: '#9E9E9E',
     display: 'flex',
     justifyContent: "center",
     alignItems: 'center', 
     color: "#FFFFFF",
     height: 130
 },
    font:{
     color: "#FFFFFF",
     fontSize: RFValue(20) ,
     textAlign: "center", fontWeight: "bold"
 },
 buttonPrimary: {
    height: 60,
    width: "100%",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#9E9E9E',
    color: "#FFFFFF",
    backgroundColor: "#03A9F4",
    padding: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  }
});

export default Card;
