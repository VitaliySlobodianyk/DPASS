import { DELETE_CARD, ADD_CARD, PUT_ORDER_IN_HISTORY, CLEAR_CART, CHANGE_CARD, TIE_CHECKED_ORDERS_TO_HISTORY } from '../actions/types.js';
import { iniciateState } from '../services'
import { uuid } from 'uuidv4'
import { prices, getKeyDate } from '../services'



const cardReducer = (state = iniciateState(), action) => {
    switch (action.type) {
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.id)
            };
            break;
        case ADD_CARD:
            {
                state.cards.unshift({
                    id: uuid(),
                    type: action.card.type,
                    limit: action.card.limit,
                    quantity: action.card.quantity,
                    price: prices[action.card.type][action.card.limit]
                })
                return {
                    ...state,
                    cards: [...state.cards]
                }
            }
            break;
        case CHANGE_CARD:
            {
                state.cards[action.index] = Object.assign(state.cards[action.index], action.card);
                return {
                    ...state,
                    cards: [...state.cards]
                }
            }
            break;
        case PUT_ORDER_IN_HISTORY:
            {
               state.history.unshift(action.order);
             return {
                ...state,
                history: [...state.history]
            }
        }break;
        case TIE_CHECKED_ORDERS_TO_HISTORY:
            {
              const {checkedOrders} =  action; 
              const uncheckedOrders = state.history;

           checkedOrders.forEach(checkedOrder => {
                 
                const foundIndex = uncheckedOrders.findIndex(uncheckedOrder => checkedOrder.id === uncheckedOrder.id)
               
                if(foundIndex!=-1){
                    
                    uncheckedOrders[foundIndex].approved= checkedOrder.approved
                   
                    if(checkedOrder.info){
                        uncheckedOrder.info= checkedOrder.info;
                    }
                }

              });

             return {
                ...state,
                history: [...uncheckedOrders]
            }
        }break;

            
        case CLEAR_CART:
            return {
                ...state,
                cards: []
            }
            break;

        default:
            break;
    }

    return state;
}

export default cardReducer;