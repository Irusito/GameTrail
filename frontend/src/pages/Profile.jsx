import { useEffect, useState } from "react";

export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/games",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setGames(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchGames();
  }, []);

  const pendingCount = games.filter(
    (game) => game.status === "Pendiente"
  ).length;

  const playingCount = games.filter(
    (game) => game.status === "Jugando"
  ).length;

  const completedCount = games.filter(
    (game) => game.status === "Completado"
  ).length;

  const platinumCount = games.filter(
    (game) => game.status === "Platinado"
  ).length;

  const recentGames = games.slice(-3).reverse();

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
              text-4xl
            "
          >
            🎮
          </div>

          <h1 className="text-3xl font-bold">
            {user?.username}
          </h1>

          <p className="text-gray-400 mt-2">
            {user?.email}
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
          value={pendingCount}
          label="Pendientes"
        />

        <StatCard
          value={playingCount}
          label="Jugando"
        />

        <StatCard
          value={completedCount}
          label="Completados"
        />

        <StatCard
          value={platinumCount}
          label="Platinados"
        />
      </section>

      {/* Últimos videojuegos */}

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

        {recentGames.length === 0 ? (
          <p className="text-gray-400">
            Todavía no has añadido videojuegos.
          </p>
        ) : (
          <div className="space-y-3">
            {recentGames.map((game) => (
              <div
                key={game._id}
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
        )}
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
}