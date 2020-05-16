import {TIE_INFO, UPLOAD_INFO, UPDATE_INFO_DATE} from '../actions/types.js';
import {infoState, getCurrentMonthShortened, writeData, keys} from '../services';

const infoReducer = (state = infoState, action) => {
  switch (action.type) {
    case TIE_INFO:
      {
        const newState = {...state};
        if (action?.info?.info) {
          newState.info = action.info.info;
        }
        if (action?.info?.lastUpdate) {
          newState.lastUpdate = action.info.lastUpdate;
        }
        return newState;
      }
      break;
    case UPLOAD_INFO: {
      const uploadedInfo = action.info;
      const newState = {
        ...state,
        info: uploadedInfo,
        lastUpdate: getCurrentMonthShortened(),
      };
      writeData(newState, keys.info);
      return newState;
    } break;

    default:
      break;
  }

  return state;
};
export default infoReducer;
