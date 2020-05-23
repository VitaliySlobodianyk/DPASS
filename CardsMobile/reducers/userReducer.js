import { CHANGE_NAME, CHANGE_GROUP, CHANGE_PHONE, REFRESH, TIE_USER_INFO, CHANGE_ID } from '../actions/types.js';
import { userDataState} from '../services'



const userReducer = (state = userDataState , action) => {
    switch (action.type) {
        case CHANGE_ID:
            return {
                ...state,
                id: action.id
            };
            break;
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
            const {phone}= state;
            const newPhone = action.phone;
            console.log(newPhone.trim());
            console.log( !isNaN(Number(newPhone.trim())));
            if((newPhone.trim()).length>3 && (!isNaN(Number(newPhone.trim())))){
                return {
                    ...state,
                    phone: newPhone
                }
            }else if( (newPhone.trim()).length>3 ){
                return {
                    ...state,
                    phone
                }
            }else{
                return {
                    ...state,
                    phone: '380'
                }
            }         
         }
            break;
         case REFRESH: {
            return {
                ...state
            }
         } break;
        case TIE_USER_INFO: {
            const newState = {...state};
           
           if( action.info?.name){
               newState.name = action.info.name; 
           }
           if( action.info?.group){
            newState.group = action.info.group; 
           }
           if( action.info?.phone){
            newState.phone = action.info.phone; 
           }
           if( action.info?.id){
            newState.id = action.info.id; 
           }
            return  newState;
         } break;
        
         default:
            break;
    }
    return state;
} 
export default userReducer;