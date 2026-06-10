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

  const recentGames = games.slice(-4).reverse();

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
  color="bg-orange-500"
/>

<StatCard
  value={playingCount}
  label="Jugando"
  color="bg-blue-500"
/>

<StatCard
  value={completedCount}
  label="Completados"
  color="bg-green-500"
/>

<StatCard
  value={platinumCount}
  label="Platinados"
  color="bg-gray-300"
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
  <h2 className="text-2xl font-bold mb-6">
    Últimos videojuegos añadidos
  </h2>

  {recentGames.length === 0 ? (
    <p className="text-gray-400">
      Todavía no has añadido videojuegos.
    </p>
  ) : (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
      "
    >
      {recentGames.map((game) => (
        <div
          key={game._id}
          className="
            bg-[#1A1A1A]
            rounded-xl
            overflow-hidden
            border
            border-[#2A2A2A]
          "
        >
          <div
            className="
              h-48
              bg-[#252525]
              flex
              items-center
              justify-center
              text-gray-500
            "
          >
            Carátula
          </div>

          <div className="p-3">
            <h3 className="font-semibold text-sm">
              {game.title}
            </h3>

            <p className="text-gray-400 text-xs mt-1">
              {game.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</section>

    </main>
  );
}

function StatCard({
  value,
  label,
  color,
}) {
  return (
    <div
      className="
        bg-[#121212]
        border
        border-[#2A2A2A]
        rounded-xl
        overflow-hidden
      "
    >
      <div
        className={`h-2 ${color}`}
      />

      <div className="p-6 text-center">
        <div className="text-3xl font-bold">
          {value}
        </div>

        <div className="text-gray-400 mt-2">
          {label}
        </div>
      </div>
    </div>
  );
}