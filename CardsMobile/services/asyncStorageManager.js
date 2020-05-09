import AsyncStorage from '@react-native-community/async-storage'
 // improve wo
export const keys = {
    appData : "appData",
    orders: "orders",
    cardPrices: "cardPrices",
    info: "info"
}

export const readData = async () => {
    try {
      const value = await AsyncStorage.getItem("appData");
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  }
  
 export const writeData = async (data) => {
    try {
      await AsyncStorage.setItem("appData", JSON.stringify(data));
    } catch (e) {
       console.log(e);
    }
  }

  export const writeDataKey = async (key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
       console.log(e);
    }
  }
 
 
  export const readDataKey = async (key) => {
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
  }



 