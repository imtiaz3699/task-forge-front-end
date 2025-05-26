import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, } from "react-router";
import Auth from "./Components/Auth/index"
import Signup from './View/Signup/index'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className= 'w-full bg-gray-900 h-[100vh]'>
   <BrowserRouter>
    <Routes>
      {/* add routes with layouts */}
      <Route path="/" element={<Auth/>} />
      <Route path="/auth/signup" element={<Signup/>} />
      {/* add redirect for first page */}
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
