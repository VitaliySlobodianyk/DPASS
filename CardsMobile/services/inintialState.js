import { uuid } from 'uuidv4';
import { readData } from './asyncStorageManager'
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
  photo: null
};

 const iniciateState = () => {
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
 



export { iniciateState };