import AuthInput from "../components/AuthInput";

export default function Register() {
  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Crear cuenta
        </h1>

        <div className="space-y-4">
          <AuthInput
            placeholder="Nombre de usuario"
          />

          <AuthInput
            type="email"
            placeholder="Correo electrónico"
          />

          <AuthInput
            type="password"
            placeholder="Contraseña"
          />

          <button
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