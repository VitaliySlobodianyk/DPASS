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
        <View>
            <Picker selectedValue={state.type} onValueChange={updateType}>
                <Picker.Item label="Metro" value="metro" />
                <Picker.Item label="Metro-Bus" value="metroBus" />
                <Picker.Item label="Metro-Tram" value="metroTram" />
                <Picker.Item label="Metro-Troleybus" value="metroTroley" />
            </Picker>
            <Text style={styles.text}>Selected type: {cardNames[state.type]}</Text>
        </View>
    )

}
export default CardType;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFFFFF'
    }
})
