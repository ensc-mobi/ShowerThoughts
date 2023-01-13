import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "ASYNC_STORAGE_IDEAS";

export default function App() {
  // Value of the text input
  const [input, setInput] = useState("");
  // Ideas list, initially empty
  const [ideas, setIdeas] = useState([]);

  const saveIdeas = async () => {
    try {
      // Turn ideas array into a JSON string
      const jsonIdeas = JSON.stringify(ideas);
      // Store ideas string
      await AsyncStorage.setItem(STORAGE_KEY, jsonIdeas);
    } catch (e) {
      console.error("Failed to save ideas");
    }
  };

  const loadIdeas = async () => {
    // Load ideas from local storage
    try {
      // Load ideas string
      const jsonIdeas = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonIdeas !== null) {
        // Turn stored JSON string into an array, and set it as ideas array
        setIdeas(JSON.parse(jsonIdeas));
      }
    } catch (e) {
      console.error("Failed to load ideas");
    }
  };

  // Load ideas only during initial component mounting
  useEffect(() => {
    loadIdeas();
  }, []);

  // Save ideas whenever its content changes
  useEffect(() => {
    saveIdeas();
  }, [ideas]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your newest brilliant idea"
        // Display input value
        value={input}
        onChangeText={(text) => {
          // Update input value
          setInput(text);
        }}
        onSubmitEditing={() => {
          if (!input) return; // Don't submit if empty

          // Append new idea at end of ideas array
          setIdeas((ideas) => [...ideas, input]);
          // Reset input value
          setInput("");
        }}
      />
      <FlatList
        style={styles.list}
        data={ideas}
        renderItem={({ item }) => <Text style={styles.item}>- {item}</Text>}
        keyExtractor={(item) => item}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  input: {
    backgroundColor: "whitesmoke",
    padding: 10,
    marginBottom: 10,
  },
  list: {
    marginLeft: 10,
    marginRight: 10,
  },
  item: {
    padding: 5,
    //fontSize: 16,
  },
});
