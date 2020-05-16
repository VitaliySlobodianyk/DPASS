import { CHANGE_TYPE, CHANGE_LIMIT, CHANGE_QUANTITY } from '../actions/types.js';
import { cardsConfigState  } from '../services'
import { prices, getKeyDate } from '../services'



const cardConfigReducer =  (state = cardsConfigState, action) => {
    switch (action.type) {
        case CHANGE_TYPE:
            return {
                ...state,
                type: action.cardType
            };
            break;
        case CHANGE_LIMIT:
            return {
                ...state,
                limit: action.limit
            }
            break;
        case CHANGE_QUANTITY:
           { 
            return {
                ...state,
                quantity: action.quantity
            }
         }
            break;

        default:
            break;
    }

    return state;
} 
export default cardConfigReducer;