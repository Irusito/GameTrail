import { useState } from "react";

export default function AddGame() {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [status, setStatus] = useState("Pendiente");

  async function handleSubmit() {
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
            title,
            platform,
            status,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      setTitle("");
      setPlatform("PC");
      setStatus("Pendiente");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold mb-8">
        Añadir videojuego
      </h1>

      <div
        className="
          bg-[#121212]
          border
          border-[#2A2A2A]
          rounded-2xl
          p-8
          space-y-6
        "
      >

        <div>
          <label className="block mb-2 text-gray-300">
            Título
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Elden Ring"
            className="
              w-full
              bg-[#1A1A1A]
              border
              border-[#2A2A2A]
              rounded-lg
              px-4
              py-3
              focus:outline-none
            "
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-300">
            Plataforma
          </label>

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="
              w-full
              bg-[#1A1A1A]
              border
              border-[#2A2A2A]
              rounded-lg
              px-4
              py-3
            "
          >
            <option>PC</option>
            <option>PS5</option>
            <option>PS4</option>
            <option>Xbox Series X/S</option>
            <option>Nintendo Switch</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-300">
            Estado
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              w-full
              bg-[#1A1A1A]
              border
              border-[#2A2A2A]
              rounded-lg
              px-4
              py-3
            "
          >
            <option>Pendiente</option>
            <option>Jugando</option>
            <option>Completado</option>
            <option>Platinado</option>
            <option>Abandonado</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-[#FF4242]
            hover:bg-[#FF5D5D]
            py-3
            rounded-lg
            font-semibold
            transition
          "
        >
          Guardar videojuego
        </button>

      </div>

    </main>
  );
}