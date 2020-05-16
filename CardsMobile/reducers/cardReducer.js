import {
  DELETE_CARD,
  ADD_CARD,
  PUT_ORDER_IN_HISTORY,
  CLEAR_CART,
  CHANGE_CARD,
  TIE_CHECKED_ORDERS_TO_HISTORY,
  APPROVALSENT,
  UPLOAD_CARDS,
} from '../actions/types.js';
import {cardsState} from '../services';
import {uuid} from 'uuidv4';
import {prices, getKeyDate, writeData, keys} from '../services';

const cardReducer = (state = cardsState, action) => {
  switch (action.type) {
    case UPLOAD_CARDS:
      {
        const newState = {...state};
        const newCards = action.cards;

        if (newCards?.history) {
          newState.history = newCards.history;
        }
        return newState;
      }
      break;
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.id),
      };
      break;
    case ADD_CARD:
      {
        state.cards.unshift({
          id: uuid(),
          type: action.card.type,
          limit: action.card.limit,
          quantity: action.card.quantity,
          price: action.card.price,
        });
        return {
          ...state,
          cards: [...state.cards],
        };
      }
      break;
    case CHANGE_CARD:
      {
        state.cards[action.index] = Object.assign(
          state.cards[action.index],
          action.card,
        );
        return {
          ...state,
          cards: [...state.cards],
        };
      }
      break;
    case PUT_ORDER_IN_HISTORY:
      {
        state.history.unshift(action.order);
        const newState = {
          ...state,
          history: [...state.history],
        };

        writeData(newState, keys.cards);

        return newState;
      }
      break;
    case TIE_CHECKED_ORDERS_TO_HISTORY:
      {
        const {checkedOrders} = action;
        const uncheckedOrders = state.history;

        checkedOrders.forEach(checkedOrder => {
          const foundIndex = uncheckedOrders.findIndex(
            uncheckedOrder => checkedOrder.id === uncheckedOrder.id,
          );

          if (foundIndex != -1) {
            uncheckedOrders[foundIndex].approved = checkedOrder.approved;

            if (checkedOrder?.info && checkedOrder.info.trim().length > 0) {
              uncheckedOrders[foundIndex].info = checkedOrder.info;
            }
          }
        });

        const newState = {
          ...state,
          history: [...uncheckedOrders],
        };

        writeData(newState, keys.cards);

        return newState;
      }
      break;

    case CLEAR_CART:
      return {
        ...state,
        cards: [],
      };
      break;

    case APPROVALSENT:
      {
        let index = state.history.findIndex(
          order => (order.id = action.orderId),
        );
        let history = [...state.history];
        if (index != -1) {
          history[index].approvalSent = true;
        }

        const newState = {
          ...state,
          history,
        };
        writeData(newState, keys.cards);

        return newState;
      }
      break;

    default:
      break;
  }

  return state;
};

export default cardReducer;
