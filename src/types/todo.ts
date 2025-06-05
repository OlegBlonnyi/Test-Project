import { Timestamp } from "firebase/firestore";

export interface Task {
  id: string;
  text: string;
  description: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  title: string;
  createdAt: Timestamp;
  tasks: Task[];
}
