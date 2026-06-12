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

const [showForm, setShowForm] = useState(false);

const [title, setTitle] = useState("");
const [results, setResults] = useState([]);
const [message, setMessage] = useState("");

const [platform, setPlatform] =
  useState("PC");

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
    showMessage("Videojuego eliminado");

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

    showMessage(
  `Estado actualizado a ${newStatus}`
);
  } catch (error) {
    console.error(error);
  }
}

async function handleSearch() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/rawg/search?q=${title}`
    );

    const data = await response.json();

    setResults(data);

  } catch (error) {
    console.error(error);
  }
}

async function addGameFromRAWG(game) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/games",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
  title: game.name,
  status: "Pendiente",
  platform,

  coverImage: game.background_image,
  releaseDate: game.released,
}),
      }
    );

    const newGame = await response.json();

    setGames([...games, newGame]);

    setResults([]);
    setTitle("");
    setShowForm(false);
    showMessage("Videojuego añadido correctamente");

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

      <div className="flex justify-between items-center mb-8">
  <h1 className="text-4xl font-bold">
    Mi Biblioteca
  </h1>

  <button
    onClick={() =>
      setShowForm(!showForm)
    }
    className="
      bg-[#089e62]
      hover:bg-green-500
      px-5
      py-2
      rounded-lg
      font-semibold
      transition
    "
  >
    + Añadir videojuego
  </button>
</div>

{
  showForm && (
    <div
      className="
        bg-[#121212]
        border
        border-[#2A2A2A]
        rounded-xl
        p-6
        mb-8
      "
    >
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="
          w-full
          p-3
          rounded-lg
          bg-[#1A1A1A]
          mb-4
        "
      />

      <select
        value={platform}
        onChange={(e) =>
          setPlatform(e.target.value)
        }
        className="
          w-full
          p-3
          rounded-lg
          bg-[#1A1A1A]
          mb-4
        "
      >
        <option>PC</option>
        <option>PS5</option>
        <option>Xbox Series</option>
        <option>Switch</option>
      </select>

      <button
        onClick={handleSearch}
        className="
          bg-blue-600
          hover:bg-blue-500
          px-5
          py-2
          rounded-lg
        "
      >
        Buscar
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          {results.slice(0, 10).map((game) => (
            
            <div
              key={game.id}
              className="
                bg-[#1A1A1A]
                rounded-lg
                p-4
                flex
                justify-between
                items-center
              "
            >
              <img
  src={game.background_image}
  alt={game.name}
  className="
    w-16
    h-20
    object-cover
    rounded
  "
/>
              <div>
                <h3 className="font-semibold">
                  {game.name}
                </h3>

                <p className="text-gray-400 text-sm">
                  {game.released}
                </p>
              </div>

              <button
                onClick={() =>
                  addGameFromRAWG(game)
                }
                className="
                  bg-green-600
                  hover:bg-green-500
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Añadir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

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
          <div className="h-64 overflow-hidden">
            <img
              src={game.coverImage}
              alt={game.title}
              className="
             w-full
              h-full
              object-cover
              "
            />
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
              {game.releaseDate && (
  <p className="text-gray-400 text-xs mt-1">
    Lanzamiento: {game.releaseDate}
  </p>
)}
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