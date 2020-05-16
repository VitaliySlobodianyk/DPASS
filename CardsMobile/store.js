import { createStore, combineReducers } from 'redux';
import { cardReducer, historyReducer, cardConfigReducer,
     userReducer, infoReducer, pricesReducer, approvalReducer } from './reducers';

const rootReducer= combineReducers({
    cards: cardReducer,
    history: historyReducer,
    cardConfig: cardConfigReducer,
    user: userReducer,
    info: infoReducer,
    prices: pricesReducer,
    approval: approvalReducer
});

const configureStore = ( ) => createStore(rootReducer);

export default configureStore;