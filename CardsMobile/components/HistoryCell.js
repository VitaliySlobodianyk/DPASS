
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import Card from './Card';
import { uuid } from 'uuidv4';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { pages, payDate, calculatePriceOfPurchase, checkAbilityToPay,orderStatus} from '../services'

import { addHistory } from '../actions';
import { connect } from 'react-redux';


const HistoryCell = ({ order, navigation, addHistory }) => {

  const { date, cards, approved, approvalSent } = order;
  
  console.log(order);

  const renderInfo =() =>{
    if(order?.info){
          return (
          <View>
          <Text>Info:</Text>
          <Text>{order.info}</Text>
          </View>
            );
        }else{
          return null;
        }
  }
  
  const renderApproval = () => {
    if (approved) {

      return (<Text style={{
        fontSize: 20,
        color: 'green',
      }}>Approved</Text>);

    } else {
      const abilityToPay= checkAbilityToPay(date);
        
      if(abilityToPay === orderStatus.thisMonth || abilityToPay === orderStatus.nextMonth){
        if(approvalSent){
          return (     
         <View>
            <Text style={{
              fontSize: 16,
              color: 'green',
              paddingVertical:5
            }}> Approval has been sent</Text>
           
            <TouchableHighlight onPress={() => {
            addHistory(pages.approval);
            navigation.navigate(pages.approval, { order: order })
          }}>
            <Text style={{
              fontSize: 20,
              color: 'violet',
            }}>Resend Approval</Text>
          </TouchableHighlight> 
          </View> );

        }else{
          return ( <TouchableHighlight onPress={() => {
            addHistory(pages.approval);
            navigation.navigate(pages.approval, { order: order })
          }}>
      
            <Text style={{
              fontSize: 20,
              color: 'red',
            }}>Click to approve</Text>
          </TouchableHighlight>);
        }
        
        
      }else{
        return ( 
          <Text>Order Outdated, you can't approve it!</Text>
        );
      } 
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.text}>Date of order: {date}</Text>
      <Text style={styles.text}>Date to pay: {payDate(date)}</Text>
      {renderInfo()}
      <FlatList
        data={cards}
        scrollEnabled={false}
        renderItem={({ item }) => <Card
          key={item.id}
          id={item.id}
          type={item.type}
          limit={item.limit}
          quantity={item.quantity}
          price={item.price}
          displayDelete={false}
        />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
      </FlatList>
      <Text >Order price: {calculatePriceOfPurchase(cards)} UAN</Text>
      
        {renderApproval()}
     
     
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#9E9E9E',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    color: "#FFFFFF",
    marginTop: 10,
    padding: 5
  },
  font: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});
const mapStateToProps = (state) => {
  return {
    history: state.history
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => dispatch(addCard(card)),
    deleteCard: (id) => dispatch(deleteCard(id)),
    changeCard: (index, card) => dispatch(changeCard(index, card)),
    changeType: (type) => dispatch(changeType(type)),
    changeLimit: (limit) => dispatch(changeLimit(limit)),
    changeQuantity: (quantity) => dispatch(changeQuantity(quantity)),
    changeName: (name) => dispatch(changeName(name)),
    changeGroup: (group) => dispatch(changeGroup(group)),
    changePhone: (phone) => dispatch(changePhone(phone)),
    goBack: () => dispatch(deleteHistory()),
    addHistory: (pageName) => dispatch(addHistory(pageName))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HistoryCell);
