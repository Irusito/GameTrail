import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import AddGame from "./pages/AddGame";

export default function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen text-[#F5F5F5]"
        style={{
          background:
            "radial-gradient(circle at top, #1A0D30 0%, #0A0A0A 60%)",
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-game"
            element={
              <ProtectedRoute>
                <AddGame />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}