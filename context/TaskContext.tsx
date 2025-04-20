import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Task = { title: string; isCompleted?: boolean };

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (title: string) => void;
  markCompleted: (title: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const addTask = (title: string) => {
    if (tasks.find((t) => t.title === title)) return;
    setTasks([...tasks, { title, isCompleted: false }]);
  };

  const deleteTask = (title: string) => {
    setTasks(tasks.filter((t) => t.title !== title));
  };

  const markCompleted = (title: string) => {
    setTasks(
      tasks.map((t) => (t.title === title ? { ...t, isCompleted: true } : t))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, markCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within TaskProvider");
  return context;
};
