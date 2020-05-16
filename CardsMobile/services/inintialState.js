import {uuid} from 'uuidv4';
import {readData, readDataKey, keys} from './asyncStorageManager';
import {pages} from './pagesStore';

const pageHistoryState = {
  pageHistory: [pages.main],
};

const userDataState = {
  name: '',
  group: '',
  phone: '',
};

const cardsConfigState = {
  type: 'metro',
  limit: '46',
  quantity: 1,
};

const cardsState = {
  cards: [],
  history: [],
};

const approvalState = {
  billId: '',
  date: '',
  actualAmount: '',
};

const pricesState = {
  lastUpdate: '',
  prices: {
    metro: {
      46: 160,
      62: 210,
      unlim: 320,
    },
    metroTram: {
      46: 300,
      62: 350,
      unlim: 445,
    },
    metroBus: {
      46: 300,
      62: 350,
      unlim: 445,
    },
    metroTroley: {
      46: 300,
      62: 350,
      unlim: 445,
    },
  },
};

const infoState = {
  lastUpdate: '',
  info: {},
};

export {
  userDataState,
  cardsConfigState,
  cardsState,
  approvalState,
  pricesState, 
  infoState,
  pageHistoryState
};
