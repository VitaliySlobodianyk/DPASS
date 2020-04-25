
import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableHighlight,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { uuid } from 'uuidv4';
import { prices, cardNames, getKeyDate } from '../services'
import { CardType, CardLimit } from '../components'
import Icon from 'react-native-vector-icons/Entypo'
import {writeData} from '../services'

import {addCard, deleteCard, changeCard, changeType,
      changeLimit, changeQuantity,
      changeName, changeGroup, changePhone, refresh } from '../actions'
import {connect} from 'react-redux';

let refreshed= false;

const MainPage = ( props) => {
  const findCardIndex= (type,limit)=>{
         return props.cards.cards.findIndex( card => card.type===type && card.limit === limit);
  }
 
  if(!refreshed){
  setTimeout( props.refresh, 1000);
  refreshed=true;
 }

  return (
    <View >
      <ScrollView scrollEnabled={true} >
  <Text> Order for {getKeyDate()}</Text>
        <TouchableHighlight>
          <View style={styles.nameField}>
            <Text style={{
              fontSize: 20
            }} >Enter your name</Text>
            <TextInput placeholder='Vasya Petrov' defaultValue={props.user.name} onChangeText={(text) => { props.changeName(text)  }} style={styles.inputField}></TextInput>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View style={styles.nameField}>
            <Text style={{
              fontSize: 20
            }}>Enter your group</Text>
            <TextInput placeholder='PD-31'  defaultValue={props.user.group} onChangeText={(text) => { props.changeGroup(text) }} style={styles.inputField}></TextInput>
          </View>
        </TouchableHighlight>

        <TouchableHighlight>
          <View style={styles.nameField}>
            <Text style={{
              fontSize: 20
            }}>Enter your phone </Text>
            <TextInput placeholder='0 XX XXX XXXX' defaultValue={props.user.phone}   onChangeText={(text) => { props.changePhone(text) }} style={styles.inputField}></TextInput>
          </View>
        </TouchableHighlight>

       <CardType onTypeChanged={(type) => { 
         console.log(type);
        
         props.changeType(type)
         console.log(props.cardConfig.type);
         }} />

        <CardLimit onLimitChanged={(limit) => { props.changeLimit(limit)
           
        
        }} />

        <View>
          <Text style={{
            paddingTop: 20,
            fontSize: 20
          }}>Enter quantity of cards:</Text>

          <View style={{
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center'
          }}>


            <TextInput      
              value={String(props.cardConfig.quantity)}
              style={styles.inputField}
              placeholder="Enter Amount Of Cards"
              keyboardType={'numeric'}
              onChangeText={(quant) => {
                if (quant >= 2 && quant <= 100) {
                  props.changeQuantity(quant);
                }
                else {
                  props.changeQuantity(props.cardConfig.quantity);
                }
              }
              }
            />  
             
            <Icon.Button
              style={{
                width: 50,
                padding: 0,
                margin: 0,
                paddingVertical: 40,
                justifyContent: 'flex-end'
              }}
              name="circle-with-plus"
              backgroundColor="transparent"
              size={30}
              onPress={() => {
                if (props.cardConfig.quantity  < 100) {
                  props.changeQuantity(++props.cardConfig.quantity);
                }
              }
              } /> 
            <Icon.Button
              style={{
                width: 50,
                padding: 0,
                margin: 0,
                paddingVertical: 40,
                justifyContent: 'flex-end'
              }}
              name="circle-with-minus"
              backgroundColor="transparent"
              size={30}
              onPress={() => {
                if (props.cardConfig.quantity >= 2) {
                  props.changeQuantity(--props.cardConfig.quantity);
                }
              }}
            />
          </View>
        </View>

        <TouchableOpacity style={{
          ...styles.buttonPrimary,
          marginTop: "5%"
        }} onPress={() => {
        
        let existingCardIndex=  findCardIndex(props.cardConfig.type, props.cardConfig.limit);
         
          if(existingCardIndex!=-1){
             props.changeCard(existingCardIndex, {
              quantity: props.cardConfig.quantity
            })
          }
         else{
          props.addCard({
            type: props.cardConfig.type,
            limit: props.cardConfig.limit,
            quantity: props.cardConfig.quantity
          })
         }

         
        writeData({
            id: props.user.id,
            name: props.user.name,
            group: props.user.group,
            phone: props.user.phone,
            cards: props.cards.cards,  
            history: props.cards.history
        });



          
          alert('Card was successfully added!');
         }}>
          <Text> Add Card to List</Text>
          <Text>+{props.cardConfig.quantity * prices[props.cardConfig.type][props.cardConfig.limit]} UAN</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({

  mainView: {
    display: "flex",
  },
  nameField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: "15%",
    paddingLeft: "5%",
    height: 50
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10

  },
  inputField: {
    width: "40%",
    borderColor: "#9E9E9E",
    borderWidth: 3,
    marginLeft: "5%",
    paddingHorizontal: 5,
    height: 40
  },
  menuElement: {
    width: 100,
    textAlign: 'center',
    height: 20
  },
  menuElementActive: {
    borderBottomColor: 'red',
    borderBottomWidth: 3
  },
  visiblePage: {
    paddingHorizontal: 5,
    backgroundColor: "#B3E5FC",
    minHeight: "100%"
  },
  buttonPrimary: {
    height: 60,
    width: "100%",
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#9E9E9E',
    color: "#FFFFFF",
    backgroundColor: "#03A9F4",
    padding: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    alignSelf: 'center',
  }

});

const mapStateToProps= (state)=>{
  return {
    cards: state.cards,
    cardConfig: state.cardConfig,
    user: state.user
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
        refresh: () => dispatch(refresh())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);