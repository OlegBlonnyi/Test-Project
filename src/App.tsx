import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import AppRouter from "./routes/AppRouter";

const App = () => {
  return (
    <AppRouter/>
  );
};

export default App;
