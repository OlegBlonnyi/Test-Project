import { db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import type { TodoList } from "../types/todo";
import { serverTimestamp } from "firebase/firestore";

import { getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const todoListsCollection = collection(db, "todoLists");

export const createTodoList = async (title: string) => {
  const docRef = await addDoc(todoListsCollection, {
    title,
    createdAt: serverTimestamp(),
    tasks: []
  });
  return docRef.id;
};

export const getTodoLists = async (): Promise<TodoList[]> => {
  const snapshot = await getDocs(todoListsCollection);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      createdAt: data.createdAt,
      tasks: data.tasks || [],
    } as TodoList;
  });
};

export const updateTodoListTitle = async (id: string, newTitle: string) => {
  const docRef = doc(db, "todoLists", id);
  await updateDoc(docRef, { title: newTitle });
};

export const deleteTodoList = async (id: string) => {
  const docRef = doc(db, "todoLists", id);
  await deleteDoc(docRef);
};

// ---------------------------------


export const addTaskToTodoList = async (
  todoListId: string,
  title: string,
  description: string
) => {
  const todoRef = doc(db, "todoLists", todoListId);
  const snapshot = await getDoc(todoRef);
  const data = snapshot.data();

  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed: false,
  };

  const updatedTasks = [...(data?.tasks || []), newTask];
  await updateDoc(todoRef, { tasks: updatedTasks });
};


export const updateTaskInTodoList = async (
  todoListId: string,
  taskId: string,
  updates: { title?: string; description?: string }
) => {
  const todoRef = doc(db, "todoLists", todoListId);
  const snapshot = await getDoc(todoRef);
  const data = snapshot.data();

  const updatedTasks = (data?.tasks || []).map((task: any) =>
    task.id === taskId ? { ...task, ...updates } : task
  );

  await updateDoc(todoRef, { tasks: updatedTasks });
};


export const deleteTaskFromTodoList = async (todoListId: string, taskId: string) => {
  const todoRef = doc(db, "todoLists", todoListId);
  const snapshot = await getDoc(todoRef);
  const data = snapshot.data();

  const updatedTasks = (data?.tasks || []).filter((task: any) => task.id !== taskId);
  await updateDoc(todoRef, { tasks: updatedTasks });
};


export const toggleTaskCompleted = async (todoListId: string, taskId: string) => {
  const todoRef = doc(db, "todoLists", todoListId);
  const snapshot = await getDoc(todoRef);
  const data = snapshot.data();

  const updatedTasks = (data?.tasks || []).map((task: any) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );

  await updateDoc(todoRef, { tasks: updatedTasks });
};

