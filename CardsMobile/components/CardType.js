import React, { Component, useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import {cardNames} from '../services/CardNames';

const CardType = ({onTypeChanged}) => {
    const [state, setState] = useState({ type: 'metro' });

    const updateType = (type) => {
        onTypeChanged(type);
        setState({ type })
};


    return (
        <View style= {styles.layout}>
              <View style={styles.pickerContainer}>
            <Picker style={styles.picker} selectedValue={state.type} onValueChange={updateType}>  
                <Picker.Item label="Metro" value="metro" />
                <Picker.Item label="Metro-Bus" value="metroBus" />
                <Picker.Item label="Metro-Tram" value="metroTram" />
                <Picker.Item label="Metro-Troleybus" value="metroTroley" />
            </Picker>
            </View>
            <Text style={styles.text}>Type: {cardNames[state.type]}</Text>
        </View>
    )

}
export default CardType;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
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
       paddingLeft: 20

    }
})