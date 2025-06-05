import React, { useEffect, useState } from "react";
import { createTodoList, getTodoLists, updateTodoListTitle, deleteTodoList } from "../services/todoList";
import { Link } from "react-router-dom";

interface TodoList {
  id: string;
  title: string;
  createdAt: any;
}

const TodoLists = () => {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    const data = await getTodoLists();
    setLists(data);
  };

  const handleAddList = async () => {
    if (!newTitle.trim()) return;
    await createTodoList(newTitle.trim());
    setNewTitle("");
    loadLists();
  };

  const handleEditStart = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleEditSave = async () => {
    if (editingId && editingTitle.trim()) {
      await updateTodoListTitle(editingId, editingTitle.trim());
      setEditingId(null);
      setEditingTitle("");
      loadLists();
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDelete = async (id: string) => {
    await deleteTodoList(id);
    loadLists();
  };

  console.log("TodoLists rendered");

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Списки завдань</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Нова назва списку"
          className="flex-grow border px-3 py-2 rounded"
        />
        <button onClick={handleAddList} className="ml-2 bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Додати
        </button>
      </div>

      <ul>
        {lists.map(list => (
          <li key={list.id} className="mb-3 flex items-center justify-between">
            {editingId === list.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  className="border px-2 py-1 rounded flex-grow mr-2"
                />
                <button onClick={handleEditSave} className="bg-green-500 text-white px-2 rounded mr-2 hover:bg-green-600">
                  Зберегти
                </button>
                <button onClick={handleEditCancel} className="bg-gray-300 px-2 rounded hover:bg-gray-400">
                  Відмінити
                </button>
              </>
            ) : (
              <>
                {/* <span>{list.title}</span> */}
                <Link to={`/dashboard/list/${list.id}`}>
                  {list.title}
                </Link>
                <div>
                  <button
                    onClick={() => handleEditStart(list.id, list.title)}
                    className="mr-2 bg-yellow-400 px-2 rounded hover:bg-yellow-500"
                  >
                    Редагувати
                  </button>
                  <button
                    onClick={() => handleDelete(list.id)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Видалити
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoLists;
