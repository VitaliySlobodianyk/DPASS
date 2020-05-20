import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import Card from './Card';
import {uuid} from 'uuidv4';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {
  pages,
  payDate,
  calculatePriceOfPurchase,
  checkAbilityToPay,
  orderStatus,
} from '../services';

import {addHistory} from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

const HistoryCell = ({order, navigation, addHistory}) => {
  const {date, cards, approved, approvalSent, name} = order;

  console.log(order);

  const renderInfo = () => {
    if (order?.info) {
      return (
        <View>
          <Text>Info:</Text>
          <Text>{order.info}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderApproval = () => {
    if (approved) {
      return (
      <View style={{...styles.iconRow, marginLeft: 0, }}> 
      <Icon name="check" size={25} color="green"></Icon>
      <Text
          style={{
            fontSize: 20,
            color: 'green',
            textAlign: 'center',
          }}>
          Approved
        </Text>
        </View> 
      );
    } else {
      const abilityToPay = checkAbilityToPay(date);

      if (
        abilityToPay === orderStatus.thisMonth ||
        abilityToPay === orderStatus.nextMonth
      ) {
        if (approvalSent) {
          return (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'green',
                  paddingVertical: 5,
                  textAlign: 'center',
                }}>
                {' '}
                Approval has been sent
              </Text>

              <TouchableHighlight
                onPress={() => {
                  addHistory(pages.approval);
                  navigation.navigate(pages.approval, {order: order});
                }}>
                <View style={{...styles.iconRow, marginLeft: 0, justifyContent: "center"}}>
                  <Icon name="cycle" color="red" size={25} />
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'red',
                      textAlign: 'center',
                      marginLeft: 5
                    }}>
                    Resend Approval
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        } else {
          return (
            <TouchableHighlight
              style={styles.approveButton}
              onPress={() => {
                addHistory(pages.approval);
                navigation.navigate(pages.approval, {order: order});
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'red',
                }}>
                Click to approve
              </Text>
            </TouchableHighlight>
          );
        }
      } else {
        return <Text>Order Outdated, you can't approve it!</Text>;
      }
    }
  };

  return (
    <View style={styles.card}>
      <View style={{...styles.iconRow}}>
        <Icon name="user" size={25} />
        <Text
          style={{
            ...styles.text,
            fontSize: 17,
            fontWeight: 'bold',
            paddingVertical: 5,
            paddingLeft:10
          }}>
         {name}
        </Text>
      </View>

      <View style={{...styles.iconRow}}>
        <Icon name="calendar" size={25} />
        <Text style={styles.text}> {date}</Text>
      </View>
      <Text style={styles.text}>Date to pay: {payDate(date)}</Text>
      {renderInfo()}
      <View style={styles.cardList}>
        <FlatList
          data={cards}
          scrollEnabled={false}
          renderItem={({item}) => (
            <Card
              key={item.id}
              id={item.id}
              type={item.type}
              limit={item.limit}
              quantity={item.quantity}
              price={item.price}
              displayDelete={false}
            />
          )}
          contentContainerStyle={{flexGrow: 1}}
        />
      </View>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',          
          }}>
          Order price: {calculatePriceOfPurchase(cards)} UAN
        </Text>
        {renderApproval()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#9E9E9E',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFFFFF',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  cardList: {
    width: '100%',
  },
  font: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  approveButton: {
    marginTop: '5%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#BDBDBD',
    width: '100%',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    width: "100%",
    marginLeft: "50%"

  },
});
const mapStateToProps = state => {
  return {
    history: state.history,
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
    goBack: () => dispatch(deleteHistory()),
    addHistory: pageName => dispatch(addHistory(pageName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryCell);
