import AuthInput from "../components/AuthInput";

export default function Login() {
  return (
    <main className="flex justify-center items-center py-20">
      <div className="w-full max-w-md bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          Iniciar sesión
        </h1>

        <div className="space-y-4">
          <AuthInput
            placeholder="Nombre de usuario"
          />

          <AuthInput
            type="password"
            placeholder="Contraseña"
          />

          <button
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