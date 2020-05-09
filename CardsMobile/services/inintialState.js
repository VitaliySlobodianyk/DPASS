import { uuid } from 'uuidv4';
import { readData, readDataKey, keys } from './asyncStorageManager'
import {pages} from './pagesStore'
 


const initialState = {
  id: uuid(),
  name: '',
  group: '',
  phone: '',
  cards: [],
  pageHistory: [pages.main],
  history: [],
  type: 'metro',
  limit: '46',
  quantity: 1,
  billId: '',
  date: '',
  actualAmount: ''
};

const pageHistorySta= {

}

const userDataState ={

}

const cardsState = {


}

const pricesState = {
  lastUpdate:'',
  prices: {}
}

const infoState ={
  lastUpdate:'',
  info: {}
}


 const iniciateState =  () => {
  readData().then(data => {
    if (data?.name) {
      initialState.name = data.name;
    }
    if (data?.id) {
      initialState.id = data.id;
    }
    if (data?.group) {
      initialState.group = data.group;
    }
    if (data?.history) {
      initialState.history = data.history;
    }
    if (data?.phone) {
      initialState.phone = data.phone;
    }
  }).catch(err => console.log(err));
 
  return  initialState;
}

export const iniciateInfoState = async() => {
  const info = await readDataKey(keys.info);

   if(info?.lastUpdate){
     infoState.lastUpdate = info.lastUpdate;
   }
   if(info?.info){
    infoState.info = info.info;
  }

 return infoState;
}
 



export { iniciateState };