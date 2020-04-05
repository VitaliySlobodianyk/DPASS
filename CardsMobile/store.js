import { createStore, combineReducers } from 'redux';
import { cardReducer, historyReducer, cardConfigReducer, userReducer } from './reducers';

const rootReducer= combineReducers({
    cards: cardReducer,
    history: historyReducer,
    cardConfig: cardConfigReducer,
    user: userReducer
});

const configureStore = ( ) => createStore(rootReducer);

export default configureStore;