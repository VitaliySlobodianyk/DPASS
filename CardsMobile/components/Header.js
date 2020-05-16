
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
     height: 50,
     display: 'flex',
     justifyContent: "center",
     alignItems: 'center',
     flexDirection: "row"
 },
    font:{
     color: "#FFFFFF",
     fontSize: 25,
     textAlign: "center",
     fontWeight: "bold",
      paddingLeft: 5
 }
});

export default Header;
