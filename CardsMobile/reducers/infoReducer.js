import { CHANGE_NAME, CHANGE_GROUP, CHANGE_PHONE, REFRESH, PUTBILLID, PUTDATE, PUTAMOUNT, CLEARAPPROVAL} from '../actions/types.js';
import { iniciateInfoState } from '../services'



const infoReducer = (state = iniciateInfoState(), action) => {
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
         } break;
        
         case PUTBILLID: {
            return {
                ...state,
                billId: action.billId
            }
         } break;
         case PUTDATE: {
            return {
                ...state,
                date: action.date
            }
         } break;
         case PUTAMOUNT: {
            return {
                ...state,
                actualAmount: action.amount
            }
         } break;
         case CLEARAPPROVAL: {
            return {
                ...state,
                actualAmount: '',
                date: '',
                billId: ''
            }
         } break;


        default:
            break;
    }

    return state;
} 
export default userReducer;