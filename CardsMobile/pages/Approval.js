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
import {sendApproval, pages, writeData, calculatePriceOfPurchase} from '../services';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Approval = props => {
  const [sending, send] = useState(false);
  const {order} = props.route.params;
  const {billId, date, actualAmount} = props.user;

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
        await writeData({
          id: props.user.id,
          name: props.user.name,
          group: props.user.group,
          phone: props.user.phone,
          history: props.cards.history,
        });

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
    <View
      style={ styles.page }>
      <ScrollView style={{flex: 1}}>
        <View>
          <Text>Info</Text>
        </View>

        <View>
          <Text>Cards: {printOrders()}</Text>
          <Text>Cards for: {order.date}</Text>
          <Text>Full Price: {calculatePriceOfPurchase(order.cards) } UAN </Text>
        </View>

        <TextInput
          value={String(props.user.billId)}
          style={styles.inputField}
          placeholder="Enter ID of bill"
          onChangeText={id => {
            props.putBillId(id);
          }}
        />

        <TextInput
          value={String(props.user.date)}
          style={styles.inputField}
          placeholder="Enter date of payment"
          onChangeText={date => {
            props.putDate(date);
          }}
        />
        <TextInput
          value={String(props.user.actualAmount)}
          style={styles.inputField}
          placeholder="Enter actual amount of payment"
          onChangeText={amount => {
            props.putAmount(amount);
          }}
        />

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
    user: state.user,
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
    width: '60%',
    borderColor: '#9E9E9E',
    borderWidth: 3,
    marginLeft: '5%',
    paddingHorizontal: 10,
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
    paddingHorizontal: 5,
    backgroundColor: '#B3E5FC',
    minHeight: '100%',
  },
  buttonPrimary: {
    height: 50,
    borderColor: '#9E9E9E',
    borderWidth: 2,
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column'
  },
  buttonActive: {
    backgroundColor: '#03A9F4',
  },
  buttonInactive: {
    backgroundColor: 'grey',
  },
  buttonTextStyle: {
    color: '#FFF',
    textAlignVertical: 'center',
    fontSize: 20
  },
});
