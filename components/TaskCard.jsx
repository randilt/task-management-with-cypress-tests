"use client";

import { motion } from "framer-motion";

export function TaskCard({ task, onToggleCompletion, onDelete }) {
  const priorityColors = {
    low: "bg-green-200",
    medium: "bg-yellow-200",
    high: "bg-red-200",
  };

  return (
    <motion.div
      className={`p-4 mb-4 rounded-lg shadow-md ${
        priorityColors[task.priority]
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3
        className={`text-xl font-semibold mb-2 ${
          task.completed ? "line-through" : ""
        }`}
      >
        {task.title}
      </h3>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onToggleCompletion(task.id, task.completed)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;
