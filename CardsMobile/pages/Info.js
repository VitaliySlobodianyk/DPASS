import * as React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Linking,
} from 'react-native';
import {getInfo, readData, writeData, keys, needUpdate} from '../services';
import {uploadInfo, tieInfo} from '../actions';
import Icon from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

let infoGot = false;
const Info = props => {
  const {info} = props.info;

  const loadInfo = async () => {
    const oldInfo = await readData(keys.info);
    console.log(oldInfo);
    if (oldInfo) {
      props.tieInfo(oldInfo);
      infoGot = true;
    }
    if (needUpdate(props.info.lastUpdate) || !infoGot) {
      const newInfo = await getInfo();
      if (newInfo) {
        infoGot = true;
        props.uploadInfo(newInfo);
      }
    }
  };

  if (!infoGot) {
    loadInfo();
  }

  return (
    <View style={styles.mainView}>
      <ScrollView style={{flex: 1}}>
        
         <View>
            <Text style={styles.textPrimary}>Правила використання</Text>
          <View style={styles.listElement}>
           <Icon name="controller-record" size={20} color="#0288D1" ></Icon>
             <Text style={{
                 width: "95%",
                 textAlign: "left",
                 paddingLeft: 10,
                 fontSize: RFValue(16)
             }}> Студентська електронна картка дійсна при наявності у її власника студентського квитка денної форми навчання.</Text>
          </View>
         
          <Text> </Text>
          <Text> </Text>
        </View>

        <View>
          <Text style={styles.textPrimary}>Зв'язатись з підтримкою</Text>
          
          <TouchableOpacity style={styles.listElement}>
              <Icon style={{
                
              }} name="user" size={30} color="#0288D1"></Icon>
               <Text style={styles.contactText}>
                    {info.name}
               </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listElement} onPress={() => Linking.openURL(`tel:${info.phone}`)}>
              <Icon style={{
                
              }} name="phone" size={25} color="#0288D1"></Icon>
               <Text style={styles.contactText} >
                    {info.phone}
               </Text>
          </TouchableOpacity>
          
          

          <TouchableOpacity style={styles.listElement} onPress={() => Linking.openURL(info.telegram)}>
           <Icon
              name="paper-plane"
             
              size={30} color="#0288D1">
                  
            </Icon>
            <Text style={styles.contactText}>{info.telegram}</Text>
            
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: "#B3E5FC",
        height:"100%",
        alignItems: "center",
        justifyContent: "center"
       },
  listElement: {
      flexDirection: "row",
      alignContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignContent: "center",
      justifyContent: "center"
  },
  contactText: {
    marginTop: 3,  
    fontSize: RFValue(15),
      width: "50%",
      paddingLeft: 20
  },
  textPrimary: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
});
const mapStateToProps = state => {
  return {
    info: state.info,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    uploadInfo: info => dispatch(uploadInfo(info)),
    tieInfo: info => dispatch(tieInfo(info)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Info);
