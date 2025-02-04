// bugSolution.js
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getItemWithRetry(key, retries = 3) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    if (retries > 0) {
      console.warn(`AsyncStorage getItem failed, retrying (${retries} retries remaining)`, error);
      return getItemWithRetry(key, retries - 1);
    } else {
      console.error(`AsyncStorage getItem failed after multiple retries`, error);
      return null; // Or handle the error appropriately
    }
  }
}

export default getItemWithRetry; 