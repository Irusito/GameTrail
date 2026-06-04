import { useState } from "react";
import AuthInput from "../components/AuthInput";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    console.log({
      username,
      password,
    });
  }

  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Iniciar sesión
        </h1>

        <div className="space-y-4">

          <AuthInput
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
              bg-[#3C91E6]
              hover:bg-[#5CA7EE]
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            Entrar
          </button>

        </div>
      </div>
    </main>
  );
}