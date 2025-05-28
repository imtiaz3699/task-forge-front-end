import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router";
import Auth from "./Components/Auth/index"
import Signup from './View/Signup/index'
import AdminLayouts from './layouts/AdminLayouts';
import Dashboard from './View/dashboard';
import Users from './View/users';
import Task from './View/task';
import CreateTask from './View/task/create';
import { message } from 'antd';
function App() {
  const [count, setCount] = useState(0)
  const [messageApi, contextHolder] = message.useMessage();
  return (
    
    <div className= 'w-full bg-gray-900'>
   {contextHolder}
   <BrowserRouter>
    <Routes>
    
      {/* add routes with layouts */}
      <Route path="/" element={<Auth/>} />
      <Route path="/auth/signup" element={<Signup/>} />
      <Route path="/admin" element={<AdminLayouts/>} >
      {/* <Route path="dashboard" element={<Dashboard/>} />
        <Route path="users" element={<div>Users</div>} /> */}
        <Route path="users" element={<Users/>} />
        <Route path="task" element={<Task/>} />
        <Route path="create" element={<CreateTask/>} />
        <Route path="update-task/:id" element={<CreateTask/>} />
      </Route>
      {/* add redirect for first page */}
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
