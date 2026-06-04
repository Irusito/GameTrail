import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          display: "flex",
          gap: "20px",
          padding: "20px",
          borderBottom: "1px solid gray",
        }}
      >
        <Link to="/">Inicio</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
        <Link to="/profile">Perfil</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}