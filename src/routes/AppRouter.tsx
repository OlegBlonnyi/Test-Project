// src/routes/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/register";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import TaskListPage from "../pages/TaskListPage";
import TodoLists from "../components/TodoList";

const AppRouter = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="dashboard/list/:listId" element={<TaskListPage/>} />
        <Route path="/dashboard" element={<Dashboard />}/> */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<TodoLists />} /> 
          <Route path="list/:listId" element={<TaskListPage />} />
        </Route>
      </Routes>
    // </BrowserRouter>
  );
};

export default AppRouter;

