import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import Input from "./components/Input";
import styles from "./theme/styles";
import { resetIdeas, loadIdeas, saveIdeas } from "./utils/localStorage";

export default function App() {
  // Ideas list, initially empty
  const [ideas, setIdeas] = useState([]);

  // Load ideas only during initial component mounting
  useEffect(() => {
    // Uncomment to clear ideas from local storage
    // resetIdeas();
    loadIdeas((loadedIdeas) => {
      // Update state after loading
      setIdeas(loadedIdeas);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Input
        onSubmit={(newIdea) => {
          // Append new idea at end of ideas array
          const newIdeas = [...ideas, newIdea];
          saveIdeas(newIdeas);
          // Update state
          setIdeas(newIdeas);
        }}
      ></Input>
      <FlatList
        style={styles.list}
        data={ideas}
        renderItem={({ item }) => <Text style={styles.item}>- {item}</Text>}
        keyExtractor={(item) => item}
      ></FlatList>
    </View>
  );
}
