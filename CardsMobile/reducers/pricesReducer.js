import {TIE_PRICES, UPDATE_PRICES_DATE, UPLOAD_PRICES} from '../actions/types.js';
import {pricesState, getCurrentMonthShortened, writeData, keys} from '../services';

const pricesReducer = (state = pricesState, action) => {
  switch (action.type) {
    case UPDATE_PRICES_DATE:
      {
        return {
          ...state,
          lastUpdate: action.date,
        };
      }
      break;

    case TIE_PRICES: {
      const newPrices = {...state};

      if (action?.prices?.lastUpdate) {
        newPrices.lastUpdate = action.prices.lastUpdate;
      }
      if (action?.prices?.prices) {
        newPrices.prices = action.prices.prices;
      }
      return newPrices;
    }

    case UPLOAD_PRICES:
      {
        console.log(state);
        const  prices = state.prices;

        const gotPrices = action.prices;
        console.log("net");
        console.log(gotPrices);
        for (const type in gotPrices) {
          if (gotPrices.hasOwnProperty(type)) {
            for (const limit in gotPrices[type]) {
              if (gotPrices[type].hasOwnProperty(limit)) {
                if (limit.indexOf('limit') !== -1) {
                  const newKey = limit.slice(5, limit.length);
                  prices[type][newKey] = gotPrices[type][limit];
                } else {
                  prices[type][limit] = gotPrices[type][limit];
                }
              }
            }
          }
        }
        const newState= {
            ...state,
            prices,
            lastUpdate: getCurrentMonthShortened(),
          };
        
        writeData(newState, keys.cardPrices);
        return newState;
      }
      break;

    default:
      break;
  }

  return state;
};
export default pricesReducer;
