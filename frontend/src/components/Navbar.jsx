import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b border-[#222]">
      <Link to="/" className="text-3xl font-bold">
        <span className="text-[#3C91E6]">G</span>
        <span className="text-[#FF4242]">T</span>
      </Link>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="text-[#BDBDBD] hover:text-white transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="text-[#BDBDBD] hover:text-white transition"
        >
          Registro
        </Link>
      </div>
    </nav>
  );
}