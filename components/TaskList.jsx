"use client";

import { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskForm } from "./AddTaskForm";
import { motion, AnimatePresence } from "framer-motion";

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Tasks state updated:", tasks);
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      const addedTask = await response.json();
      console.log("New task added:", addedTask);
      setTasks((prevTasks) => [addedTask, ...prevTasks]);
    } catch (err) {
      console.error("Error adding task:", err);
      setError(err.message);
    }
  };
  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !completed } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">
        Task Manager
      </h1>
      <AddTaskForm onAddTask={addTask} />
      <AnimatePresence>
        {tasks.map((task) => {
          console.log("Rendering task in TaskList:", task);
          return (
            <motion.div
              key={task.id || `temp-${Date.now()}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <TaskCard
                task={task}
                onToggleCompletion={toggleTaskCompletion}
                onDelete={deleteTask}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default TaskList;
