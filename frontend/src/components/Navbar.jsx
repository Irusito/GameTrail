import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-700">
      <Link
        to="/"
        className="text-2xl font-bold text-white"
      >
        GT
      </Link>

      <div className="flex gap-4">
        <Link to="/login" className="text-slate-300 hover:text-white">
          Login
        </Link>

        <Link to="/register" className="text-slate-300 hover:text-white">
          Registro
        </Link>
      </div>
    </nav>
  );
}