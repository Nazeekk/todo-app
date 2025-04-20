import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  isCompleted?: boolean;
  deleteTask: (title: string) => void;
  markCompleted: (title: string) => void;
};

export default function TaskItem({
  title,
  isCompleted = false,
  deleteTask,
  markCompleted,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={() => markCompleted(title)}
        style={[
          styles.buttonContainer,
          { backgroundColor: isCompleted ? "gray" : "green" },
        ]}
      >
        <Text style={styles.buttonText}>Mark as completed</Text>
      </Pressable>
      <Pressable
        onPress={() => deleteTask(title)}
        style={[styles.buttonContainer, { backgroundColor: "rgb(220, 0, 0)" }]}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(234, 165, 4)",
    padding: 10,
    marginTop: 15,
    width: 300,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    maxWidth: 150,
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginVertical: 4,
    marginHorizontal: "auto",
  },
  buttonText: {
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 20,
    minHeight: 80,
  },
});
