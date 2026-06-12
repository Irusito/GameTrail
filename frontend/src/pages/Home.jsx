import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <h1 className="text-7xl md:text-8xl font-bold mb-6">
          <span className="text-[#3C91E6]">Game</span>
          <span className="text-[#FF4242]">Trail</span>
        </h1>

        <p className="text-xl text-[#BDBDBD] max-w-3xl mx-auto mb-10">
          Organiza los videojuegos que has jugado,
          completado o tienes pendientes. <br></br>

          Construye tu biblioteca personal y comparte
          tu trayectoria con otros jugadores.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="
border-2
border-[#4DA3FF]
text-[#4DA3FF]
px-8 py-4
rounded-xl
hover:bg-[#4DA3FF]
hover:text-white
transition-all
duration-300
"
          >
            Crear cuenta
          </Link>

          <Link
            to="/login"
            className="
border-2
border-[#FF4242]
text-[#FF4242]
px-8 py-4
rounded-xl
hover:bg-[#FF4242]
hover:text-white
transition-all
duration-300
"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#121212] p-8 rounded-xl border border-[#222]">
            <h3 className="text-2xl font-bold mb-4">
              Biblioteca
            </h3>

            <p className="text-[#BDBDBD]">
              Registra todos los juegos que has jugado a lo largo de tu vida.
            </p>
          </div>

          <div className="bg-[#121212] p-8 rounded-xl border border-[#222]">
            <h3 className="text-2xl font-bold mb-4">
              Progreso
            </h3>

            <p className="text-[#BDBDBD]">
              Cambia el estado de tus juegos conforme avances con ellos.
            </p>
          </div>

          <div className="bg-[#121212] p-8 rounded-xl border border-[#222]">
            <h3 className="text-2xl font-bold mb-4">
              Perfil público
            </h3>

            <p className="text-[#BDBDBD]">
              Comparte tu colección y progreso con otros jugadores.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}