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

import { cardNames } from '../services/CardNames'
import Icon from 'react-native-vector-icons/Entypo';

const Card = ({ type, limit, quantity, price, onDelete, displayDelete = true }) => {

 const  checkDisplayDelete = () => displayDelete ?
      (<Icon.Button
         name="circle-with-cross"
         backgroundColor="transparent"
         size={30}

         onPress={onDelete}
      />)
      : null;



   return (
      <View style={styles.card}>

         <View style={{
            position: 'absolute',
            zIndex: 100,
            top: -5,
            right: -15

         }}>
            {
               checkDisplayDelete()
            }
         </View>

         <Text style={styles.font}>
            Type: {cardNames[type]}
         </Text>
         <Text>
            Limit:{limit}
         </Text>
         <Text>
            Quantity:{quantity} Price:{price}
         </Text>
         <Text style={{
            position: 'relative',
         }}>
            Total: {quantity * price} UAN
  </Text>



      </View>
   );

};

const styles = StyleSheet.create({
   card: {
      height: 90,
      backgroundColor: '#9E9E9E',
      display: 'flex',
      justifyContent: "center",
      alignItems: 'center',
      color: "#FFFFFF",
      height: 130,
      position: 'relative'
   },
   font: {
      color: "#FFFFFF",
      fontSize: 20,
      textAlign: "center"
   }
});

export default Card;
