import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {connect} from 'react-redux';
import {
  deleteHistory,
  addHistory,
  putBillId,
  putDate,
  putAmount,
  clearApprovalData,
  approvalSent,
} from '../actions';
import {
  sendApproval,
  pages,
  writeData,
  calculatePriceOfPurchase,
} from '../services';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const Approval = props => {
  const [sending, send] = useState(false);
  const {order} = props.route.params;
  const {billId, date, actualAmount} = props.approval;

  const checkApprovalData = () =>
    billId.trim().length > 0 &&
    date.trim().length > 0 &&
    actualAmount.trim().length > 0;

  const printOrders = () => {
    let ordersText = '';
    console.log(order);
    order.cards.forEach((card, index) => {
      let cardText = `${card.type} - ${card.limit} x ${card.quantity} pcs`;
      index < order.cards.length - 1 ? (cardText += ',  ') : (cardText += '.');
      ordersText += cardText;
    });
    return ordersText;
  };

  const handleButton = () =>
    Object.assign(
      {},
      styles.buttonPrimary,
      sending ? styles.buttonInactive : styles.buttonActive,
    );

  const makeApproval = async () => {
    send(true);
    if (checkApprovalData()) {
      const approval = {
        id: order.id,
        billId: billId,
        orderDate: order.date,
        payDate: date,
        sum: actualAmount,
      };
      const result = await sendApproval(approval);
      if (result) {
        alert('Approval sent successfully!');
        await props.approvalSent(order.id);

        setTimeout(() => {
          props.clearApprovalData();
          props.goBack();
          props.navigation.navigate(pages.history);
        }, 1000);
      } else {
        alert('Something went wrong retry!');
      }
    } else {
      alert('Wrong data!');
    }
    send(false);
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={{
          height: '100%',
          width: '100%',
          paddingTop: 15,
        }}>
        <View>
          <Text
            style={{
              fontSize: RFValue(19),
              paddingLeft: 5,
              fontWeight: 'bold',
            }}>
            Cards:
          </Text>
          <Text
            style={{
              fontSize: RFValue(17),
              paddingLeft: 15,
            }}>
            {' '}
            {printOrders()}
          </Text>
          <Text
            style={{
              fontSize: RFValue(19),
              paddingLeft: 5,
              fontWeight: 'bold',
              paddingTop: 10,
            }}>
            Cards for: {order.date}
          </Text>
          <Text
            style={{
              fontSize: RFValue(19),
              paddingLeft: 5,
              fontWeight: 'bold',
              paddingTop: 10,
            }}>
            Full Price: {calculatePriceOfPurchase(order.cards)} UAH{' '}
          </Text>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="credit-card" size={30} color="#0288D1" />
            <Text
              style={{
                fontSize: RFValue(18),
                marginLeft: 20,
              }}>
              0001 0002 0003 0004{' '}
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="warning" color="red" size={30} />
            <Text
              style={{
                fontSize: RFValue(19),
                paddingLeft: 5,
                fontWeight: 'bold',
                width: '70%',
                marginLeft: 10,
              }}>
              Please, specify all order info in payment comment.
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            value={String(props.approval.billId)}
            style={styles.inputField}
            placeholder="Comment: bank transaction id... etc."
            onChangeText={id => {
              props.putBillId(id);
            }}
          />

          <TextInput
            value={String(props.approval.date)}
            style={styles.inputField}
            placeholder="Enter date of payment"
            onChangeText={date => {
              props.putDate(date);
            }}
          />
          <TextInput
            value={String(props.approval.actualAmount)}
            style={styles.inputField}
            placeholder="Enter actual amount of payment"
            onChangeText={amount => {
              props.putAmount(amount);
            }}
          />
        </View>

        <TouchableOpacity
          style={handleButton()}
          onPress={() => (sending ? console.log('sending') : makeApproval())}>
          <Text style={styles.buttonTextStyle}> Send Approval</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    cards: state.cards,
    history: state.history,
    approval: state.approval,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    goBack: () => dispatch(deleteHistory()),
    addHistory: pageName => dispatch(addHistory(pageName)),
    putBillId: billID => dispatch(putBillId(billID)),
    putAmount: amount => dispatch(putAmount(amount)),
    putDate: date => dispatch(putDate(date)),
    clearApprovalData: () => dispatch(clearApprovalData()),
    approvalSent: orderId => dispatch(approvalSent(orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Approval);

const styles = StyleSheet.create({
  inputField: {
    width: '70%',
    borderColor: '#9E9E9E',
    borderWidth: 3,
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginTop: '5%',
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
  page: {
    backgroundColor: '#B3E5FC',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  buttonPrimary: {
    padding: 20,
    width: '98%',
    textAlign: 'center',
    fontSize: RFValue(20),
    fontWeight: 'bold',
    borderColor: '#9E9E9E',
    color: '#FFFFFF',
    backgroundColor: '#03A9F4',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '5%',
    alignSelf: "center"
  },
  buttonActive: {
    backgroundColor: '#03A9F4',
  },
  buttonInactive: {
    backgroundColor: 'grey',
  },
  buttonTextStyle: {
    color: '#FFF',
    fontSize: RFValue(20),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
});
