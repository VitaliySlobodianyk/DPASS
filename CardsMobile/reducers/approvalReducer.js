import { REFRESH, PUTBILLID, PUTDATE, PUTAMOUNT, CLEARAPPROVAL} from '../actions/types.js';
import { approvalState } from '../services'



const approvalReducer = (state = approvalState, action) => {
    switch (action.type) {
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
export default approvalReducer;