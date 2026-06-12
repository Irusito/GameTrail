import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b border-[#222]">
      <Link to="/">
        <img
          src={logo}
          alt="GameTrail"
          className="h-12"
        />
      </Link>

      <div className="flex gap-6 items-center">
        {!user && (
          <>
            <Link to="/login">
              Iniciar sesión
            </Link>

            <Link to="/register">
              Registro
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/library">
              Biblioteca
            </Link>

            <Link to="/profile">
              Perfil
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}