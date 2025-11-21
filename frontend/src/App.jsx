import { Head } from "./components/Head"
import { Home } from "./components/Home"
import { Register } from "./components/Register"
import { Routes, Route } from "react-router-dom"
import { Login } from "./components/Login"

function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
    </>
  )
}

export default App
