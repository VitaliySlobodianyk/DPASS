import {getPrices} from './httpManager';

export const tiePrices = async () => {
  const gotPrices = await getPrices();
  console.log(gotPrices);
  for (const type in gotPrices) {
    if (gotPrices.hasOwnProperty(type)) {
      for (const limit in gotPrices[type]) {
        if (gotPrices[type].hasOwnProperty(limit)) {
            if(limit.indexOf('limit') !== -1){
                const newKey = limit.slice(5, limit.length)
                prices[type][newKey] =  gotPrices[type][limit]; 
            }else{
                prices[type][limit] =  gotPrices[type][limit]; 
            }             
        }
      }
    }
  }
  console.log(prices);
  return true;
};

export let prices = {
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
};
