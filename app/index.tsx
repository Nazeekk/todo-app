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

export default function Index() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<
    Array<{ title: string; isCompleted?: boolean }>
  >([]);

  useEffect(() => {
    const loadTasks = async () => {
      const json = await AsyncStorage.getItem("@tasks");
      if (json) setTasks(JSON.parse(json));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (tasks.filter((e) => e.title === task).length) return;
    setTasks([...tasks, { title: task }]);
  };

  const markCompleted = (title: string) => {
    const temp = tasks.map((e) => {
      if (e.title === title) {
        return { ...e, isCompleted: true };
      }
      return e;
    });
    setTasks(temp);
  };

  const deleteTask = (title: string) => {
    setTasks(tasks.filter((task) => task.title !== title));
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your task here"
          value={task}
          onChangeText={setTask}
          style={styles.textInput}
        />
        <Pressable onPress={addTask} style={styles.buttonContainer}>
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
