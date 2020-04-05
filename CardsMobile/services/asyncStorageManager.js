import AsyncStorage from '@react-native-community/async-storage'
 
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