import React, { useState } from "react";
import { TextInput } from "react-native";
import styles from "../theme/styles";

const Input = ({ onSubmit }) => {
  // Input value
  const [input, setInput] = useState("");

  return (
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

        // Call callback
        onSubmit(input);

        // Reset input value
        setInput("");
      }}
    ></TextInput>
  );
};

export default Input;
