import { User } from "lucide-react";

export default function Profile() {
  const recentGames = [
    {
      title: "Elden Ring",
      status: "Completado",
    },
    {
      title: "Persona 5 Royal",
      status: "Jugando",
    },
    {
      title: "Bloodborne",
      status: "Platinado",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">

      {/* Perfil */}

      <section className="bg-[#121212] border border-[#2A2A2A] rounded-2xl p-8">

        <div className="flex flex-col items-center">

          <div
            className="
              w-28
              h-28
              rounded-full
              bg-[#1E1E1E]
              flex
              items-center
              justify-center
              mb-4
            "
          >
            {/* <User size={50} /> */}
          </div>

          <h1 className="text-3xl font-bold">
            Alex
          </h1>

          <p className="text-gray-400 mt-2">
            Miembro desde junio de 2025
          </p>

          <button
            className="
              mt-6
              bg-[#FF4242]
              hover:bg-[#FF5D5D]
              px-5
              py-2
              rounded-lg
              font-semibold
              transition
            "
          >
            Editar perfil
          </button>

        </div>
      </section>

      {/* Estadísticas */}

      <section
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
          mt-8
        "
      >
        <StatCard
          value="12"
          label="Pendientes"
        />

        <StatCard
          value="4"
          label="Jugando"
        />

        <StatCard
          value="25"
          label="Completados"
        />

        <StatCard
          value="5"
          label="Platinados"
        />
      </section>

      {/* Últimos juegos */}

      <section
        className="
          bg-[#121212]
          border
          border-[#2A2A2A]
          rounded-2xl
          p-6
          mt-8
        "
      >
        <h2 className="text-2xl font-bold mb-4">
          Últimos videojuegos
        </h2>

        <div className="space-y-3">
          {recentGames.map((game) => (
            <div
              key={game.title}
              className="
                flex
                justify-between
                items-center
                bg-[#1A1A1A]
                rounded-lg
                px-4
                py-3
              "
            >
              <span>{game.title}</span>

              <span className="text-gray-400">
                {game.status}
              </span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}

function StatCard({ value, label }) {
  return (
    <div
      className="
        bg-[#121212]
        border
        border-[#2A2A2A]
        rounded-xl
        p-6
        text-center
      "
    >
      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="text-gray-400 mt-2">
        {label}
      </div>
    </div>
  );

  /*<Link to="/library">
  Ver biblioteca completa
</Link>*/

}