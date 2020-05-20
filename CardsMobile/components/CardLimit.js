import React, { Component, useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import {cardNames} from '../services/CardNames';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const CardLimit = ({onLimitChanged}) => {
    const [state, setState] = useState({ limit: '46' });

    const updateLimit = (limit) => {
        onLimitChanged(limit);
        setState({ limit })
};

    return (
        <View style = {styles.layout}>
           <View style={styles.pickerContainer}>
            <Picker style= {styles.picker}  selectedValue={state.limit} onValueChange={updateLimit}>
            <Picker.Item label="46" value="46" />
            <Picker.Item label="62" value="62" />
            <Picker.Item label="Unlimited" value="unlim" />
            </Picker>
            
            </ View>
            <Text style={styles.text}>Limit: {state.limit} rides</Text>
        </View>
    )

}
export default CardLimit;
const styles = StyleSheet.create({
    text: {
        fontSize: RFValue(18),
        alignSelf: 'center',
        color: '#FFFFFF',
        paddingLeft: 20
    },
    pickerContainer: {
        width: "30%",
        height: 50,
        borderWidth: 3,
        borderColor: "#9E9E9E",
        alignContent: "center",
        justifyContent: "center"
    },
    picker:{
        
    },
     layout: {
       flexDirection: "row",
       paddingLeft: 20,
       marginTop:10

    }
})
