import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskList from "../components/TaskList";
import { getTodoLists } from "../services/todoList";
import type { Task } from "../types/todo";

const TaskListPage = () => {
  const { listId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    const lists = await getTodoLists();
    const current = lists.find((list) => list.id === listId);
    setTasks(current?.tasks || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [listId]);

  if (!listId) return <div>Не вказано ID групи</div>;
  if (loading) return <div>Завантаження...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Завдання для групи {listId}</h2>
      <TaskList todoListId={listId} tasks={tasks} onTasksChange={fetchTasks} />
    </div>
  );
};

export default TaskListPage;