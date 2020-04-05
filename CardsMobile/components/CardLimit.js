import React, { Component, useState } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import {cardNames} from '../services/CardNames';

const CardLimit = ({onLimitChanged}) => {
    const [state, setState] = useState({ limit: '46' });

    const updateLimit = (limit) => {
        onLimitChanged(limit);
        setState({ limit })
};

    return (
        <View>
            <Picker selectedValue={state.limit} onValueChange={updateLimit}>
            <Picker.Item label="46" value="46" />
            <Picker.Item label="62" value="62" />
            <Picker.Item label="Unlimited" value="unlim" />
            </Picker>
            <Text style={styles.text}>Selected limit: {state.limit}</Text>
        </View>
    )

}
export default CardLimit;
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#FFFFFF'
    }
})
