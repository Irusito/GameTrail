import { useState } from "react";

export default function Library() {
  const [filter, setFilter] = useState("Todos");

  const games = [
    {
      id: 1,
      title: "Elden Ring",
      status: "Completado",
    },
    {
      id: 2,
      title: "Bloodborne",
      status: "Platinado",
    },
    {
      id: 3,
      title: "Persona 5 Royal",
      status: "Jugando",
    },
    {
      id: 4,
      title: "The Witcher 3",
      status: "Pendiente",
    },
    {
      id: 5,
      title: "Cyberpunk 2077",
      status: "Completado",
    },
    {
      id: 6,
      title: "Hollow Knight",
      status: "Pendiente",
    },
  ];

  const filters = [
    "Todos",
    "Pendiente",
    "Jugando",
    "Completado",
    "Platinado",
  ];

  const filteredGames =
    filter === "Todos"
      ? games
      : games.filter((game) => game.status === filter);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      
      <h1 className="text-4xl font-bold mb-8">
        Mi Biblioteca
      </h1>

      {/* Filtros */}

      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`
              px-4 py-2 rounded-lg transition
              ${
                filter === item
                  ? "bg-[#FF4242] text-white"
                  : "bg-[#1A1A1A] hover:bg-[#252525]"
              }
            `}
          >
            {item}
          </button>
        ))}
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
            key={game.id}
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

              <p className="text-gray-400 mt-1">
                {game.status}
              </p>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}