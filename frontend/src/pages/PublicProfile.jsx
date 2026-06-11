import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PublicProfile() {
  const { id } = useParams();

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${id}`
        );

        const data = await response.json();

        setProfile(data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <div className="flex flex-col items-center mb-8">

  <div
    className="
      w-28
      h-28
      rounded-full
      bg-[#1E1E1E]
      flex
      items-center
      justify-center
      text-4xl
      mb-4
    "
  >
    🎮
  </div>

  <h1 className="text-4xl font-bold">
    {profile.user.username}
  </h1>

  <p className="text-gray-400 mt-2">
    Biblioteca pública
  </p>

</div>

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {profile.games.map((game) => (
          <div
            key={game._id}
            className="
              bg-[#121212]
              rounded-xl
              overflow-hidden
            "
          >
            <img
              src={game.coverImage}
              alt={game.title}
              className="
                w-full
                h-64
                object-cover
              "
            />

            <div className="mt-2">
  <span
    className={`
      inline-block
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      ${game.status === "Pendiente" ? "bg-orange-500 text-white" : ""}
      ${game.status === "Jugando" ? "bg-blue-500 text-white" : ""}
      ${game.status === "Completado" ? "bg-green-500 text-white" : ""}
      ${game.status === "Platinado" ? "bg-gray-300 text-black" : ""}
      ${game.status === "Abandonado" ? "bg-red-500 text-white" : ""}
    `}
  >
    {game.status}
  </span>
  <p className="text-gray-400 text-sm mt-2">
  {game.platform}
</p>
{game.releaseDate && (
  <p className="text-gray-500 text-xs mt-1">
    Lanzamiento: {game.releaseDate}
  </p>
)}
</div>

          </div>
        ))}
      </div>

    </main>
  );
}