import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-6">
        <h1 className="text-6xl font-bold mb-6">
          GameTrail
        </h1>

        <p className="text-xl text-slate-400 max-w-3xl mb-10">
          Registra los videojuegos que has jugado, completado,
          platinado o que tienes pendientes. Comparte tu perfil
          y descubre nuevas aventuras.
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition"
          >
            Crear cuenta
          </Link>

          <Link
            to="/login"
            className="border border-slate-500 px-6 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      {/* Características */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Todo tu recorrido gamer en un solo lugar
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-3">
              Biblioteca personal
            </h3>

            <p className="text-slate-400">
              Organiza los juegos que has jugado, completado,
              abandonado o tienes pendientes.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-3">
              Valoraciones
            </h3>

            <p className="text-slate-400">
              Puntúa cada videojuego y crea tu historial
              personal de experiencias.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-2xl font-semibold mb-3">
              Perfil público
            </h3>

            <p className="text-slate-400">
              Comparte tu perfil con otros jugadores y muestra
              tus estadísticas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}