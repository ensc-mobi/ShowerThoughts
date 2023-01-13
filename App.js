import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";

export default function App() {
  // Value of the text input
  const [input, setInput] = useState("");
  // Ideas list, initially empty
  const [ideas, setIdeas] = useState([]);

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
          // Append new idea (input value) at end of array
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
