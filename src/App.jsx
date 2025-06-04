import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Auth from "./Components/Auth/index";
import Signup from "./View/Signup/index";
import AdminLayouts from "./layouts/AdminLayouts";
import Dashboard from "./View/dashboard";
import Users from "./View/users";
import Task from "./View/task";
import CreateTask from "./View/task/create";
import { message } from "antd";
import CreateUser from "./View/users/create";
import Teams from "./View/teams";
import CreateTeams from "./View/teams/Create";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserProvider } from "./context/userContext";
function App() {
  const [count, setCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="w-full bg-gray-900 h-screen">
      {contextHolder}
      <BrowserRouter>
        <UserProvider>
        <Routes>
          {/* add routes with layouts */}
          <Route path="/" element={<Auth />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayouts />
              </ProtectedRoute>
            }
          >
            <Route path="users" element={<Users />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="update-user/:id" element={<CreateUser />} />

            <Route path="task" element={<Task />} />
            <Route path="create" element={<CreateTask />} />
            <Route path="update-task/:id" element={<CreateTask />} />

            {/* teams */}
            <Route path="teams" element={<Teams />} />
            <Route path="create-teams" element={<CreateTeams />} />
          </Route>
          {/* add redirect for first page */}
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
