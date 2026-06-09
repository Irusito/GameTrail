import { useState } from "react";

export default function AddGame() {
  const [title, setTitle] = useState("");

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
          status: "Pendiente",
          platform: "PC",
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