import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';

import Card from '../components/Card';
import { uuid } from 'uuidv4';
import { sendData, readData, writeData, getKeyDate, calculatePriceOfPurchase } from '../services'
import { connect } from 'react-redux';
import { deleteCard, putOrder, clearCart } from '../actions'


const CartPage = (props) => {
   
    const validateCreds = () => (props.user.name.trim().length != 0
        && props.user.name.trim().length != 0
        && props.user.phone.trim().length != 0)
        ? true : false;

   const checkOrderAwailability= ()=>{
     const orders = [...props.cards.history];
     const today= getKeyDate();
    
    
   const index = orders.findIndex(
         order =>  ( order.date === today 
         && order.name.trim().toLowerCase() === props.user.name.trim().toLowerCase() 
         && order.group.trim().toLowerCase() === props.group.name.trim().toLowerCase() 
         && order.phone.trim().toLowerCase() === props.group.phone.trim().toLowerCase())
     )
     // write

   }

    const getCards = async () => {
        if (props.cards.cards.length > 0) {
            if (validateCreds()) {

                const idOftransaction = uuid();
                const dateOfTransaction = getKeyDate();
               
                const order = {
                    date: dateOfTransaction,
                    id: idOftransaction,
                    name: props.user.name,
                    group: props.user.group,
                    phone: props.user.phone,
                    cards: props.cards.cards,
                    approved: false
                }
                

                const succes =  await sendData(order);
              
               if(succes){
                props.putOrder(order);
                alert("Operation succesful");
                props.clearCart();
               }else{
                   alert("Something went wrong! Try later");
               }


                writeData({
                    id: props.user.id,
                    name: props.user.name,
                    group: props.user.group,
                    phone: props.user.phone,
                    history: props.cards.history,
                });

            } else {
                alert("Wrong user data");
            }
        } else {
            alert("Your cart is empty!");
        }
    };


    return (
        <View >
            <View style={{
                height: "85%",
                paddingTop: "3%"
            }}>
                <FlatList
                    data={props.cards.cards}
                    scrollEnabled={true}
                    renderItem={({ item }) =>
                        <TouchableOpacity key={item.id} style={{
                            marginBottom: 5
                        }}>
                            <Card
                                type={item.type}
                                limit={item.limit}
                                quantity={item.quantity}
                                price={item.price}
                                onDelete={() => props.deleteCard(item.id)} />
                        </TouchableOpacity>
                    }
                    contentContainerStyle={
                        {
                            flexGrow: 0
                        }}
                >
                </FlatList>
            </View>
            <TouchableOpacity style={styles.buttonPrimary} onPress={getCards}>
                <Text style={styles.buttonTextStyle} >Order your cards</Text>
                <Text> {calculatePriceOfPurchase(props.cards.cards)} UAN</Text>
            </TouchableOpacity>
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
        width: "60%",
        borderColor: "#9E9E9E",
        borderWidth: 3,
        marginLeft: "5%",
        paddingHorizontal: 10
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

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCard: (id) => dispatch(deleteCard(id)),
        putOrder: (order) => dispatch(putOrder(order)),
        clearCart: () => dispatch(clearCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);