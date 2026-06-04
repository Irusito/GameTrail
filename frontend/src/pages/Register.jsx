import { useState } from "react";
import AuthInput from "../components/AuthInput";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log({
      username,
      email,
      password,
    });
  }

  return (
    <main className="flex justify-center items-center py-20">
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