import AsyncStorage from "@react-native-async-storage/async-storage";

// AsyncStorage key used for storing ideas
const STORAGE_KEY = "ASYNC_STORAGE_IDEAS";

// Clear local storage
export const resetIdeas = async () => {
  console.log("Removing ideas from local storage...");
  try {
    await AsyncStorage.multiRemove([STORAGE_KEY]);
  } catch (e) {
    console.error("Failed to clear ideas");
  }
};

// Save ideas array parameter to local storage
export const saveIdeas = async (ideas) => {
  console.log(`Saving ideas [${ideas}] to local storage...`);
  try {
    // Turn ideas array into a JSON string
    const jsonIdeas = JSON.stringify(ideas);
    // Store ideas string
    await AsyncStorage.setItem(STORAGE_KEY, jsonIdeas);
  } catch (e) {
    console.error("Failed to save ideas");
  }
};

// Load ideas from local storage
export const loadIdeas = async (onLoaded) => {
  console.log("Loading ideas from local storage...");
  try {
    // Load ideas string
    const jsonIdeas = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonIdeas !== null) {
      // Turn stored JSON string into an array
      const ideas = JSON.parse(jsonIdeas);
      // Call callback
      onLoaded(ideas);
    }
  } catch (e) {
    console.error("Failed to load ideas");
  }
};
