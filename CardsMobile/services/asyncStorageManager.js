import AsyncStorage from '@react-native-community/async-storage';
export const keys = {
  orders: 'orders',
  cardPrices: 'cardPrices',
  info: 'info',
  cards: 'cards',
  userData: 'userData'
};

export const readData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

export const writeData = async (data, key) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

