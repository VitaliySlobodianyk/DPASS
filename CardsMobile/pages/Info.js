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
    <View style={styles.page}>
      <ScrollView style={{flex: 1}}>
        <View>
          <Text>Info</Text>
        </View>

        <View>
          <Text>Правила використання</Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </View>

        <View>
          <Text>Контактна інформація</Text>
          <Text> Ім'я: {info.name}</Text>
          <Text onPress={() => Linking.openURL(`tel:${info.phone}`)}>
            {' '}
            Телефон: {info.phone}{' '}
          </Text>

          <TouchableOpacity onPress={() => Linking.openURL(info.telegram)}>
            <Text style={{color: 'blue'}}>Telegram</Text>
            <Icon
              name="paper-plane"
              backgroundColor="transparent"
              size={30}>
            </Icon>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
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
