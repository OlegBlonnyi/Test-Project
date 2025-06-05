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
    <div style={{ marginTop: 12 }}>
      <h4>Завдання:</h4>
      {tasks.map((task) => (
        <div key={task.id} style={{ borderBottom: "1px solid #ccc", marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={async () => {
              await toggleTaskCompleted(todoListId, task.id);
              onTasksChange();
            }}
          />
          <input
            type="text"
            value={task.text}
            onChange={async (e) => {
              await updateTaskInTodoList(todoListId, task.id, { title: e.target.value });
              onTasksChange();
            }}
          />
          <textarea
            value={task.description}
            onChange={async (e) => {
              await updateTaskInTodoList(todoListId, task.id, {
                description: e.target.value,
              });
              onTasksChange();
            }}
          />
          <button onClick={async () => {
            await deleteTaskFromTodoList(todoListId, task.id);
            onTasksChange();
          }}>
            Delete
          </button>
        </div>
      ))}

      <h5>Додати нове завдання:</h5>
      <input
        placeholder="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Опис"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={handleAdd}>Додати</button>
    </div>
  );
};

export default TaskList;
