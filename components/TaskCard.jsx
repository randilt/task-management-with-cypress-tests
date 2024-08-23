"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export function TaskCard({ task, onToggleCompletion, onDelete, testId }) {
  useEffect(() => {
    console.log("TaskCard rendered with task:", task);
  }, [task]);

  const priorityColors = {
    low: "bg-green-200",
    medium: "bg-yellow-200",
    high: "bg-red-200",
  };

  // Check if task is defined
  if (!task) {
    console.error("Task is undefined in TaskCard");
    return null;
  }

  // Provide default values for all task properties
  const {
    id = "unknown",
    title = "Untitled",
    description = "No description",
    priority = "medium",
    completed = false,
  } = task;

  // Safely capitalize the priority
  const capitalizedPriority =
    priority.charAt(0).toUpperCase() + priority.slice(1);

  return (
    <motion.div
      className={`p-4 mb-4 rounded-lg shadow-md ${priorityColors[priority]}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      data-test={testId}
    >
      <div className="flex justify-between items-center mb-2">
        <h3
          className={`text-xl font-semibold ${completed ? "line-through" : ""}`}
        >
          {title}
        </h3>
        <span className="px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded border-2 border-white shadow-sm">
          {capitalizedPriority}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onToggleCompletion(id, completed)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          data-test={`toggle-task-${id}`}
        >
          {completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          data-test={`delete-task-${id}`}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;
