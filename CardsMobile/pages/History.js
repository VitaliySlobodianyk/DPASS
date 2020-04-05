
import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  FlatList,
} from 'react-native';
import HistoryCell from '../components/HistoryCell'
import Card from '../components/Card';
import {uuid } from 'uuidv4';
import {addCard, deleteCard, changeCard, changeType,
  changeLimit, changeQuantity,
  changeName, changeGroup, changePhone, tieCheckedOrdersToHistory } from '../actions';
import {connect} from 'react-redux';
import { getKeyDate, checkDate, checkOrders } from '../services';

let updated= false;

const HistoryPage = (props) => {
 
  const history= props.cards.history;
  const datesToCheck= checkDate();
 
  const ordersToCheck =
   history.filter(order=> order.date === datesToCheck.date1 ||  order.date === datesToCheck.date2)
  .map(({id,date,approved})=>( { id, date, approved }) );
 

  const refreshStatuses= async() => {
    let result = null;
    try {
      result= await checkOrders(ordersToCheck) ; 
      console.log("DATA FROM CHECK");
      console.log(result);
      updated= true;
      props.tieCheckedOrdersToHistory(result); 
    } catch (error) {
      console.log(error);
      updated= false;
    } 
  }

if(!updated){
  refreshStatuses();
}
  

  
  if(history.length>0){
    return (
      <View style={
          {
            height: "60%"
          }
        }>
          <FlatList
            data={history}
            renderItem={({ item }) => {
          //console.log(item);
          return(<HistoryCell key={uuid()}  navigation= {props.navigation} orderId={item.id} date={item.date} cards={item.cards} approved={item.approved} />)}}
            contentContainerStyle={{ flexGrow: 1 }} >
          </FlatList>
        </View>
  
      );

  }
  else{
return(
  <View>
    <Text>No orders in history!</Text>
    <Text>Make order first</Text>
  </View>
)

  }
  

};

const styles = StyleSheet.create({
 card:{
     backgroundColor: '#9E9E9E',
     display: 'flex',
     justifyContent: "center",
     alignItems: 'center', 
     color: "#FFFFFF",
     marginTop: 10,
     padding: 5
 },
    font:{
     color: "#FFFFFF",
     fontSize: 20,
     textAlign: "center"
 }
});
const mapStateToProps= (state)=>{
  return {
    cards: state.cards,
   // cardConfig: state.cardConfig,
  //  user: state.user
   history: state.history
  }
  }
  const mapDispatchToProps= (dispatch) =>{
    return {
        addCard: (card)=> dispatch(addCard(card)),
        deleteCard: (id) => dispatch(deleteCard(id)),
        changeCard: (index, card)=> dispatch(changeCard(index,card)),
        changeType: (type)=> dispatch(changeType(type)),
        changeLimit: (limit)=> dispatch(changeLimit(limit)),
        changeQuantity: (quantity) => dispatch(changeQuantity(quantity)),
        changeName: (name)=> dispatch(changeName(name)),
        changeGroup: (group) => dispatch(changeGroup(group)),
        changePhone: (phone)=> dispatch(changePhone(phone)),
        goBack: ()=> dispatch(deleteHistory()),
        addHistory: (pageName) => dispatch(addHistory(pageName)),
        refresh: () => dispatch(refresh()),
        tieCheckedOrdersToHistory:  (checkedOrders) => dispatch(tieCheckedOrdersToHistory(checkedOrders))
    }
  }




export default connect(mapStateToProps,mapDispatchToProps) (HistoryPage);
