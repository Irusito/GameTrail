import { useState } from "react";

export default function AddGame() {
  const [title, setTitle] = useState("");

  async function handleSubmit() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/games",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            status: "Pendiente",
            platform: "PC",

            // ID de prueba de un usuario existente
            user: "6a27275a4d358a41819817a8",
          }),
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="max-w-md mx-auto py-20">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 text-black"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 bg-red-500 px-4 py-2 rounded"
      >
        Guardar
      </button>
    </main>
  );
}