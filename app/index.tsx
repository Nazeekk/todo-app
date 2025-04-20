import TaskItem from "@/components/TaskItem";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTasks } from "@/context/TaskContext";

export default function Index() {
  const [task, setTask] = useState<string>("");
  const { tasks, addTask, deleteTask, markCompleted } = useTasks();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your task here"
          value={task}
          onChangeText={setTask}
          style={styles.textInput}
        />
        <Pressable
          onPress={() => {
            addTask(task);
            setTask("");
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </Pressable>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            isCompleted={item.isCompleted}
            deleteTask={deleteTask}
            markCompleted={markCompleted}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 30,
  },
  textInput: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    width: 350,
    padding: 15,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
    height: 50,
    width: 200,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
