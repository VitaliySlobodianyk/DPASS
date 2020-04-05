import { CHANGE_NAME, CHANGE_GROUP, CHANGE_PHONE, REFRESH } from '../actions/types.js';
import { iniciateState } from '../services'



const userReducer = (state = iniciateState(), action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: action.name
            };
            break;
        case CHANGE_GROUP:
            return {
                ...state,
                group: action.group
            }
            break;
        case CHANGE_PHONE:
           {  
            return {
                ...state,
                phone: action.phone
            }
         }
            break;
         case REFRESH: {
            return {
                ...state
            }
         }


        default:
            break;
    }

    return state;
} 
export default userReducer;