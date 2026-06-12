import { useState } from "react";
import AuthInput from "../components/AuthInput";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] =
  useState("");

 async function handleSubmit() {
  if (!username || !email || !password) {
  setErrorMessage(
    "Todos los campos son obligatorios"
  );

  setTimeout(() => {
    setErrorMessage("");
  }, 3800);

  return;
}

if (password.length < 6) {
  setErrorMessage(
    "La contraseña debe tener al menos 6 caracteres"
  );

  setTimeout(() => {
    setErrorMessage("");
  }, 3800);

  return;
}
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
  navigate("/login", {
    state: {
      successMessage:
        "Usuario registrado correctamente. Inicia sesión para continuar.",
    },
  });
}

    if (!response.ok) {
  setErrorMessage(
    data.message ||
    "Error al crear la cuenta"
  );

  setTimeout(() => {
    setErrorMessage("");
  }, 3800);

  return;
}

  } catch (error) {
    console.error(error);
  }
}

  return (
    <main className="flex justify-center items-center py-20">
      {errorMessage && (
  <div
    className="
      fixed
      bottom-8
      left-1/2
      -translate-x-1/2
      bg-red-600
      text-white
      px-6
      py-3
      rounded-xl
      shadow-xl
      z-50
      border
      border-red-400
    "
  >
    {errorMessage}
  </div>
)}
      <div className="w-full max-w-md bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          Crear cuenta
        </h1>

        <div className="space-y-4">

          <AuthInput
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <AuthInput
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="
              w-full
              bg-[#FF4242]
              hover:bg-[#FF5D5D]
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Registrarse
          </button>
       
        </div>
      </div>
    </main>
  );
}