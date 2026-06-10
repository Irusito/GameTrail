import { useEffect, useState } from "react";
import { statusConfig } from "../utils/statusConfig";

export default function Library() {
  const [filter, setFilter] = useState("Todos");
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

  const filters = [
    "Todos",
    "Pendiente",
    "Jugando",
    "Completado",
    "Platinado",
    "Abandonado",
  ];

  const filteredGames =
    filter === "Todos"
      ? games
      : games.filter(
          (game) => game.status === filter
        );

        async function deleteGame(id) {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/games/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setGames(
      games.filter((game) => game._id !== id)
    );

  } catch (error) {
    console.error(error);
  }
}

async function updateStatus(id, newStatus) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/games/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const updatedGame =
      await response.json();

    setGames(
      games.map((game) =>
        game._id === id
          ? updatedGame
          : game
      )
    );

  } catch (error) {
    console.error(error);
  }
}

function getStatusStyle(status) {
  switch (status) {
    case "Pendiente":
      return "bg-orange-500 text-white";

    case "Jugando":
      return "bg-blue-500 text-white";

    case "Completado":
      return "bg-green-500 text-white";

    case "Platinado":
      return "bg-gray-300 text-black";

    case "Abandonado":
      return "bg-red-500 text-white";

    default:
      return "bg-gray-500 text-white";
  }
}

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Mi Biblioteca
      </h1>

      {/* Filtros */}

  <div className="flex flex-wrap gap-3 mb-10">
  {filters.map((item) => {
    const status = statusConfig[item];

    return (
      <button
        key={item}
        onClick={() => setFilter(item)}
        className={`
          px-4
          py-2
          rounded-lg
          font-medium
          transition-all
          duration-200
          ${
            item === "Todos"
              ? filter === item
                ? "bg-white text-black"
                : "bg-[#1A1A1A] hover:bg-[#252525]"
              : filter === item
              ? `${status.color} ${status.text}`
              : `bg-[#1A1A1A] text-white ${status.hover}`
          }
        `}
      >
        {item}
      </button>
    );
  })}
</div>

      {/* Juegos */}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-6
        "
      >
        {filteredGames.map((game) => (
          <div
            key={game._id}
            className="
              bg-[#121212]
              border
              border-[#2A2A2A]
              rounded-xl
              overflow-hidden
              hover:border-[#FF4242]
              transition
            "
          >
            {/* Carátula provisional */}

            <div
              className="
                h-64
                bg-[#1A1A1A]
                flex
                items-center
                justify-center
                text-gray-500
              "
            >
              Carátula
            </div>

            {/* Información */}

            <div className="p-4">
              <h2 className="font-semibold text-lg">
                {game.title}
              </h2>
            <div className="mt-2">
  <span
    className={`
      inline-block
      px-3
      py-1
      rounded-full
      text-sm
      font-semibold
      ${statusConfig[game.status]?.color}
      ${statusConfig[game.status]?.text}
    `}
  >
    {game.status}
  </span>
</div>
              <p className="text-gray-500 text-sm">
                {game.platform}
              </p>
              <select
  value={game.status}
  onChange={(e) =>
    updateStatus(game._id, e.target.value)
  }
  className="
    mt-3
    w-full
    bg-[#1A1A1A]
    border
    border-[#2A2A2A]
    rounded-lg
    p-2
  "
>
  <option value="Pendiente">Pendiente</option>
  <option value="Jugando">Jugando</option>
  <option value="Completado">Completado</option>
  <option value="Platinado">Platinado</option>
  <option value="Abandonado">Abandonado</option>
</select>
<button
  onClick={() => deleteGame(game._id)}
  className="
    mt-3
    w-full
    bg-red-500
    hover:bg-red-600
    py-2
    rounded-lg
    transition
  "
>
  Eliminar
</button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}