
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

const Header = ({title}) => {
return (
<View style= {styles.header}>
  <Text style={styles.font}>
        {title}
  </Text>
</View>
);

};

const styles = StyleSheet.create({
 header:{
     height: 50,
     display: 'flex',
     justifyContent: "center",
     alignItems: 'center',
 },
    font:{
     color: "#FFFFFF",
     fontSize: 25,
     textAlign: "center",

 }
});

export default Header;
