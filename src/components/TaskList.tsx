import React, { useState } from "react";
import {
  addTaskToTodoList,
  updateTaskInTodoList,
  deleteTaskFromTodoList,
  toggleTaskCompleted,
} from "../services/todoList";
import type { Task } from "../types/todo";

interface Props {
  todoListId: string;
  tasks: Task[];
  onTasksChange: () => void;
}

const TaskList: React.FC<Props> = ({ todoListId, tasks, onTasksChange }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTaskToTodoList(todoListId, title, desc);
    setTitle("");
    setDesc("");
    onTasksChange();
  };

  return (
    <div className="mt-6 space-y-6">
      <h4 className="text-xl font-semibold text-gray-800">Завдання:</h4>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 border rounded-md shadow-sm bg-white flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={async () => {
                await toggleTaskCompleted(todoListId, task.id);
                onTasksChange();
              }}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <input
              type="text"
              value={task.text}
              onChange={async (e) => {
                await updateTaskInTodoList(todoListId, task.id, {
                  title: e.target.value,
                });
                onTasksChange();
              }}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={async () => {
                await deleteTaskFromTodoList(todoListId, task.id);
                onTasksChange();
              }}
              className="text-red-600 hover:underline text-sm"
            >
              Видалити
            </button>
          </div>
          <textarea
            value={task.description}
            onChange={async (e) => {
              await updateTaskInTodoList(todoListId, task.id, {
                description: e.target.value,
              });
              onTasksChange();
            }}
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Опис"
          />
        </div>
      ))}

      <div className="mt-4">
        <h5 className="text-lg font-medium text-gray-700 mb-2">Додати нове завдання:</h5>
        <div className="flex flex-col gap-3 p-4 border rounded-md bg-gray-50 shadow-inner">
          <input
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Опис"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Додати
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
