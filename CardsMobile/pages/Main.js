import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {uuid} from 'uuidv4';
import {
  prices,
  getKeyDate,
  writeData,
  readData,
  keys,
  getPrices,
  needUpdate,
  getCurrentMonthShortened,
} from '../services';
import {CardType, CardLimit} from '../components';
import Icon from 'react-native-vector-icons/Entypo';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {
  addCard,
  deleteCard,
  changeCard,
  changeType,
  changeLimit,
  changeQuantity,
  changeName,
  changeGroup,
  changePhone,
  refresh,
  tieUserInfo,
  tiePrices,
  uploadPrices,
} from '../actions';
import {connect} from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

let infoGot = false;
let pricesGot = false;
const MainPage = props => {
  const findCardIndex = (type, limit) => {
    return props.cards.cards.findIndex(
      card => card.type === type && card.limit === limit,
    );
  };

  const loadPrices = async () => {
    const oldPrices = await readData(keys.cardPrices);
    console.log(oldPrices);
    if (oldPrices) {
      props.tiePrices(oldPrices);
      pricesGot = true;
    }
    if (needUpdate(props.prices.lastUpdate) || !pricesGot) {
      const newPrices = await getPrices();
      if (newPrices) {
        pricesGot = true;
        props.uploadPrices(newPrices);
      }
    }
  };

  const loadUserInfo = async () => {
    const info = await readData(keys.info);
    if (info!=null) {
      props.tieUserInfo(info);
      infoGot = true;
    }
  };

  if (!infoGot) {
    loadUserInfo();
  }
  if (!pricesGot) {
    loadPrices();
  }

  return (
    <View style={styles.mainView}>
      <ScrollView style ={ styles.scrollView} scrollEnabled={true}>
        <Text style={styles.textPrimary}> Order for {getKeyDate()}</Text>
        <TouchableHighlight>
          <View style={styles.nameField}>
            <Text
              style={styles.configText}>
              Enter your name
            </Text>
            <TextInput
              placeholder="Vasya Petrov"
              defaultValue={props.user.name}
              onChangeText={text => {
                props.changeName(text);
              }}
              style={styles.inputField}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View style={styles.nameField}>
            <Text
              style={styles.configText}>
              Enter your group
            </Text>
            <TextInput
              placeholder="PD-31"
              defaultValue={props.user.group}
              onChangeText={text => {
                props.changeGroup(text);
              }}
              style={styles.inputField}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View style={styles.nameField}>
            <Text
              style={styles.configText}>
              Enter your phone{' '}
            </Text>
            <TextInput
              placeholder="0 XX XXX XXXX"
              value={props.user.phone}
              onChangeText={text => {
                props.changePhone(text);
              }}
              style={styles.inputField}
            />
          </View>
        </TouchableHighlight>
        <Text style={styles.textPrimary}> Configure your card</Text>
        <CardType
          onTypeChanged={type => {
            console.log(type);

            props.changeType(type);
            console.log(props.cardConfig.type);
          }}
        />

        <CardLimit
          onLimitChanged={limit => {
            props.changeLimit(limit);
          }}
        />

        <View style={{
          paddingTop:10
        }}>
          <Text
            style={{
              paddingTop: 20,
              fontSize: RFValue(19),
              paddingLeft: 20,
            }}>
            Enter quantity of cards:
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              marginLeft: 30,
              paddingTop: 10
            }}>
            <TextInput
              value={String(props.cardConfig.quantity)}
              style={{...styles.inputField,
              width: "20%",
              marginRight: 40,
              textAlign: "center"
              }}
              placeholder="Enter Amount Of Cards"
              keyboardType={'numeric'}
              onChangeText={quant => {
                if (quant >0 && quant <= 100) {
                  
                  props.changeQuantity( parseInt(quant));
                } else {
                  props.changeQuantity(1);
                }
              }}
            />

            <Icon.Button
              style={styles.controlIcon}
              name="circle-with-plus"
              backgroundColor="transparent"
              selectionColor = "#FFFFFF"
              color = "#0288D1"
              size={45}
              onPress={() => {
                if (props.cardConfig.quantity < 100) {
                  props.changeQuantity(++props.cardConfig.quantity);
                }
              }}
            />
            <Icon.Button
              style={styles.controlIcon}
              name="circle-with-minus"
              backgroundColor="transparent"
              color = "#0288D1"
              size={45}
              onPress={() => {
                if (props.cardConfig.quantity >= 2) {
                  props.changeQuantity(--props.cardConfig.quantity);
                }
              }}
            />
          </View>
        </View>
       

        <TouchableOpacity 
          style={styles.buttonPrimary}
          onPress={async () => {
            let existingCardIndex = findCardIndex(
              props.cardConfig.type,
              props.cardConfig.limit,
            );
            await writeData(props.user, keys.info);
           
            if (existingCardIndex != -1) {
              props.changeCard(existingCardIndex, {
                quantity: props.cardConfig.quantity,
              });
            } else {
              props.addCard({
                type: props.cardConfig.type,
                limit: props.cardConfig.limit,
                quantity: props.cardConfig.quantity,
                price:
                  props.prices.prices[props.cardConfig.type][
                    props.cardConfig.limit
                  ],
              });
            }
            alert('Card was successfully added!');
          }}>
          <Text style={styles.buttonTextStyle}> Add Card to List</Text>
          <Text>
            +
            {props.cardConfig.quantity *
              props.prices.prices[props.cardConfig.type][
                props.cardConfig.limit
              ]}{' '}
            UAH
          </Text>
        </TouchableOpacity>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  
  mainView: {
   backgroundColor: "#B3E5FC",
   height:"100%",
   width: "100%",
   alignItems: "center",
   justifyContent: "center"
  },
  scrollView: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 5
  }
  ,
  configText: {     
      fontSize: RFValue(18),
      width: "50%" 
  },
  controlIcon: {
    width: 60,
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
    color: "#0288D1"
  },
  select: {
    width: '40%',
    borderColor: '#9E9E9E',
    borderWidth: 3,
  },
  textPrimary: {
    fontSize: RFValue(19),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
  },
  nameField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '15%',
    paddingLeft: '5%',
    height: 50,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  inputField: {
    width: '40%',
    borderColor: '#9E9E9E',
    borderWidth: 3,
    marginLeft: '5%',
    paddingHorizontal: 9,
    height: 40,
  },
  menuElement: {
    width: 100,
    textAlign: 'center',
    height: 20,
  },
  menuElementActive: {
    borderBottomColor: 'red',
    borderBottomWidth: 3,
  },
  visiblePage: {
    paddingHorizontal: 0,
    backgroundColor: '#B3E5FC',
    minHeight: '100%',
  },
  buttonPrimary: {
    height: 60,
    textAlign: 'center',
    fontSize: RFValue(20),
    fontWeight: 'bold',
    borderColor: '#9E9E9E',
    color: '#FFFFFF',
    backgroundColor: '#03A9F4',
    padding: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    alignSelf: "center",
    width: "100%",
    marginTop: "10%"
  },
  buttonTextStyle: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: RFValue(17)
  },
});

const mapStateToProps = state => {
  return {
    cards: state.cards,
    cardConfig: state.cardConfig,
    user: state.user,
    prices: state.prices,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addCard: card => dispatch(addCard(card)),
    deleteCard: id => dispatch(deleteCard(id)),
    changeCard: (index, card) => dispatch(changeCard(index, card)),
    changeType: type => dispatch(changeType(type)),
    changeLimit: limit => dispatch(changeLimit(limit)),
    changeQuantity: quantity => dispatch(changeQuantity(quantity)),
    changeName: name => dispatch(changeName(name)),
    changeGroup: group => dispatch(changeGroup(group)),
    changePhone: phone => dispatch(changePhone(phone)),
    refresh: () => dispatch(refresh()),
    tieUserInfo: info => dispatch(tieUserInfo(info)),
    tiePrices: prices => dispatch(tiePrices(prices)),
    uploadPrices: prices => dispatch(uploadPrices(prices)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
