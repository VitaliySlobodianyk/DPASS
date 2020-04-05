
import {DELETE_HISTORY, ADD_HISTORY} from '../actions/types.js';
import { iniciateState } from '../services'
import {uuid} from 'uuidv4'
import {prices} from '../services'


const historyReducer=  (state = iniciateState(), action) => {
 switch (action.type) {
     case DELETE_HISTORY:
        { 
            state.pageHistory.pop()
            return {
          ...state,
             pageHistory:[...state.pageHistory]
         };
        }
         break;
      case ADD_HISTORY:
   {     
     state.pageHistory.push(action.pageName);
      return{
             ...state,
             pageHistory: [...state.pageHistory]         
         }
    }
            break;
     default:
         break;
 }

 return state;
} 

export default historyReducer;