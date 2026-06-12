import { useState, useEffect } from "react";
import AuthInput from "../components/AuthInput";
import { useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3800);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (location.state?.successMessage) {
      window.history.replaceState(
        {},
        document.title
      );
    }
  }, []);
  // Valida las credenciales del usuario y almacena
  // el token JWT para mantener la sesión iniciada.
  async function handleSubmit() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(
          data.message ||
          "Credenciales incorrectos, vuelva a intentarlo"
        );

        setTimeout(() => {
          setErrorMessage("");
        }, 3800);

        return;
      }
      // Persistencia de sesión en el navegador.
      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      window.location.href = "/profile";

      console.log("Usuario logueado");
      console.log(data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex justify-center items-center py-20">

      {successMessage && (
        <div
          className="
          fixed
          bottom-8
          left-1/2
          -translate-x-1/2
          bg-[#089e62]
          text-white
          px-6
          py-3
          rounded-xl
          shadow-xl
          z-50
          border
          border-green-400
        "
        >
          {successMessage}
        </div>
      )}

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
          Iniciar sesión
        </h1>

        <div className="space-y-4">

          <AuthInput
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