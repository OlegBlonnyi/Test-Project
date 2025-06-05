
// import TodoLists from "../components/TodoList";

// const Dashboard = () => {
//   console.log("Dashboard rendered");

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <TodoLists/>
//     </div>
//   );
// };

// export default Dashboard;


import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Outlet буде рендерити вкладені маршрути */}
      <Outlet />
    </div>
  );
};

export default Dashboard;